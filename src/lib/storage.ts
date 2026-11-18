// Client-side persistence. Everything lives in localStorage; all access is wrapped
// because storage can be unavailable (private mode, blocked site data).
//
// Learning data (progress, notes, code edits, bookmarks, course order, widget state) is
// "syncable": every change records a timestamp in `le:sync:meta` so the GitHub Gist sync
// (lib/sync.ts) can merge devices. "Set" keys (arrays of ids) record per-item timestamps so
// additions and removals made on different devices are both kept.
const PREFIX = 'le:';
const META = 'sync:meta';

/** Keys that follow the learner across devices. Theme, language, UI state and sync settings stay per device. */
export const isSyncable = (key: string) =>
  /^(progress:|note:|code:|widget:)/.test(key) || key === 'bookmarks' || key === 'courseOrder';
/** Keys whose value is a JSON array of ids, merged item by item. */
export const isSetKey = (key: string) => key.startsWith('progress:') || key === 'bookmarks';

export type ItemStamp = { t: number; del: boolean };
export type SyncMeta = { keys: Record<string, number>; items: Record<string, Record<string, ItemStamp>> };

function rawGet(key: string): string | null {
  try { return localStorage.getItem(PREFIX + key); } catch { return null; }
}
function rawSet(key: string, value: string | null): void {
  try {
    if (value === null) localStorage.removeItem(PREFIX + key);
    else localStorage.setItem(PREFIX + key, value);
  } catch { /* ignore */ }
}
const parseList = (raw: string | null): string[] => { try { const v = JSON.parse(raw ?? '[]'); return Array.isArray(v) ? v.map(String) : []; } catch { return []; } };

export function readMeta(): SyncMeta {
  try { const m = JSON.parse(rawGet(META) ?? ''); if (m && m.keys && m.items) return m; } catch { /* fall through */ }
  return { keys: {}, items: {} };
}
export function writeMeta(meta: SyncMeta): void { rawSet(META, JSON.stringify(meta)); }

/** Record a local change to a syncable key and let the sync engine know. */
function recordChange(key: string, oldRaw: string | null, newRaw: string | null) {
  if (!isSyncable(key) || oldRaw === newRaw) return;
  const meta = readMeta();
  const t = Date.now();
  meta.keys[key] = t;
  if (isSetKey(key)) {
    const before = new Set(parseList(oldRaw)), after = new Set(parseList(newRaw));
    const items = (meta.items[key] ??= {});
    for (const id of after) if (!before.has(id)) items[id] = { t, del: false };
    for (const id of before) if (!after.has(id)) items[id] = { t, del: true };
  }
  writeMeta(meta);
  try { window.dispatchEvent(new CustomEvent('le:changed', { detail: { key } })); } catch { /* not in a browser */ }
}

export function read(key: string): string | null {
  return rawGet(key);
}
export function write(key: string, value: string): void {
  const old = rawGet(key);
  rawSet(key, value);
  recordChange(key, old, value);
}
export function readJSON<T>(key: string, fallback: T): T {
  const raw = read(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}
export function writeJSON(key: string, value: unknown): void {
  write(key, JSON.stringify(value));
}
export function remove(key: string): void {
  const old = rawGet(key);
  rawSet(key, null);
  recordChange(key, old, null);
}

/** All syncable keys currently stored on this device. */
export function syncableKeys(): string[] {
  const keys: string[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(PREFIX) && isSyncable(k.slice(PREFIX.length))) keys.push(k.slice(PREFIX.length));
    }
  } catch { /* storage unavailable */ }
  return keys;
}
/** Write a value that came from another device: no change event, no new timestamp. */
export function applyRemote(key: string, value: string | null): void { rawSet(key, value); }

export function getProgress(course: string): string[] {
  return readJSON<string[]>(`progress:${course}`, []);
}
export function markComplete(course: string, lesson: string): string[] {
  return setComplete(course, lesson, true);
}
/** Mark a lesson done or not done. Removals sync as per-item tombstones, so "undo" reaches other devices too. */
export function setComplete(course: string, lesson: string, done: boolean): string[] {
  const list = getProgress(course).filter((id) => id !== lesson);
  if (done) list.push(lesson);
  writeJSON(`progress:${course}`, list);
  return list;
}
