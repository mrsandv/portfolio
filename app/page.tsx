import { AboutFinalCTA } from "@/components/about-final-cta";
import { BentoPortfolio } from "@/components/bento-portfolio";
import { ContactFAQ } from "@/components/contact-faq";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { StackProcess } from "@/components/stack-process";

export default function Home() {
  const staticLinks: Record<string, string> = {
    linkedIn: "https://linkedin.com/in/mrsan/?locale=en-US",
  };
  return (
    <main className="min-h-screen bg-background">
      <Navbar staticLinks={staticLinks} />
      <Hero staticLinks={staticLinks} />
      <BentoPortfolio />
      <StackProcess />
      <ContactFAQ />
      <AboutFinalCTA />
      <Footer />
    </main>
  );
}
