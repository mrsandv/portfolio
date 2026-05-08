import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'es' | 'en';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'es', // Default to Spanish as requested
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'language-storage',
    }
  )
);
