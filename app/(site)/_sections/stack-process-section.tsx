import { StackProcess } from "@/components/stack-process";
import { fetchMethodology, fetchSettings, fetchStack } from "@/lib/content";

export async function StackProcessSection() {
  const [stack, methodology_es, methodology_en, es, en] = await Promise.all([
    fetchStack(),
    fetchMethodology("es"),
    fetchMethodology("en"),
    fetchSettings("es"),
    fetchSettings("en"),
  ]);
  return (
    <StackProcess
      stack={stack}
      methodology={{ es: methodology_es, en: methodology_en }}
      settings={{ es, en }}
    />
  );
}
