"use client";

import { Languages } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/locale-provider";
import { LOCALE_COOKIE, otherLocale } from "@/lib/i18n";
import { translations } from "@/lib/translations";

/** Links to the same page in the other locale and remembers the choice for proxy.ts. */
export function LanguageToggle() {
  const language = useLocale();
  const pathname = usePathname();
  const target = otherLocale(language);
  const href = pathname.replace(/^\/(en|es)(?=\/|$)/, `/${target}`);

  return (
    <Link
      href={href}
      hrefLang={target}
      onClick={() => {
        // biome-ignore lint/suspicious/noDocumentCookie: a plain one-year preference cookie
        document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
      }}
      className="flex h-9 cursor-pointer items-center gap-2 rounded-full bg-secondary px-3 text-foreground transition hover:bg-secondary/80"
      aria-label={translations[language].nav.switchLanguage}
    >
      <Languages className="h-4 w-4" />
      <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
        {language === "es" ? "ESP" : "ENG"}
      </span>
    </Link>
  );
}
