export type StackItem = {
  name: string;
  svg: string;
  hex: string;
  order?: number;
};

/**
 * Static fallbacks have been removed.
 * All stack data should be managed via Payload CMS.
 */
export const STACK: StackItem[] = [];

export async function fetchStackFromPayload(): Promise<StackItem[]> {
  if (!process.env.MONGODB_URI) return [];
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "stack",
      limit: 100,
      sort: "order",
    });
    return result.docs as unknown as StackItem[];
  } catch (err) {
    console.error("[stack] Payload fetch failed:", err);
    return [];
  }
}
