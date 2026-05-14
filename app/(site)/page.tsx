import { BentoPortfolio } from "@/components/bento-portfolio";
import { ContactFAQ } from "@/components/contact-faq";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { StackProcess } from "@/components/stack-process";
import { getHighlightedProjects } from "@/lib/highlight";
import { fetchStackFromPayload } from "@/lib/stack";
import { fetchFAQFromPayload } from "@/lib/faq";
import { fetchSettings, fetchMethodology } from "@/lib/cms";

export default async function Home() {
  // We determine the locale (hardcoded as 'es' for now, but in a real app it should be dynamic)
  const locale = "es"; 
  
  const [projects, stack, faqs_es, faqs_en, settings, methodology] = await Promise.all([
    getHighlightedProjects(),
    fetchStackFromPayload(),
    fetchFAQFromPayload("es"),
    fetchFAQFromPayload("en"),
    fetchSettings(locale),
    fetchMethodology(locale),
  ]);

  const socialLinks = settings?.socialLinks?.reduce((acc, link) => {
    acc[link.platform] = link.url;
    return acc;
  }, {} as Record<string, string>) ?? {};

  return (
    <main className="min-h-screen bg-background">
      <Navbar staticLinks={socialLinks} settings={settings} />
      <Hero settings={settings} />
      <BentoPortfolio projects={projects} settings={settings} />
      <StackProcess stack={stack} methodology={methodology} settings={settings} />
      <FinalCTA settings={settings} />
      <ContactFAQ faqs={{ es: faqs_es, en: faqs_en }} settings={settings} />
      <Footer socialLinks={socialLinks} settings={settings} />
    </main>
  );
}
