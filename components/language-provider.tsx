"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/hooks/use-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useLanguageStore((s) => s.language);
  const setLanguage = useLanguageStore((s) => s.setLanguage);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem("language-storage");
      let hasUserSelection = false;
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.state?.language) {
          hasUserSelection = true;
        }
      }

      if (!hasUserSelection && typeof navigator !== "undefined") {
        const browserLang = (navigator.language || navigator.languages?.[0] || "").toLowerCase();
        const detectedLang = browserLang.startsWith("es") ? "es" : "en";
        setLanguage(detectedLang);
      }
    } catch {
      // Fallback silently if localStorage fails or is restricted
    }
  }, [setLanguage]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  return <>{children}</>;
}
