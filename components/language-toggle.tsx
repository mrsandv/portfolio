"use client";

import { useLanguageStore } from "@/hooks/use-language";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="flex h-9 items-center gap-2 rounded-xl border border-border bg-card px-3 text-foreground transition hover:bg-secondary md:h-10"
      aria-label="Toggle language"
    >
      <Languages className="h-4 w-4" />
      <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
        {language === "es" ? "ESP" : "ENG"}
      </span>
    </button>
  );
}
