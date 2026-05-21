"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/hooks/use-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useLanguageStore((s) => s.language);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  return <>{children}</>;
}
