import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/toaster";
import { fetchSettings } from "@/lib/cms";
import { SITE_NAME } from "@/lib/constants";
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
  const settings = await fetchSettings("en");
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

  const siteTitle =
    settings?.siteTitle || `${SITE_NAME} — Software Engineering`;
  const siteDescription =
    settings?.siteDescription ||
    "Software engineering with 7+ years shipping production code.";
  const siteName = settings?.siteName || SITE_NAME;
  const keywords = settings?.keywords?.map((k) => k.keyword) || [
    "software engineer",
    "full-stack",
  ];
  const ogImageUrl =
    typeof settings?.ogImage === "object"
      ? settings.ogImage.url
      : "/og-image.png";
  const ogLocale = settings?.ogLocale || "en_US";

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
        "en-US": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
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
  const settings = await fetchSettings("en");
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
      lang="en"
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
          {children}
          <Toaster />
        </ThemeProvider>

        <Script
          id="ld-person"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
