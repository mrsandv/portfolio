import { StackProcess } from "@/components/stack-process";
import { fetchMethodology, fetchSettings, fetchStack } from "@/lib/content";
import { getLocale } from "@/lib/request-locale";

export async function StackProcessSection() {
  const locale = await getLocale();
  const [stack, methodology, settings] = await Promise.all([
    fetchStack(),
    fetchMethodology(locale),
    fetchSettings(locale),
  ]);
  return <StackProcess stack={stack} methodology={methodology} settings={settings} />;
}
