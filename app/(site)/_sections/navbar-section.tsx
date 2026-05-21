import { Navbar } from "@/components/navbar";
import { fetchSettings } from "@/lib/cms-server";
import { getSocials } from "./socials";

export async function NavbarSection() {
  const [es, en, socials] = await Promise.all([
    fetchSettings("es"),
    fetchSettings("en"),
    getSocials(),
  ]);
  return <Navbar staticLinks={socials.record} settings={{ es, en }} />;
}
