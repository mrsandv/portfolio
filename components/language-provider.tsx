"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/hooks/use-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { setLanguage } = useLanguageStore();
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("language-storage");
    if (!saved) {
      const browserLang = navigator.language.split("-")[0];
      setLanguage(browserLang === "en" ? "en" : "es");
    }
    setHasHydrated(true);
  }, [setLanguage]);

  if (!hasHydrated) return null;

  return <>{children}</>;
}
