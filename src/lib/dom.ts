// Small helpers shared by widget scripts.
export const $ = <T extends Element = HTMLElement>(root: ParentNode, sel: string) => root.querySelector(sel) as T;
export const $$ = <T extends Element = HTMLElement>(root: ParentNode, sel: string) => [...root.querySelectorAll(sel)] as T[];

/** Read the JSON strings a widget component embedded in data-strings. */
export function widgetStrings(root: HTMLElement): Record<string, string> {
  try { return JSON.parse(root.dataset.strings || '{}'); } catch { return {}; }
}
export const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));

export const escapeHtml = (v: string) => v.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

/** Run `init` once for every element matching `[data-widget=name]`. */
export function eachWidget(name: string, init: (root: HTMLElement, s: Record<string, string>) => void) {
  for (const root of $$<HTMLElement>(document, `[data-widget="${name}"]`)) init(root, widgetStrings(root));
}

let toastTimer: number | undefined;
export function toast(message: string) {
  const el = document.querySelector<HTMLElement>('#toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el.classList.remove('show'), 1800);
}

/** Copy text: Clipboard API when allowed, otherwise the legacy execCommand fallback (works on plain http:// LAN origins). */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
  } catch { /* fall through */ }
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
  document.body.append(area);
  area.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  area.remove();
  return ok;
}
