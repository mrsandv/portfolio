"use client";

import { Terminal, Zap } from "lucide-react";
import { motion } from "motion/react";
import type { StackItem } from "@/lib/stack";
import type { MethodologyStep, SiteSettings } from "@/lib/cms";
import { useLanguageStore } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

const cellEntrance = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

function Stack({ items, title }: { items: StackItem[]; title?: string }) {
  const { language } = useLanguageStore();
  const t = translations[language].stack;
  return (
    <div id="stack" className="space-y-6">
      <motion.div {...cellEntrance(0)} className="flex items-center gap-3">
        <Terminal className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-black tracking-tight text-foreground">
          {title || t.title}
        </h2>
      </motion.div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          {items.map((item, index) => (
            <motion.div
              key={item.name}
              {...cellEntrance(0.05 + index * 0.05)}
              className="group flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40"
            >
              <div
                style={{ color: `#${item.hex}` }}
                className="mb-3 h-8 w-8 transition-transform group-hover:scale-110 [&_svg]:h-full [&_svg]:w-full [&_path]:fill-current [&_text]:fill-current"
                dangerouslySetInnerHTML={{ __html: item.svg }}
              />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border py-12 flex flex-col items-center justify-center bg-card/50">
           <p className="text-muted-foreground font-mono text-sm italic">
            {language === "es" ? "// No hay tecnologías registradas" : "// No technologies registered"}
          </p>
        </div>
      )}
    </div>
  );
}

function Process({ steps, title }: { steps: MethodologyStep[]; title?: string }) {
  const { language } = useLanguageStore();
  const t = translations[language].process;

  // Fallback to translations if no steps in CMS
  const displaySteps = steps.length > 0
    ? steps
    : Object.entries(translations[language].process.steps).map(([key, value]) => ({
        title: value.title,
        duration: value.duration,
        description: value.description,
        order: 0
      }));

  return (
    <div id="process" className="space-y-6">
      <motion.div {...cellEntrance(0.4)} className="flex items-center gap-3">
        <Zap className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-black tracking-tight text-foreground">
          {title || t.title}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {displaySteps.map((step, index) => {
          return (
            <motion.div
              key={index}
              {...cellEntrance(0.45 + index * 0.05)}
              className="rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/40"
            >
              <div className="mb-6 font-mono text-5xl font-black leading-none text-accent/60">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {step.duration}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function StackProcess({
  stack = [],
  methodology = [],
  settings,
}: {
  stack?: StackItem[];
  methodology?: MethodologyStep[];
  settings?: SiteSettings | null;
}) {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl space-y-12">
        <Stack items={stack} title={settings?.stackTitle} />
        <Process steps={methodology} title={settings?.processTitle} />
      </div>
    </section>
  );
}
