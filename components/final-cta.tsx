"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cellEntrance } from "@/lib/animations";
import { SOCIAL_META } from "@/lib/social-links";
import { translations } from "@/lib/translations";
import type { SiteSettings, SocialLink } from "@/lib/cms";

export function FinalCTA({
  settings,
  socialLinks,
}: {
  settings: SiteSettings | null;
  socialLinks?: SocialLink[];
}) {
  const t = translations.finalCta;

  const line1 = settings?.finalCtaLine1 || t.headlineLine1;
  const line2 = settings?.finalCtaLine2 || t.headlineLine2;

  const ctaSocials = (socialLinks ?? settings?.socialLinks ?? [])
    .filter((link) => link.showInFinalCta !== false && SOCIAL_META[link.platform])
    .map((link) => ({ ...SOCIAL_META[link.platform], href: link.url }));

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl space-y-12 text-center">
        <motion.div {...cellEntrance(0)}>
          <h2 className="text-balance text-5xl font-black leading-none tracking-tighter text-foreground md:text-8xl lg:text-9xl">
            {line1} <br />
            <span className="text-accent">{line2}</span>
          </h2>
        </motion.div>

        {ctaSocials.length > 0 && (
          <motion.div
            {...cellEntrance(0.1)}
            className="flex flex-wrap justify-center gap-4"
          >
            {ctaSocials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 rounded-2xl border border-border bg-card px-8 py-4 text-lg font-bold shadow-sm transition-all hover:border-primary/40 ${social.color}`}
              >
                <social.icon className="h-6 w-6" />
                <span>{social.label}</span>
                <ArrowRight className="h-4 w-4 -rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
