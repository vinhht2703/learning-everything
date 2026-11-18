// Cross-device sync through a secret GitHub Gist owned by the learner.
// The site stays static: the browser talks to api.github.com directly with a personal
// access token (gist scope only) that is stored in this browser.
//
// Data model: see lib/storage.ts. Merge rules:
//  - set keys (completed lessons, bookmarks): merged item by item, newest change per item wins
//    (so an addition on one device and a removal on another are both kept);
//  - every other key: the newest change wins (tie → the remote copy, so devices converge).
import {
  applyRemote, isSetKey, read, readMeta, remove, syncableKeys, write, writeMeta, type ItemStamp,
} from './storage';

const FILE = 'learning-everything-progress.json';
const GIST_DESCRIPTION = 'Learning Everything — learning progress (synced by the website)';
type Entry = { v: string | null; t: number; items?: Record<string, ItemStamp> };
type Doc = { app: 'learning-everything'; version: 1; updatedAt: string; entries: Record<string, Entry> };
export type SyncState = 'off' | 'syncing' | 'ok' | 'error' | 'auth';
export type SyncStatus = { state: SyncState; login?: string; gistId?: string; lastSync?: number; error?: string };

const api = () => read('sync:api') ?? 'https://api.github.com';   // `sync:api` override is for local testing only
const token = () => read('sync:token');
const gistId = () => read('sync:gist');
export const isConnected = () => Boolean(token() && gistId());

// ---------- status ----------
let status: SyncStatus = { state: 'off' };
function setStatus(next: Partial<SyncStatus>) {
  status = { ...status, ...next, login: read('sync:login') ?? undefined, gistId: gistId() ?? undefined, lastSync: Number(read('sync:last')) || undefined };
  window.dispatchEvent(new CustomEvent('le:sync-status', { detail: status }));
}
export const getStatus = () => status;

// ---------- GitHub API ----------
class HttpError extends Error { constructor(public status: number, message: string) { super(message); } }
async function gh<T>(path: string, init: RequestInit = {}, auth = token()): Promise<T> {
  const res = await fetch(`${api()}${path}`, {
    ...init,
    headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', Authorization: `Bearer ${auth}`, ...(init.body ? { 'Content-Type': 'application/json' } : {}) },
  });
  if (!res.ok) throw new HttpError(res.status, `GitHub API ${res.status}`);
  return res.status === 204 ? (undefined as T) : res.json();
}
type GistFile = { content?: string; truncated?: boolean; raw_url?: string };
type Gist = { id: string; files: Record<string, GistFile> };

async function readRemote(id: string): Promise<Doc | null> {
  const gist = await gh<Gist>(`/gists/${id}`);
  const file = gist.files[FILE];
  if (!file) return null;
  const text = file.truncated && file.raw_url ? await (await fetch(file.raw_url)).text() : file.content ?? '';
  try { const doc = JSON.parse(text); return doc?.entries ? doc : null; } catch { return null; }
}
async function writeRemote(id: string, doc: Doc) {
  await gh(`/gists/${id}`, { method: 'PATCH', body: JSON.stringify({ files: { [FILE]: { content: JSON.stringify(doc, null, 1) } } }) });
}

// ---------- snapshot / merge / apply ----------
const parseList = (v: string | null): string[] => { try { const a = JSON.parse(v ?? '[]'); return Array.isArray(a) ? a.map(String) : []; } catch { return []; } };

/** This device's syncable data as a document. */
export function snapshot(): Doc {
  const meta = readMeta();
  const entries: Record<string, Entry> = {};
  for (const key of new Set([...syncableKeys(), ...Object.keys(meta.keys)])) {
    const v = read(key);
    const entry: Entry = { v, t: meta.keys[key] ?? 0 };
    if (isSetKey(key)) {
      const items: Record<string, ItemStamp> = { ...(meta.items[key] ?? {}) };
      for (const id of parseList(v)) items[id] ??= { t: 0, del: false };   // data from before sync existed
      entry.items = items;
    }
    entries[key] = entry;
  }
  return { app: 'learning-everything', version: 1, updatedAt: new Date().toISOString(), entries };
}

/** Merge two documents (pure; exported for tests). */
export function merge(local: Doc, remote: Doc | null): Doc {
  if (!remote) return local;
  const entries: Record<string, Entry> = {};
  for (const key of new Set([...Object.keys(local.entries), ...Object.keys(remote.entries)])) {
    const L = local.entries[key], R = remote.entries[key];
    if (!L || !R) { entries[key] = (L ?? R)!; continue; }
    if (isSetKey(key)) {
      const items: Record<string, ItemStamp> = {};
      for (const id of new Set([...Object.keys(L.items ?? {}), ...Object.keys(R.items ?? {})])) {
        const a = L.items?.[id], b = R.items?.[id];
        items[id] = !a ? b! : !b ? a : a.t !== b.t ? (a.t > b.t ? a : b) : { t: a.t, del: a.del && b.del };
      }
      const order = [...parseList(L.v), ...parseList(R.v), ...Object.keys(items)];
      const value = [...new Set(order)].filter((id) => items[id] && !items[id].del);
      entries[key] = { v: JSON.stringify(value), t: Math.max(L.t, R.t), items };
    } else {
      entries[key] = R.t >= L.t ? R : L;
    }
  }
  return { ...local, updatedAt: new Date().toISOString(), entries };
}

/** Write merged values into this device. Returns the keys whose value changed. */
function apply(doc: Doc): string[] {
  const meta = readMeta();
  const changed: string[] = [];
  for (const [key, e] of Object.entries(doc.entries)) {
    if (read(key) !== e.v) { applyRemote(key, e.v); changed.push(key); }
    meta.keys[key] = e.t;
    if (e.items) meta.items[key] = e.items;
  }
  writeMeta(meta);
  return changed;
}
const canonical = (doc: Doc | null) => JSON.stringify(doc ? Object.keys(doc.entries).sort().map((k) => [k, doc.entries[k]]) : null);

// ---------- sync ----------
let running: Promise<void> | null = null;
let again = false;

/** Pull, merge, apply, push. Safe to call often; concurrent calls are coalesced. */
export function syncNow(): Promise<void> {
  if (!isConnected()) { setStatus({ state: 'off' }); return Promise.resolve(); }
  if (running) { again = true; return running; }
  running = (async () => {
    setStatus({ state: 'syncing', error: undefined });
    try {
      let id = gistId()!;
      let remote: Doc | null;
      try { remote = await readRemote(id); }
      catch (e) {
        if (!(e instanceof HttpError && e.status === 404)) throw e;
        id = await createGist(snapshot()); write('sync:gist', id); remote = null;   // gist was deleted: start a new one
      }
      const merged = merge(snapshot(), remote);
      const changed = apply(merged);
      if (canonical(merged) !== canonical(remote)) await writeRemote(id, merged);
      write('sync:dirty', '');
      write('sync:last', String(Date.now()));
      setStatus({ state: 'ok' });
      if (changed.length) window.dispatchEvent(new CustomEvent('le:synced', { detail: { changed } }));
    } catch (e) {
      const auth = e instanceof HttpError && (e.status === 401 || e.status === 403);
      setStatus({ state: auth ? 'auth' : 'error', error: String((e as Error).message ?? e) });
    } finally {
      running = null;
      if (again) { again = false; void syncNow(); }
    }
  })();
  return running;
}

async function createGist(doc: Doc): Promise<string> {
  const gist = await gh<Gist>('/gists', { method: 'POST', body: JSON.stringify({ description: GIST_DESCRIPTION, public: false, files: { [FILE]: { content: JSON.stringify(doc, null, 1) } } }) });
  return gist.id;
}

/** Check the token, find (or create) the sync gist, then sync. */
export async function connect(newToken: string): Promise<string> {
  const user = await gh<{ login: string }>('/user', {}, newToken);
  let id: string | undefined;
  for (let page = 1; page <= 5 && !id; page++) {
    const gists = await gh<Gist[]>(`/gists?per_page=100&page=${page}`, {}, newToken);
    id = gists.find((g) => g.files && FILE in g.files)?.id;
    if (gists.length < 100) break;
  }
  write('sync:token', newToken);
  write('sync:login', user.login);
  if (!id) id = await createGist(snapshot());
  write('sync:gist', id);
  await syncNow();
  return user.login;
}

/** Forget the token on this device. Learning data and the gist are kept. */
export function disconnect() {
  for (const k of ['sync:token', 'sync:gist', 'sync:login', 'sync:last', 'sync:dirty']) remove(k);
  setStatus({ state: 'off', error: undefined });
}

// ---------- automatic triggers ----------
let timer: number | undefined;
export function startAutoSync() {
  setStatus({ state: isConnected() ? 'ok' : 'off' });
  window.addEventListener('le:changed', () => {
    if (!isConnected()) return;
    write('sync:dirty', '1');                         // survives navigation if the push hasn't happened yet
    clearTimeout(timer);
    timer = window.setTimeout(() => void syncNow(), 2500);
  });
  document.addEventListener('visibilitychange', () => {
    if (!isConnected()) return;
    if (document.visibilityState === 'hidden' && read('sync:dirty')) { clearTimeout(timer); void syncNow(); }
    if (document.visibilityState === 'visible') void syncNow();   // back from another device or app
  });
  if (isConnected()) void syncNow();                  // every page load picks up other devices' progress
}
