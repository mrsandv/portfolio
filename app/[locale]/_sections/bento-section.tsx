import { BentoPortfolio } from "@/components/bento-portfolio";
import { fetchSettings } from "@/lib/content";
import { getHighlightedProjects } from "@/lib/highlight";
import { getLocale } from "@/lib/request-locale";

export async function BentoSection() {
  const locale = await getLocale();
  const [projects, settings] = await Promise.all([getHighlightedProjects(), fetchSettings(locale)]);
  return <BentoPortfolio projects={projects[locale]} settings={settings} />;
}
