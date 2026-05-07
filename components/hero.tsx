"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
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

export function Hero({
  staticLinks,
}: {
  staticLinks: Record<string, string>;
}) {
  return (
    <section className="relative px-6 pt-28 pb-12 md:pt-32">
      <div className="mx-auto grid max-w-7xl auto-rows-[minmax(140px,auto)] grid-cols-1 gap-3 md:grid-cols-4">
        {/* [04] Manifesto */}
        <motion.div
          {...cellEntrance(0)}
          className="rounded-2xl border border-border bg-card p-8 shadow-sm md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-3 md:p-12"
        >
          <h1 className="text-balance text-4xl font-black leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            I build digital products{" "}
            <span className="text-accent">that ship.</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Software engineer. 7+ years shipping production code. Full-stack
            with a bias for clarity over cleverness.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            [ value for biz · simple for users ]
          </p>
        </motion.div>

        {/* [05] Glitch avatar — TODO: foto real */}
        <motion.div
          {...cellEntrance(0.05)}
          className="overflow-hidden rounded-2xl border border-border bg-secondary shadow-sm md:col-start-4 md:row-start-1 md:row-end-5"
        >
          <GlitchAvatar />
        </motion.div>

        {/* [06] Status */}
        <motion.div
          {...cellEntrance(0.1)}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm md:col-start-1 md:row-start-3"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Open to
            </span>
          </div>
          <ul className="space-y-1 text-sm font-semibold text-foreground">
            <li>Full-time roles</li>
            <li>Freelance projects</li>
          </ul>
          <p className="mt-3 font-mono text-[10px] text-muted-foreground">
            [ upd. 2026-05 ]
          </p>
        </motion.div>

        {/* [07] Stack chips */}
        <motion.div
          {...cellEntrance(0.15)}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm md:col-start-2 md:col-end-4 md:row-start-3"
        >
          <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Go",
              "TypeScript",
              "React",
              "Next.js",
              "Node",
              "Postgres",
              "AWS",
              "Docker",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* [08] Featured project */}
        <motion.div
          {...cellEntrance(0.2)}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm md:col-start-1 md:row-start-4"
        >
          <div className="mb-3 flex aspect-video items-center justify-center rounded-lg bg-secondary">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              [ screenshot ]
            </span>
          </div>
          <h3 className="text-lg font-bold text-foreground">Antojo</h3>
          <p className="mb-3 text-sm text-muted-foreground">
            Group decisions, faster.
          </p>
          <div className="flex gap-3 font-mono text-xs text-muted-foreground">
            <span>[ live ]</span>
            <span>[ source ]</span>
          </div>
        </motion.div>

        {/* [10] CTA dual */}
        <motion.div
          {...cellEntrance(0.25)}
          className="flex flex-col justify-center gap-3 rounded-2xl bg-primary p-6 text-primary-foreground shadow-sm md:col-start-2 md:col-end-4 md:row-start-4"
        >
          <motion.a
            href={staticLinks.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            {...ctaInteractions}
            className="group flex items-center justify-between rounded-xl bg-accent px-6 py-4 text-base font-bold text-accent-foreground"
          >
            <span>Hire me · Full-time</span>
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </motion.a>
          <motion.a
            href="#contact"
            {...ctaInteractions}
            className="group flex items-center justify-between rounded-xl border-2 border-primary-foreground/30 px-6 py-4 text-base font-bold text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground/10"
          >
            <span>Hablemos · Proyecto</span>
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </motion.a>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-primary-foreground/70">
            linkedin · email · cal
          </p>
        </motion.div>
      </div>
    </section>
  );
}
