import config from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";
import type { MethodologyStep, SiteSettings } from "./cms";
import { logError } from "./log";
import type { Language } from "./translations";

export const fetchSettings = cache(
  async (locale: Language = "en"): Promise<SiteSettings | null> => {
    if (!process.env.MONGODB_URI) return null;
    try {
      const payload = await getPayload({ config });
      const settings = await payload.findGlobal({
        slug: "settings",
        locale,
        depth: 1,
      });
      return settings as unknown as SiteSettings;
    } catch (err) {
      logError("settings", err);
      return null;
    }
  },
);

export const fetchMethodology = cache(
  async (locale: Language = "en"): Promise<MethodologyStep[]> => {
    if (!process.env.MONGODB_URI) return [];
    try {
      const payload = await getPayload({ config });
      const result = await payload.find({
        collection: "methodology",
        limit: 10,
        sort: "order",
        locale,
      });
      return result.docs as unknown as MethodologyStep[];
    } catch (err) {
      logError("methodology", err);
      return [];
    }
  },
);
