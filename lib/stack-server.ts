import type { StackItem } from "./stack";
import { logError } from "./log";

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
    logError("stack", err);
    return [];
  }
}
