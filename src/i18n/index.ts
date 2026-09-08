import en from './en.json';
import fr from './fr.json';
import ar from './ar.json';
import es from './es.json';
import pt from './pt.json';

export const LANGS = ['en', 'fr', 'ar', 'es', 'pt'] as const;
export type Lang = (typeof LANGS)[number];

export const RTL_LANGS: readonly string[] = ['ar'];

export const LANG_LABELS: Record<Lang, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
  es: 'Español',
  pt: 'Português',
};

const dicts: Record<string, unknown> = { en, fr, ar, es, pt };

export function isRtl(lang: string): boolean {
  return RTL_LANGS.includes(lang);
}

export function normalizeLang(lang: string): Lang {
  return (LANGS as readonly string[]).includes(lang) ? (lang as Lang) : 'en';
}

function merge(base: unknown, over: unknown): unknown {
  if (Array.isArray(base)) return over === undefined ? base : over;
  if (base && typeof base === 'object' && over && typeof over === 'object') {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [k, v] of Object.entries(over as Record<string, unknown>)) {
      out[k] = merge((base as Record<string, unknown>)[k], v);
    }
    return out;
  }
  return over === undefined ? base : over;
}

/**
 * Returns the dictionary for `lang`, deep-merged over English.
 * Any key missing from a translation silently falls back to English,
 * so a partially translated language never renders blank.
 */
export function getDict(lang: string) {
  const l = normalizeLang(lang);
  const d = l === 'en' ? en : (merge(en, dicts[l]) as typeof en);
  return d;
}

/** URL prefix for a language: '' for default (en), 'fr/' otherwise. */
export function langPrefix(lang: string): string {
  const l = normalizeLang(lang);
  return l === 'en' ? '' : `${l}/`;
}
