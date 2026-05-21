import { cache } from "react";
import { logError } from "./log";
import type { StackItem } from "./stack";

export const fetchStackFromPayload = cache(async (): Promise<StackItem[]> => {
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
});
