import { Hero } from "@/components/hero";
import { fetchSettings } from "@/lib/content";
import { getLocale } from "@/lib/request-locale";

export async function HeroSection() {
  const settings = await fetchSettings(await getLocale());
  return <Hero settings={settings} />;
}
