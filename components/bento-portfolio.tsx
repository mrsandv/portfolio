"use client";

import { useState } from "react";
import { ExternalLink, Globe, Layers, Terminal, Filter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";

const cellEntrance = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const projectVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.3, ease: "easeOut" },
};

const projects = [
  {
    id: "14",
    title: "Antojo",
    description:
      "Say goodbye to group decision fatigue. An app to prioritize restaurants based on your friends' genuine enthusiasm.",
    tags: ["React", "Tailwind", "Go", "Sockets"],
    type: "Web",
    size: "large",
    github: "https://github.com",
    live: "https://antojo.app",
    status: "WIP",
  },
  {
    id: "15",
    title: "Luna de Miel salon SPA",
    description:
      "Kawaii experience at your fingertips. Management system for a local beauty business.",
    tags: ["React", "Tailwind", "MongoDB"],
    type: "Web",
    size: "medium",
    status: "Shipped",
  },
  {
    id: "16",
    title: "Pal' chesco",
    description:
      "A way to contribute to Mexican projects and help each other out among creators.",
    tags: ["Go", "HTMX"],
    type: "Tool",
    size: "small",
    status: "Shipped",
  },
  {
    id: "18",
    title: "Fleet Monitoring",
    description:
      "Internal dashboard for real-time monitoring of distributed IoT devices.",
    tags: ["Rust", "Postgres", "AWS"],
    type: "Web",
    size: "medium",
    status: "Shipped",
  },
];

const filters = ["All", "Web", "Mobile", "Tool"];

export function BentoPortfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projects.filter(
    (p) => activeFilter === "All" || p.type === activeFilter
  );

  const shippedCount = projects.filter((p) => p.status === "Shipped").length;
  const wipCount = projects.filter((p) => p.status === "WIP").length;

  return (
    <section id="work" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          {/* [11] Header */}
          <motion.div
            {...cellEntrance(0)}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-8 shadow-sm md:col-span-3"
          >
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight text-foreground">
                Selected Work
              </h2>
              <p className="text-muted-foreground">
                Projects that went from zero to production.
              </p>
            </div>
          </motion.div>

          {/* [13] Counter */}
          <motion.div
            {...cellEntrance(0.05)}
            className="flex flex-col justify-center rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Metrics
              </span>
              <span className="h-2 w-2 rounded-full bg-accent" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-end justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Shipped
                </span>
                <span className="text-2xl font-black leading-none text-foreground">
                  {shippedCount}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  WIP
                </span>
                <span className="text-2xl font-black leading-none text-foreground">
                  {wipCount}
                </span>
              </div>
            </div>
          </motion.div>

          {/* [12] Filters */}
          <motion.div
            {...cellEntrance(0.1)}
            className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card p-4 shadow-sm md:col-span-4"
          >
            <div className="mr-2 flex items-center gap-2 px-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <Filter className="h-3 w-3" />
              <span>Filter by</span>
            </div>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const baseDelay = 0.15 + index * 0.05;
              const isLarge = project.size === "large";
              const isMedium = project.size === "medium";

              return (
                <motion.div
                  key={project.id}
                  layout
                  {...projectVariants}
                  transition={{
                    ...projectVariants.transition,
                    delay: baseDelay,
                  }}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/40 ${
                    isLarge
                      ? "md:col-span-2 md:row-span-2"
                      : isMedium
                      ? "md:col-span-2"
                      : "md:col-span-1"
                  }`}
                >
                  {/* Project Image Placeholder */}
                  {isLarge && (
                    <div className="relative aspect-video w-full bg-secondary md:aspect-auto md:grow">
                      <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <Terminal className="h-20 w-20" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant="secondary"
                          className="bg-background/80 backdrop-blur-sm"
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="text-xl font-bold text-foreground">
                        {project.title}
                      </h3>
                      {!isLarge && (
                        <Badge variant="secondary" className="font-mono text-[10px]">
                          {project.status}
                        </Badge>
                      )}
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

                    <div className="mt-auto flex items-center gap-4">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm font-bold text-accent transition-colors hover:text-accent/80"
                        >
                          <Globe className="h-4 w-4" />
                          <span>Live</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Terminal className="h-4 w-4" />
                          <span>Source</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
