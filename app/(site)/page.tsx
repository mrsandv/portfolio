import { BentoPortfolio } from "@/components/bento-portfolio";
import { ContactFAQ } from "@/components/contact-faq";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { StackProcess } from "@/components/stack-process";
import { getHighlightedProjects } from "@/lib/highlight";

export default async function Home() {
  const staticLinks: Record<string, string> = {
    linkedIn: "https://linkedin.com/in/mrsan/?locale=en-US",
  };
  const projects = await getHighlightedProjects();
  return (
    <main className="min-h-screen bg-background">
      <Navbar staticLinks={staticLinks} />
      <Hero />
      <BentoPortfolio projects={projects} />
      <StackProcess />
      <FinalCTA />
      <ContactFAQ />
      <Footer />
    </main>
  );
}
