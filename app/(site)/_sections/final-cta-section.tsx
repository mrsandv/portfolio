import { FinalCTA } from "@/components/final-cta";
import { fetchSettings } from "@/lib/cms-server";
import { getSocials } from "./socials";

export async function FinalCTASection() {
  const [es, en, socials] = await Promise.all([
    fetchSettings("es"),
    fetchSettings("en"),
    getSocials(),
  ]);
  return <FinalCTA settings={{ es, en }} socialLinks={socials.list} />;
}
