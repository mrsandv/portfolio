import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { fetchSettings } from "@/lib/cms";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = "es";
  const settings = await fetchSettings(locale);
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

  const siteTitle = settings?.siteTitle || "Marco Sandoval — Software Engineer";
  const siteDescription = settings?.siteDescription || "Software engineer with 7+ years shipping production code.";
  const siteName = settings?.siteName || "Marco Sandoval";
  const keywords = settings?.keywords?.map(k => k.keyword) || ["software engineer", "full-stack"];
  const ogImageUrl = typeof settings?.ogImage === 'object' ? settings.ogImage.url : "/og-image.png";

  return {
    metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
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
    alternates: {
      canonical: "/",
      languages: {
        "es-MX": "/",
        "en-US": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: "es_MX",
      url: SITE_URL,
      siteName: siteName,
      title: siteTitle,
      description: siteDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [ogImageUrl],
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#DCD7C9" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = "es";
  const settings = await fetchSettings(locale);
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
  const siteName = settings?.siteName || "Marco Sandoval";
  const siteDescription = settings?.siteDescription || "";

  const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const UMAMI_SCRIPT_URL = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteName,
    url: SITE_URL,
    jobTitle: "Software Engineer",
    description: siteDescription,
    sameAs: settings?.socialLinks?.map(l => l.url) || [],
  };

  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>

        <Script
          id="ld-person"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        {UMAMI_WEBSITE_ID && (
          <Script
            src={UMAMI_SCRIPT_URL}
            data-website-id={UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
            defer
          />
        )}
      </body>
    </html>
  );
}
