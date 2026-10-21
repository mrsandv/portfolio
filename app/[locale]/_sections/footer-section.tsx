import { Footer } from "@/components/footer";
import { fetchSettings } from "@/lib/content";
import { getLocale } from "@/lib/request-locale";
import { getSocials } from "./socials";

export async function FooterSection() {
  const [settings, socials] = await Promise.all([fetchSettings(await getLocale()), getSocials()]);
  return <Footer socialLinks={socials.record} settings={settings} />;
}
