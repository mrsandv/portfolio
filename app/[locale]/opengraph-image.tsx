import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/constants";
import { fetchSettings } from "@/lib/content";
import { DEFAULT_FLAVOR, FLAVORS } from "@/lib/flavors";
import { isLocale, LOCALES } from "@/lib/i18n";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/** Link preview card, one per locale, in the default flavor's colors. */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const settings = await fetchSettings(locale);
  const flavor = FLAVORS.find((f) => f.slug === DEFAULT_FLAVOR) ?? FLAVORS[0];
  const [background, accent, accent2] = flavor.swatch;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background,
        color: "#F4F1F7",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: accent2, letterSpacing: 2 }}>
        {(settings?.siteName ?? SITE_NAME).toUpperCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
          {settings?.heroTitle}
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: accent }}>
          {settings?.heroTitleAccent}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 30, opacity: 0.8 }}>{settings?.siteTitle}</div>
    </div>,
    size,
  );
}
