import { cache } from "react";
import { FAQ_DATA } from "./data/faq";
import type { Language } from "./translations";

export type FAQItem = {
  question: string;
  answer: string;
  order?: number;
};

export const fetchFAQ = cache(async (locale: Language = "en"): Promise<FAQItem[]> => {
  return FAQ_DATA[locale] ?? FAQ_DATA.en;
});
