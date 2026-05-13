"use client";

import { ArrowRight, FileText, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { GlitchAvatar } from "@/components/glitch-avatar";
import { useLanguageStore } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import type { SiteSettings } from "@/lib/cms";

const cellEntrance = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export function Hero({ settings }: { settings: SiteSettings | null }) {
  const { language } = useLanguageStore();
  const t = translations[language].hero;

  const title = settings?.heroTitle || t.title;
  const titleAccent = settings?.heroTitleAccent || t.titleAccent;
  const description = settings?.heroDescription || t.description;
  const tagline = settings?.heroTagline || t.tagline;
  const availability = settings?.availability?.map(a => a.role) || t.statusRoles;

  // Handle multiple resumes
  const resumes = settings?.resumes?.map(r => ({
    label: r.label,
    url: typeof r.file === 'object' ? r.file.url : r.file
  })) || [{ label: t.cvLabel, url: "/cv.pdf" }];

  // Profile Picture and Link
  const profileImg = typeof settings?.profilePicture === 'object' ? settings.profilePicture.url : (settings?.profilePicture || "/hero-photo.jpg");
  const profileLink = settings?.profileLink;

  return (
    <section className="relative px-6 pt-28 pb-12 md:pt-32">
      <div className="mx-auto grid max-w-7xl auto-rows-[minmax(140px,auto)] grid-cols-1 gap-3 md:grid-cols-4">
        <motion.div
          {...cellEntrance(0)}
          className="rounded-2xl border border-border bg-card p-8 shadow-sm md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-2 md:p-12"
        >
          <h1 className="text-balance text-4xl font-black leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {title}{" "}
            <span className="text-accent">{titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {tagline}
          </p>
        </motion.div>

        <motion.div
          {...cellEntrance(0.05)}
          className="group/avatar relative overflow-hidden rounded-2xl border border-border bg-secondary shadow-sm md:col-start-4 md:row-start-1 md:row-end-3"
        >
          {profileLink ? (
            <a href={profileLink} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
              <GlitchAvatar src={profileImg} />
              <div className="absolute bottom-4 right-4 z-10 rounded-full bg-background/80 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover/avatar:opacity-100">
                <ExternalLink className="h-4 w-4 text-primary" />
              </div>
            </a>
          ) : (
            <GlitchAvatar src={profileImg} />
          )}
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
            {availability.map((role) => (
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

        {/* Dynamic Resumes Cell */}
        <motion.div
          {...cellEntrance(0.2)}
          className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm md:col-start-3 md:row-start-2"
        >
          {resumes.map((resume, idx) => (
            <motion.a
              key={idx}
              href={resume.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 2 }}
              className="flex w-full items-center gap-3 rounded-xl bg-secondary/50 p-2.5 transition-colors hover:bg-secondary"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background text-accent shadow-sm">
                <FileText className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-bold leading-tight text-foreground uppercase tracking-tight">
                  {idx === 0 && resumes.length > 1 ? t.ctaCV : (resumes.length === 1 ? t.ctaCV : "Resume")}
                </p>
                <p className="font-mono text-[9px] font-medium text-muted-foreground">
                  {resume.label}
                </p>
              </div>
            </motion.a>
          ))}
          {resumes.length === 1 && (
             <div className="w-full py-4 text-center border-t border-border/10 mt-1">
                <p className="font-mono text-[7px] uppercase tracking-widest text-muted-foreground/40">
                   Single Version Active
                </p>
             </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
