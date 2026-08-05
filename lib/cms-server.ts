import { cache } from "react";
import type { MethodologyStep, SiteSettings } from "./cms";
import { METHODOLOGY_DATA } from "./data/methodology";
import { SITE_SETTINGS_DATA } from "./data/settings";
import type { Language } from "./translations";

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
