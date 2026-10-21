"use client";

import { createContext, useContext } from "react";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import type { Language } from "@/lib/translations";

const LocaleContext = createContext<Language>(DEFAULT_LOCALE);

/** The locale comes from the URL (`/en`, `/es`); the layout seeds it here. */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Language;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
