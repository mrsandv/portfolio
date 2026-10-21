import type { Language } from "./translations";

export const LOCALES = ["en", "es"] as const satisfies readonly Language[];
export const DEFAULT_LOCALE: Language = "en";

/** Cookie the language toggle writes; proxy.ts reads it to pick the locale. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string | undefined): value is Language {
  return LOCALES.includes(value as Language);
}

export function otherLocale(locale: Language): Language {
  return locale === "es" ? "en" : "es";
}

/**
 * Prefixes a site path with the locale: `("es", "/blog")` → `/es/blog`,
 * `("en", "#work")` → `/en#work`, `("en", "/")` → `/en`.
 */
export function localeHref(locale: Language, path = "/") {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

/**
 * `alternates` metadata for a page that exists in every locale: canonical for
 * the current one, hreflang for each, and `x-default` pointing at the
 * unprefixed path, which proxy.ts redirects by language.
 */
export function alternates(locale: Language, path = "/") {
  return {
    canonical: localeHref(locale, path),
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, localeHref(l, path)])),
      "x-default": path,
    },
  };
}
