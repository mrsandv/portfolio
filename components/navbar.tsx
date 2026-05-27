"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguageStore } from "@/hooks/use-language";
import type { Localized, SiteSettings } from "@/lib/cms";
import { SITE_NAME } from "@/lib/constants";
import { SOCIAL_META } from "@/lib/social-links";
import { translations } from "@/lib/translations";

export function Navbar({
  staticLinks = {},
  settings,
}: {
  staticLinks?: Record<string, string>;
  settings?: Localized<SiteSettings | null>;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const language = useLanguageStore((s) => s.language);
  const t = translations[language].nav;

  const current = settings?.[language] ?? null;
  const siteName = current?.siteName || SITE_NAME;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.works, href: "#work", id: "work" },
    { name: t.contact, href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const ids = ["work", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.intersectionRatio);
        }
        let topId: string | null = null;
        let topRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > topRatio) {
            topRatio = ratio;
            topId = id;
          }
        }
        setActiveSection(topRatio > 0 ? topId : null);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <nav className="flex items-center justify-between gap-4 rounded-full border border-border/40 bg-background/60 p-1.5 pl-3 backdrop-blur-md md:pl-4">
          <motion.a
            href="/"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex shrink-0 items-center gap-2 group"
          >
            <Image
              src="/logo.webp"
              alt={siteName}
              width={32}
              height={32}
              priority
              className="h-8 w-8 transition-transform group-hover:rotate-12"
            />
            <span className="hidden font-mono text-sm font-bold uppercase tracking-tighter sm:block text-foreground">
              {siteName}
            </span>
          </motion.a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            <div className="hidden items-center gap-1 md:flex">
              {Object.entries(staticLinks).map(([platform, url]) => {
                const meta = SOCIAL_META[platform];
                if (!meta) return null;
                const Icon = meta.icon;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>

            <LanguageToggle />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full bg-secondary p-2 text-foreground md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border bg-background md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-lg font-bold ${
                      isActive ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                {Object.entries(staticLinks).map(([platform, url]) => {
                  const meta = SOCIAL_META[platform];
                  if (!meta) return null;
                  const Icon = meta.icon;
                  return (
                    <a
                      key={platform}
                      href={url}
                      className="text-muted-foreground"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
