import { type NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE } from "@/lib/i18n";

/**
 * Every page lives under `/en` or `/es`. A path without a locale (`/`, old
 * bookmarks) is redirected to the language the visitor chose with the toggle,
 * or else the first supported one in Accept-Language. 307 because the target
 * depends on the visitor.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

function preferredLocale(request: NextRequest) {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookie)) return cookie;

  // "es-MX,es;q=0.9,en;q=0.8" → the highest-weighted supported language.
  const ranked = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.find((r) => isLocale(r.lang))?.lang ?? DEFAULT_LOCALE;
}

export const config = {
  // Skip API routes, the Umami proxy, Next internals and any file with an
  // extension (favicons, PDFs, sitemap.xml, robots.txt).
  matcher: ["/((?!api/|stats/|_next/|.*\\..*).*)"],
};
