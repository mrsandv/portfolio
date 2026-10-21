import { FinalCTA } from "@/components/final-cta";
import { fetchSettings } from "@/lib/content";
import { getLocale } from "@/lib/request-locale";
import { getSocials } from "./socials";

export async function FinalCTASection() {
  const [settings, socials] = await Promise.all([fetchSettings(await getLocale()), getSocials()]);
  return <FinalCTA settings={settings} socialLinks={socials.list} />;
}
