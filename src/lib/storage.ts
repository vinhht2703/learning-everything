// Client-side persistence. Everything lives in localStorage; all access is wrapped
// because storage can be unavailable (private mode, blocked site data).
const PREFIX = 'le:';

export function read(key: string): string | null {
  try { return localStorage.getItem(PREFIX + key); } catch { return null; }
}
export function write(key: string, value: string): void {
  try { localStorage.setItem(PREFIX + key, value); } catch { /* ignore */ }
}
export function readJSON<T>(key: string, fallback: T): T {
  const raw = read(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}
export function writeJSON(key: string, value: unknown): void {
  write(key, JSON.stringify(value));
}

export function getProgress(course: string): string[] {
  return readJSON<string[]>(`progress:${course}`, []);
}
export function markComplete(course: string, lesson: string): string[] {
  const done = [...new Set([...getProgress(course), lesson])];
  writeJSON(`progress:${course}`, done);
  return done;
}
export function remove(key: string): void {
  try { localStorage.removeItem(PREFIX + key); } catch { /* ignore */ }
}
