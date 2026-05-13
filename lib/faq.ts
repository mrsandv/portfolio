export type FAQItem = {
  question: string;
  answer: string;
  order?: number;
};

export async function fetchFAQFromPayload(locale: string = "es"): Promise<FAQItem[]> {
  if (!process.env.MONGODB_URI) return [];
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "faq",
      limit: 100,
      sort: "order",
      locale: locale as any,
    });
    return result.docs as unknown as FAQItem[];
  } catch (err) {
    console.error("[faq] Payload fetch failed:", err);
    return [];
  }
}
