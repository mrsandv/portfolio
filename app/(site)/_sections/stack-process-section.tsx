import { StackProcess } from "@/components/stack-process";
import { fetchMethodology, fetchSettings } from "@/lib/cms-server";
import { fetchStackFromPayload } from "@/lib/stack-server";

export async function StackProcessSection() {
  const [stack, methodology_es, methodology_en, es, en] = await Promise.all([
    fetchStackFromPayload(),
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
