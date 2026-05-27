import { BentoPortfolio } from "@/components/bento-portfolio";
import { fetchSettings } from "@/lib/cms-server";
import { getHighlightedProjects } from "@/lib/highlight";

export async function BentoSection() {
  const [projectsEs, projectsEn, es, en] = await Promise.all([
    getHighlightedProjects("es"),
    getHighlightedProjects("en"),
    fetchSettings("es"),
    fetchSettings("en"),
  ]);
  return (
    <BentoPortfolio
      projects={{ es: projectsEs, en: projectsEn }}
      settings={{ es, en }}
    />
  );
}
