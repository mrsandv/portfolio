"use client";

import { useState } from "react";
import { 
  ArrowRight, 
  FileText, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Send,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GlitchAvatar } from "@/components/glitch-avatar";

const cellEntrance = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const ctaInteractions = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 400, damping: 22 },
};

import { useLanguageStore } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

export function Hero({
  staticLinks,
}: {
  staticLinks: Record<string, string>;
}) {
  const { language } = useLanguageStore();
  const t = translations[language].hero;
  const [isSocialOpen, setIsSocialOpen] = useState(false);

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: staticLinks.linkedIn },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "X (Twitter)", icon: Twitter, href: "#" },
    { name: "Telegram", icon: Send, href: "#" },
  ];

  return (
    <section className="relative px-6 pt-28 pb-12 md:pt-32">
      <div className="mx-auto grid max-w-7xl auto-rows-[minmax(140px,auto)] grid-cols-1 gap-3 md:grid-cols-4">
        {/* [04] Manifesto */}
        <motion.div
          {...cellEntrance(0)}
          className="rounded-2xl border border-border bg-card p-8 shadow-sm md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-4 md:p-12"
        >
          <h1 className="text-balance text-4xl font-black leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {t.title}
            <span className="text-accent">{t.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.description}
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {t.tagline}
          </p>
        </motion.div>

        {/* [05] Glitch avatar */}
        <motion.div
          {...cellEntrance(0.05)}
          className="overflow-hidden rounded-2xl border border-border bg-secondary shadow-sm md:col-start-4 md:row-start-1 md:row-end-4"
        >
          <GlitchAvatar />
        </motion.div>

        {/* [06] Status */}
        <motion.div
          {...cellEntrance(0.1)}
          className="flex flex-col justify-center rounded-2xl border border-border bg-card p-4 shadow-sm md:col-start-1 md:row-start-4"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
              {t.status}
            </span>
          </div>
          <ul className="space-y-1 text-xs font-bold text-foreground">
            {t.statusRoles.map((role) => (
              <li key={role} className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {role}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* [10] CTA Connect — Now expanded since Email is in footer */}
        <motion.div
          {...cellEntrance(0.15)}
          className="flex flex-col justify-center rounded-2xl border border-border bg-card p-4 shadow-sm md:col-start-2 md:col-end-4 md:row-start-4"
        >
          {/* Let's Connect Dropdown Container */}
          <div className="relative w-full">
            <motion.button
              onClick={() => setIsSocialOpen(!isSocialOpen)}
              {...ctaInteractions}
              className="group flex w-full items-center justify-between rounded-xl bg-accent px-6 py-4 text-sm font-bold text-accent-foreground shadow-sm transition-all hover:shadow-md"
            >
              <span>{t.ctaConnect}</span>
              <ArrowRight className={`h-5 w-5 transition-transform ${isSocialOpen ? "rotate-90" : "group-hover:translate-x-1"}`} />
            </motion.button>

            <AnimatePresence>
              {isSocialOpen && (
                <>
                  {/* Backdrop to close */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsSocialOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: -8, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full left-0 z-20 mb-2 w-full min-w-[200px] overflow-hidden rounded-xl border border-border bg-card p-1 shadow-xl"
                  >
                    <div className="grid grid-cols-1 gap-0.5">
                      {socialLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-lg px-4 py-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                          onClick={() => setIsSocialOpen(false)}
                        >
                          <div className="flex items-center gap-3">
                            <link.icon className="h-4 w-4 text-accent" />
                            {link.name}
                          </div>
                          <ExternalLink className="h-3 w-3 opacity-30" />
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* [11] CV Download */}
        <motion.a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          {...cellEntrance(0.2)}
          whileHover={{ scale: 1.02, backgroundColor: "var(--secondary)" }}
          whileTap={{ scale: 0.98 }}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors md:col-start-4 md:row-start-4"
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
