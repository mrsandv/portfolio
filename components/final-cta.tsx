"use client";

import { motion } from "motion/react";
import { ArrowRight, Github, Linkedin, Mail, Calendar } from "lucide-react";
import { useLanguageStore } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

const cellEntrance = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const socials = [
  {
    label: "Email",
    href: "mailto:hello@mrsan.dev",
    icon: Mail,
    color: "hover:text-primary",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/mrsan/?locale=en-US",
    icon: Linkedin,
    color: "hover:text-blue-500",
  },
  {
    label: "GitHub",
    href: "https://github.com/mrsandv",
    icon: Github,
    color: "hover:text-foreground",
  },
  {
    label: "Cal",
    href: "https://cal.com",
    icon: Calendar,
    color: "hover:text-orange-500",
  },
];

export function FinalCTA() {
  const { language } = useLanguageStore();
  const t = translations[language].finalCta;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl space-y-12 text-center">
        <motion.div {...cellEntrance(0)}>
          <h2 className="text-balance text-5xl font-black leading-none tracking-tighter text-foreground md:text-8xl lg:text-9xl">
            {t.headlineLine1} <br />
            <span className="text-accent">{t.headlineLine2}</span>
          </h2>
        </motion.div>

        <motion.div
          {...cellEntrance(0.1)}
          className="flex flex-wrap justify-center gap-4"
        >
          {socials.map((social) => (
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
      </div>
    </section>
  );
}
