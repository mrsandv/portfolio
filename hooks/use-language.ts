import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Language } from "@/lib/translations";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: "en",
      setLanguage: (lang) => set({ language: lang }),
      toggleLanguage: () => set({ language: get().language === "es" ? "en" : "es" }),
    }),
    {
      name: "language-storage",
    },
  ),
);
