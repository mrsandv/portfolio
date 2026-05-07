"use client";

import {
  Terminal,
  Code2,
  Database,
  Cloud,
  Box,
  Search,
  Zap,
  Truck,
  ArrowRight,
  Cpu,
} from "lucide-react";
import { motion } from "motion/react";

const cellEntrance = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const stack = [
  { name: "Go", icon: Terminal, color: "text-sky-500" },
  { name: "React", icon: Code2, color: "text-blue-400" },
  { name: "Next.js", icon: Cpu, color: "text-foreground" },
  { name: "Postgres", icon: Database, color: "text-indigo-400" },
  { name: "AWS", icon: Cloud, color: "text-orange-400" },
  { name: "Docker", icon: Box, color: "text-blue-500" },
];

const steps = [
  {
    id: "29",
    title: "Discovery",
    duration: "1 week",
    description: "Async brief + scope definition. We align on goals and constraints.",
    icon: Search,
  },
  {
    id: "30",
    title: "Build",
    duration: "2-6 weeks",
    description: "Iterative development with weekly Loom updates. No black boxes.",
    icon: Zap,
  },
  {
    id: "31",
    title: "Ship & Iterate",
    duration: "Continuous",
    description: "Weekly demos, handoff documentation, and production launch.",
    icon: Truck,
  },
];

export function StackProcess() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Section 3: Stack */}
        <div id="stack" className="space-y-6">
          <motion.div {...cellEntrance(0)} className="flex items-center gap-3">
            <Terminal className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-black tracking-tight text-foreground">
              Stack en producción
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
            {stack.map((item, index) => (
              <motion.div
                key={item.name}
                {...cellEntrance(0.05 + index * 0.05)}
                className="group flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40"
              >
                <item.icon className={`mb-3 h-8 w-8 transition-transform group-hover:scale-110 ${item.color}`} />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 4: How I Work */}
        <div id="process" className="space-y-6">
          <motion.div {...cellEntrance(0.4)} className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-black tracking-tight text-foreground">
              How I Work
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                {...cellEntrance(0.45 + index * 0.05)}
                className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/40"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {step.duration}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 -right-4 hidden -translate-y-1/2 md:block">
                    <ArrowRight className="h-8 w-8 text-border/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
