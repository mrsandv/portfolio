import { BentoPortfolio } from "@/components/bento-portfolio";
import { ContactFAQ } from "@/components/contact-faq";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { StackProcess } from "@/components/stack-process";
import { getHighlightedProjects } from "@/lib/highlight";
import { fetchStackFromPayload } from "@/lib/stack-server";
import { fetchFAQFromPayload } from "@/lib/faq";
import { fetchSettings, fetchMethodology, type SocialLink } from "@/lib/cms";

export default async function Home() {
  const [projects, stack, faqs, settings, methodology] = await Promise.all([
    getHighlightedProjects(),
    fetchStackFromPayload(),
    fetchFAQFromPayload("en"),
    fetchSettings("en"),
    fetchMethodology("en"),
  ]);

  const FALLBACK_SOCIALS: SocialLink[] = [
    { platform: "linkedin", url: "https://www.linkedin.com/" },
    { platform: "github", url: "https://github.com/" },
    { platform: "instagram", url: "https://www.instagram.com/" },
    { platform: "telegram", url: "https://t.me/" },
  ];

  const socialList = settings?.socialLinks?.length ? settings.socialLinks : FALLBACK_SOCIALS;
  const socialLinks = Object.fromEntries(socialList.map((link) => [link.platform, link.url]));

  return (
    <main className="min-h-screen bg-background">
      <Navbar staticLinks={socialLinks} settings={settings} />
      <Hero settings={settings} />
      <BentoPortfolio projects={projects} settings={settings} />
      <StackProcess stack={stack} methodology={methodology} settings={settings} />
      <FinalCTA settings={settings} socialLinks={socialList} />
      <ContactFAQ faqs={faqs} settings={settings} />
      <Footer socialLinks={socialLinks} settings={settings} />
    </main>
  );
}
