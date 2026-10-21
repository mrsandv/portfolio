import type { MetadataRoute } from "next";
import { alternates, LOCALES, localeHref } from "@/lib/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

/**
 * Pages that exist in every locale. Each one becomes an entry per locale with
 * hreflang alternates. Blog posts (single-language allowed) will be appended
 * separately.
 */
const PAGES: { path: string; changeFrequency: "monthly" | "weekly"; priority: number }[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL) return [];
  const lastModified = new Date();

  return PAGES.flatMap(({ path, changeFrequency, priority }) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${localeHref(locale, path)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(alternates(locale, path).languages).map(([lang, href]) => [
            lang,
            `${SITE_URL}${href}`,
          ]),
        ),
      },
    })),
  );
}
