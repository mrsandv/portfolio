import { Navbar } from "@/components/navbar";
import { getSocials } from "./socials";

export async function NavbarSection() {
  const socials = await getSocials();
  return <Navbar staticLinks={socials.record} />;
}
