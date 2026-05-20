"use client";

import { ArrowUp } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { SOCIAL_META } from "@/lib/social-links";
import { translations } from "@/lib/translations";
import type { SiteSettings } from "@/lib/cms";

export function Footer({
  socialLinks = {},
  settings,
}: {
  socialLinks?: Record<string, string>;
  settings?: SiteSettings | null;
}) {
  const t = translations.footer;
  const siteName = settings?.siteName || SITE_NAME;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="px-6 py-12 border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-xl font-black tracking-tight text-foreground">
              {siteName}
            </h3>
            <p className="text-xs text-muted-foreground max-w-xs">
              {t.builtWith}
            </p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
              © {new Date().getFullYear()} · {t.rightsReserved}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex items-center gap-4">
              {Object.entries(socialLinks).map(([platform, url]) => {
                const meta = SOCIAL_META[platform];
                if (!meta) return null;
                const Icon = meta.icon;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex cursor-pointer items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors group"
            >
              <span>{t.backToTop}</span>
              <ArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
