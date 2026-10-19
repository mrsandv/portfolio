import { cache } from "react";
import { FAQ_DATA } from "./data/faq";
import { METHODOLOGY_DATA } from "./data/methodology";
import { SITE_SETTINGS_DATA } from "./data/settings";
import { STACK_DATA } from "./data/stack";
import type { StackItem } from "./stack";
import type { Language } from "./translations";
import type { FAQItem, MethodologyStep, SiteSettings } from "./types";

export const fetchSettings = cache(
  async (locale: Language = "en"): Promise<SiteSettings | null> => {
    return SITE_SETTINGS_DATA[locale] ?? SITE_SETTINGS_DATA.en;
  },
);

export const fetchMethodology = cache(
  async (locale: Language = "en"): Promise<MethodologyStep[]> => {
    return METHODOLOGY_DATA[locale] ?? METHODOLOGY_DATA.en;
  },
);

export const fetchFAQ = cache(async (locale: Language = "en"): Promise<FAQItem[]> => {
  return FAQ_DATA[locale] ?? FAQ_DATA.en;
});

export const fetchStack = cache(async (): Promise<StackItem[]> => {
  return STACK_DATA;
});
