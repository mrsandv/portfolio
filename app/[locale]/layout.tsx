import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { LocaleProvider } from "@/components/locale-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/toaster";
import { SITE_NAME } from "@/lib/constants";
import { fetchSettings } from "@/lib/content";
import { DEFAULT_FLAVOR, FLAVOR_SLUGS, THEME_STORAGE_KEY } from "@/lib/flavors";
import { alternates, isLocale, LOCALES, otherLocale } from "@/lib/i18n";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// Only /en and /es exist; anything else under the segment is a 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const settings = await fetchSettings(locale);
  const otherSettings = await fetchSettings(otherLocale(locale));
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

  const siteTitle = settings?.siteTitle || `${SITE_NAME} — Software Engineering`;
  const siteDescription =
    settings?.siteDescription || "Software engineering with 7+ years shipping production code.";
  const siteName = settings?.siteName || SITE_NAME;
  const keywords = settings?.keywords?.map((k) => k.keyword) || ["software engineer", "full-stack"];
  const ogLocale = settings?.ogLocale || "en_US";

  return {
    metadataBase: new URL(SITE_URL || "http://localhost:3000"),
    title: {
      default: siteTitle,
      template: `%s — ${siteName}`,
    },
    description: siteDescription,
    keywords: keywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    applicationName: siteName,
    alternates: alternates(locale),
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: otherSettings?.ogLocale,
      url: alternates(locale).canonical,
      siteName: siteName,
      title: siteTitle,
      description: siteDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/favicon-32x32.png",
      apple: "/apple-touch-icon.png",
    },
  };
}

export const viewport: Viewport = {
  // Must match the DEFAULT_FLAVOR background (Background Radiation).
  themeColor: "#14101A",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const settings = await fetchSettings(locale);
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
  const siteName = settings?.siteName || SITE_NAME;
  const siteDescription = settings?.siteDescription || "";
  const jobTitle = settings?.jobTitle || "Software Engineer";

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteName,
    url: SITE_URL,
    jobTitle,
    description: siteDescription,
    sameAs: settings?.socialLinks?.map((l) => l.url) || [],
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="font-sans">
        <ThemeProvider
          attribute="data-theme"
          storageKey={THEME_STORAGE_KEY}
          themes={FLAVOR_SLUGS}
          defaultTheme={DEFAULT_FLAVOR}
          enableSystem={false}
          disableTransitionOnChange
        >
          <LocaleProvider locale={locale}>
            {children}
            <Toaster />
          </LocaleProvider>
        </ThemeProvider>

        <script
          type="application/ld+json"
          // Inline (not next/script) so crawlers find it in the initial HTML.
          // `<` is escaped so the JSON can never close the script tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {/* Served from /stats (rewrite in next.config.mjs) so blockers can't filter it by domain. */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src="/stats/script.js"
            data-host-url="/stats"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            data-domains={umamiDomains(SITE_URL)}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}

/**
 * Hostnames Umami is allowed to track. It compares `location.hostname`
 * exactly, so both the apex and the www variant are listed: the site URL can
 * be one while visitors land on the other after a redirect.
 */
function umamiDomains(siteUrl: string | undefined) {
  if (!siteUrl) return undefined;
  const apex = new URL(siteUrl).hostname.replace(/^www\./, "");
  return `${apex},www.${apex}`;
}
