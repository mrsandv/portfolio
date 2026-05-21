import { BentoPortfolio } from "@/components/bento-portfolio";
import { fetchSettings } from "@/lib/cms-server";
import { getHighlightedProjects } from "@/lib/highlight";

export async function BentoSection() {
  const [projects, es, en] = await Promise.all([
    getHighlightedProjects(),
    fetchSettings("es"),
    fetchSettings("en"),
  ]);
  return <BentoPortfolio projects={projects} settings={{ es, en }} />;
}
