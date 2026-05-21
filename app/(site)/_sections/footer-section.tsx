import { Footer } from "@/components/footer";
import { fetchSettings } from "@/lib/cms-server";
import { getSocials } from "./socials";

export async function FooterSection() {
  const [es, en, socials] = await Promise.all([
    fetchSettings("es"),
    fetchSettings("en"),
    getSocials(),
  ]);
  return <Footer socialLinks={socials.record} settings={{ es, en }} />;
}
