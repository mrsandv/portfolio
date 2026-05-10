"use client";

import { ArrowRight, FileText } from "lucide-react";
import { motion } from "motion/react";
import { GlitchAvatar } from "@/components/glitch-avatar";
import { useLanguageStore } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

const cellEntrance = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export function Hero() {
  const { language } = useLanguageStore();
  const t = translations[language].hero;

  return (
    <section className="relative px-6 pt-28 pb-12 md:pt-32">
      <div className="mx-auto grid max-w-7xl auto-rows-[minmax(140px,auto)] grid-cols-1 gap-3 md:grid-cols-4">
        <motion.div
          {...cellEntrance(0)}
          className="rounded-2xl border border-border bg-card p-8 shadow-sm md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-2 md:p-12"
        >
          <h1 className="text-balance text-4xl font-black leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {t.title}
            <span className="text-accent">{t.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.description}
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {t.tagline}
          </p>
        </motion.div>

        <motion.div
          {...cellEntrance(0.05)}
          className="overflow-hidden rounded-2xl border border-border bg-secondary shadow-sm md:col-start-4 md:row-start-1 md:row-end-3"
        >
          <GlitchAvatar />
        </motion.div>

        <motion.div
          {...cellEntrance(0.1)}
          className="flex flex-col justify-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm md:col-start-1 md:row-start-2"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {t.status}
            </span>
          </div>
          <ul className="flex flex-wrap items-center gap-2">
            {t.statusRoles.map((role) => (
              <li
                key={role}
                className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-bold text-foreground"
              >
                {role}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.a
          href="#contact"
          {...cellEntrance(0.15)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group flex flex-col justify-between rounded-2xl bg-accent p-5 text-accent-foreground shadow-sm transition-shadow hover:shadow-md md:col-start-2 md:row-start-2"
        >
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          <div>
            <p className="text-base font-bold leading-tight">{t.ctaConnect}</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-wider opacity-70">
              {t.ctaConnectLabel}
            </p>
          </div>
        </motion.a>

        <motion.a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          {...cellEntrance(0.2)}
          whileHover={{ scale: 1.02, backgroundColor: "var(--secondary)" }}
          whileTap={{ scale: 0.98 }}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors md:col-start-3 md:row-start-2"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-accent">
            <FileText className="h-4 w-4" />
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-foreground">{t.ctaCV}</p>
            <p className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
              {t.cvLabel}
            </p>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
