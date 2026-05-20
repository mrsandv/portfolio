import { getPayload } from "payload";
import config from "@payload-config";
import { logError } from "./log";

export type SocialLink = {
  platform: string;
  url: string;
  showInFinalCta?: boolean;
};

export type SiteSettings = {
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  keywords?: { keyword: string }[];
  ogImage?: { url: string } | string;
  profilePicture?: { url: string } | string;
  profileLink?: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroDescription: string;
  heroTagline: string;
  resumes?: { label: string; file: { url: string } | string }[];
  availability?: { role: string }[];
  email: string;
  socialLinks?: SocialLink[];
  portfolioTitle?: string;
  portfolioDescription?: string;
  stackTitle?: string;
  processTitle?: string;
  contactTitle?: string;
  contactSubtitle?: string;
  faqTitle?: string;
  finalCtaLine1?: string;
  finalCtaLine2?: string;
  jobTitle?: string;
  ogLocale?: string;
};

export type MethodologyStep = {
  title: string;
  duration: string;
  description: string;
  order: number;
};

export async function fetchSettings(locale: string = "es"): Promise<SiteSettings | null> {
  if (!process.env.MONGODB_URI) return null;
  try {
    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({
      slug: "settings",
      locale: locale as any,
      depth: 1,
    });
    return settings as unknown as SiteSettings;
  } catch (err) {
    logError("settings", err);
    return null;
  }
}

export async function fetchMethodology(locale: string = "es"): Promise<MethodologyStep[]> {
  if (!process.env.MONGODB_URI) return [];
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "methodology",
      limit: 10,
      sort: "order",
      locale: locale as any,
    });
    return result.docs as unknown as MethodologyStep[];
  } catch (err) {
    logError("methodology", err);
    return [];
  }
}
