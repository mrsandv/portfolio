"use client";

import { motion } from "motion/react";
import { ArrowRight, Github, Linkedin, Mail, Calendar } from "lucide-react";

const cellEntrance = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const socials = [
  { label: "Email", href: "mailto:hello@mrsan.dev", icon: Mail, color: "hover:text-primary" },
  { label: "LinkedIn", href: "https://linkedin.com/in/mrsan/?locale=en-US", icon: Linkedin, color: "hover:text-blue-500" },
  { label: "GitHub", href: "https://github.com/mrsandv", icon: Github, color: "hover:text-foreground" },
  { label: "Cal", href: "https://cal.com", icon: Calendar, color: "hover:text-orange-500" },
];

export function AboutFinalCTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl space-y-24">
        {/* Section 6: About */}
        <div id="about" className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <motion.div {...cellEntrance(0)} className="space-y-6">
            <h2 className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              [ 34 ] About
            </h2>
            <p className="text-pretty text-2xl font-bold leading-tight text-foreground md:text-3xl">
              I believe software should be invisible. It should just work, 
              solving real problems without getting in the way.
            </p>
          </motion.div>
          
          <motion.div {...cellEntrance(0.1)} className="space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Software engineer with 7+ years of experience shipping production code. 
              I specialize in full-stack development with a strong bias for Go, 
              React, and cloud-native architectures.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              When I'm not coding, I'm probably exploring new music, 
              thinking about the next thing to build, or contributing 
              to local projects in Mexico.
            </p>
          </motion.div>
        </div>

        {/* Section 7: Final CTA */}
        <div className="space-y-12 text-center">
          <motion.div {...cellEntrance(0.2)}>
            <h2 className="text-balance text-5xl font-black leading-none tracking-tighter text-foreground md:text-8xl lg:text-9xl">
              LET'S BUILD <br />
              <span className="text-accent">SOMETHING.</span>
            </h2>
          </motion.div>

          <motion.div 
            {...cellEntrance(0.3)}
            className="flex flex-wrap justify-center gap-4"
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 rounded-2xl border border-border bg-card px-8 py-4 text-lg font-bold transition-all hover:border-primary/40 shadow-sm ${social.color}`}
              >
                <social.icon className="h-6 w-6" />
                <span>{social.label}</span>
                <ArrowRight className="h-4 w-4 -rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
