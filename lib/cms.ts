export type Localized<T> = { es: T; en: T };

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
