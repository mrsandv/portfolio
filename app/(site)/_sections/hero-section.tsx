import { Hero } from "@/components/hero";
import { fetchSettings } from "@/lib/cms-server";

export async function HeroSection() {
  const [es, en] = await Promise.all([fetchSettings("es"), fetchSettings("en")]);
  return <Hero settings={{ es, en }} />;
}
