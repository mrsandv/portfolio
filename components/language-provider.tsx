"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/hooks/use-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { setLanguage } = useLanguageStore();
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    // Check if we have a saved preference
    const saved = localStorage.getItem("language-storage");
    
    if (!saved) {
      // No preference, detect browser language
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "en") {
        setLanguage("en");
      } else {
        setLanguage("es");
      }
    }
    setHasHydrated(true);
  }, [setLanguage]);

  if (!hasHydrated) return null;

  return <>{children}</>;
}
