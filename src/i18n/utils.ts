import en from './en.json';
import vi from './vi.json';

export const languages = { en: 'English', vi: 'Tiếng Việt' } as const;
export type Lang = keyof typeof languages;
export const langs = Object.keys(languages) as Lang[];

const dict: Record<Lang, Record<string, string>> = { en, vi };

type Vars = Record<string, string | number>;
const fill = (s: string, vars?: Vars) => (vars ? s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`)) : s);

/** Translate a UI key. Falls back to English, then to the key itself. */
export function t(lang: Lang, key: string, vars?: Vars): string {
  return fill(dict[lang]?.[key] ?? dict.en[key] ?? key, vars);
}

/** All keys that start with `prefix`, prefix stripped — handy for passing widget strings to client scripts. */
export function strings(lang: Lang, prefix: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of Object.keys(dict.en)) if (key.startsWith(prefix)) out[key.slice(prefix.length)] = t(lang, key);
  return out;
}

/** Pick a localized value from a { en, vi } object. */
export const loc = (lang: Lang, value: { en: string; vi?: string } | undefined) => (value ? value[lang] ?? value.en : '');

/** Build a site URL that respects the configured base path. */
export function href(...parts: (string | undefined)[]): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = parts.filter(Boolean).join('/');
  return `${base}/${path}${path ? '/' : ''}`;
}

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'vi' : 'en';
}
