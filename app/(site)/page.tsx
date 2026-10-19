import { Suspense } from "react";
import { BentoSection } from "./_sections/bento-section";
import { ContactFAQSection } from "./_sections/contact-faq-section";
import { FinalCTASection } from "./_sections/final-cta-section";
import { FooterSection } from "./_sections/footer-section";
import { HeroSection } from "./_sections/hero-section";
import { InstallThemeSection } from "./_sections/install-theme-section";
import { NavbarSection } from "./_sections/navbar-section";
import {
  BentoSkeleton,
  ContactFAQSkeleton,
  FinalCTASkeleton,
  FooterSkeleton,
  HeroSkeleton,
  InstallThemeSkeleton,
  NavbarSkeleton,
  StackProcessSkeleton,
} from "./_sections/skeletons";
import { StackProcessSection } from "./_sections/stack-process-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<NavbarSkeleton />}>
        <NavbarSection />
      </Suspense>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<BentoSkeleton />}>
        <BentoSection />
      </Suspense>
      <Suspense fallback={<StackProcessSkeleton />}>
        <StackProcessSection />
      </Suspense>
      <Suspense fallback={<InstallThemeSkeleton />}>
        <InstallThemeSection />
      </Suspense>
      <Suspense fallback={<FinalCTASkeleton />}>
        <FinalCTASection />
      </Suspense>
      <Suspense fallback={<ContactFAQSkeleton />}>
        <ContactFAQSection />
      </Suspense>
      <Suspense fallback={<FooterSkeleton />}>
        <FooterSection />
      </Suspense>
    </main>
  );
}
