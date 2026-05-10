"use client";

import { ArrowUp, Terminal } from "lucide-react";
import { useLanguageStore } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

export function Footer() {
  const { language } = useLanguageStore();
  const t = translations[language].footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Terminal className="h-4 w-4" />
              </div>
              <span className="font-mono text-sm font-bold tracking-tight text-foreground">
                MRSAN · {currentYear}
              </span>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              {t.builtWith}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              <span>{t.backToTop}</span>
              <ArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-1" />
            </button>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/50">
              © {currentYear} · {t.rightsReserved}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
