"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Globe, Layers, Terminal, Filter, Lock, Github } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { useLanguageStore } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import type { HighlightedProject } from "@/lib/highlight";
import type { ProjectKind } from "@/lib/projects";
import type { SiteSettings } from "@/lib/cms";

const cellEntrance = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const projectVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.3, ease: "easeOut" as const },
};

const KIND_FILTERS: ("all" | ProjectKind)[] = ["all", "snippet", "client", "open"];

export function BentoPortfolio({
  projects,
  settings,
}: {
  projects: HighlightedProject[];
  settings?: SiteSettings | null;
}) {
  const { language } = useLanguageStore();
  const t = translations[language].portfolio;
  const common = translations[language].common;
  const [activeKind, setActiveKind] = useState<"all" | ProjectKind>("all");

  const sectionTitle = settings?.portfolioTitle || t.title;
  const sectionDescription = settings?.portfolioDescription || t.description;

  const filteredProjects = projects.filter(
    (p) => activeKind === "all" || p.kind === activeKind,
  );

  return (
    <section id="work" className="px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <motion.div
            {...cellEntrance(0)}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-8 shadow-sm md:col-span-4"
          >
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight text-foreground">
                {sectionTitle}
              </h2>
              <p className="text-muted-foreground">{sectionDescription}</p>
            </div>
          </motion.div>

          <motion.div
            {...cellEntrance(0.05)}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm md:col-span-4"
          >
            <FilterRow
              icon={<Filter className="h-3 w-3" />}
              label={t.filterByKind}
              options={KIND_FILTERS}
              active={activeKind}
              onSelect={setActiveKind}
              renderLabel={(kind) => t.kinds[kind as keyof typeof t.kinds]}
            />
          </motion.div>

          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => {
                const baseDelay = 0.1 + index * 0.05;
                const isLarge = project.size === "large";
                const isMedium = project.size === "medium";

                return (
                  <motion.div
                    key={project.id}
                    layout
                    {...projectVariants}
                    transition={{ ...projectVariants.transition, delay: baseDelay }}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/40 ${
                      isLarge
                        ? "md:col-span-2 md:row-span-2"
                        : isMedium
                          ? "md:col-span-2"
                          : "md:col-span-1"
                    }`}
                  >
                    <ProjectMedia project={project} t={t} />

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="text-xl font-bold text-foreground">
                          {project.title}
                        </h3>
                        <Badge variant="secondary" className="font-mono text-[10px] shrink-0">
                          {project.status}
                        </Badge>
                      </div>
                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>

                      <div className="mb-6 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-secondary/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto">
                        <ProjectActions project={project} t={t} common={common} />
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:col-span-4 flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed border-border"
              >
                <div className="rounded-full bg-secondary p-4 mb-4">
                  <Terminal className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-mono text-sm">
                  {language === "es" ? "No se encontraron registros" : "No records found"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function FilterRow<T extends string>({
  icon,
  label,
  options,
  active,
  onSelect,
  renderLabel,
}: {
  icon: React.ReactNode;
  label: string;
  options: readonly T[];
  active: T;
  onSelect: (value: T) => void;
  renderLabel: (value: T) => string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="mr-1 flex items-center gap-2 px-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
            active === option
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
          }`}
        >
          {renderLabel(option)}
        </button>
      ))}
    </div>
  );
}

function ProjectMedia({
  project,
  t,
}: {
  project: HighlightedProject;
  t: typeof translations.es.portfolio;
}) {
  if (project.kind === "snippet") {
    return (
      <div className="bg-[#22272e] overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-white/50">
          <span>{project.language}</span>
          <span>// snippet</span>
        </div>
        <div
          className="overflow-x-auto p-4 text-[12px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:!p-0"
          dangerouslySetInnerHTML={{ __html: project.codeHtml }}
        />
        {project.output && (
          <div className="border-t border-white/5 bg-black/20 px-4 py-2 font-mono text-[11px] text-emerald-300">
            <span className="text-white/40">▶ {t.labels.output}: </span>
            {project.output}
          </div>
        )}
      </div>
    );
  }

  if (project.kind === "client") {
    return (
      <div className="relative aspect-video w-full bg-secondary">
        <Image
          src={project.screenshot}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-[10px]">
            <Lock className="mr-1 h-3 w-3" />
            {t.labels.privateRepo}
          </Badge>
        </div>
      </div>
    );
  }

  if (project.kind === "open") {
    if (project.screenshot) {
      return (
        <div className="relative aspect-video w-full bg-secondary">
          <Image
            src={project.screenshot}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      );
    }
    if (project.cliHtml) {
      return (
        <div className="bg-[#22272e] overflow-hidden">
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-white/50">
            <Terminal className="h-3 w-3" />
            <span>{t.labels.install}</span>
          </div>
          <div
            className="overflow-x-auto p-4 text-[12px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:!p-0"
            dangerouslySetInnerHTML={{ __html: project.cliHtml }}
          />
        </div>
      );
    }
  }

  return null;
}

function ProjectActions({
  project,
  t,
  common,
}: {
  project: HighlightedProject;
  t: typeof translations.es.portfolio;
  common: typeof translations.es.common;
}) {
  if (project.isComingSoon) {
    return (
      <div className="flex items-center gap-2 text-sm font-bold text-accent">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span>{t.comingSoon}</span>
      </div>
    );
  }

  if (project.kind === "client") {
    return (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-sm font-bold text-accent transition-colors hover:text-accent/80"
      >
        <Globe className="h-4 w-4" />
        <span>{t.labels.viewLive}</span>
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  }

  if (project.kind === "open") {
    return (
      <div className="flex flex-wrap items-center gap-4">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-bold text-accent transition-colors hover:text-accent/80"
          >
            <Globe className="h-4 w-4" />
            <span>{t.labels.viewDemo}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
        >
          <Github className="h-4 w-4" />
          <span>{t.labels.viewRepo}</span>
        </a>
      </div>
    );
  }

  return (
    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
      {common.source}
    </span>
  );
}
