"use client";

import { Languages } from "lucide-react";
import { useLanguageStore } from "@/hooks/use-language";

export function LanguageToggle() {
  const language = useLanguageStore((s) => s.language);
  const toggleLanguage = useLanguageStore((s) => s.toggleLanguage);

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="flex h-9 cursor-pointer items-center gap-2 rounded-full bg-secondary px-3 text-foreground transition hover:bg-secondary/80"
      aria-label="Toggle language"
    >
      <Languages className="h-4 w-4" />
      <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
        {language === "es" ? "ESP" : "ENG"}
      </span>
    </button>
  );
}
