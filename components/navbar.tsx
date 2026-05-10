"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LanguageToggle } from "./language-toggle";

import { useLanguageStore } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

export function Navbar({
  staticLinks,
}: {
  staticLinks: Record<string, string>;
}) {
  const { language } = useLanguageStore();
  const t = translations[language].nav;
  const common = translations[language].common;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const isDark = mounted && theme === "dark";

  const navLinks = [
    { label: t.works, href: "#work" },
    { label: t.contact, href: "#contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6">
      <nav className="w-full max-w-7xl rounded-2xl border border-border bg-card/80 p-2 shadow-sm backdrop-blur-md md:p-3">
        <div className="flex items-center justify-between px-2 md:px-4">
          <a href="/" className="group flex items-center gap-3 text-foreground">
            <div className="flex h-12 w-12 items-center justify-center transition-transform group-hover:scale-110 md:h-14 md:w-14">
              <Image
                width={56}
                height={56}
                src="/logo.webp"
                alt="Spacehole tech logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-mono text-sm font-black tracking-tighter md:text-base">
                spacehole.tech
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground md:text-[10px]">
                  {common.systemActive} · v0.1.0
                </span>
              </div>
            </div>
          </a>

          <div className="flex items-center gap-1.5 md:gap-3">
            <div className="hidden items-center gap-1 rounded-full border border-border bg-secondary/30 p-1 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-all hover:bg-card hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <LanguageToggle />
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground transition hover:bg-secondary md:h-10 md:w-10"
              >
                {mounted ? (
                  isDark ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )
                ) : (
                  <div className="h-4 w-4" />
                )}
              </button>

              <a
                href="#contact"
                className="hidden rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-accent-foreground transition hover:bg-accent/90 md:inline-block"
              >
                {t.hire}
              </a>

              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground md:hidden"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden border-t border-border px-2 pt-2 md:hidden"
          >
            <div className="flex flex-col gap-1 pb-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 block rounded-lg bg-accent px-4 py-3 text-center text-sm font-bold text-accent-foreground transition hover:bg-accent/90"
              >
                {t.hire}
              </a>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
