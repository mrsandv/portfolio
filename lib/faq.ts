import { cache } from "react";
import { logError } from "./log";
import type { Language } from "./translations";

export type FAQItem = {
  question: string;
  answer: string;
  order?: number;
};

export const fetchFAQFromPayload = cache(async (locale: Language = "en"): Promise<FAQItem[]> => {
  if (!process.env.MONGODB_URI) return [];
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "faq",
      limit: 100,
      sort: "order",
      locale,
    });
    return result.docs as unknown as FAQItem[];
  } catch (err) {
    logError("faq", err);
    return [];
  }
});
