"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguageStore } from "@/hooks/use-language";
import type { Localized, SiteSettings } from "@/lib/cms";
import { SOCIAL_META } from "@/lib/social-links";
import { translations } from "@/lib/translations";

export function Navbar({
  staticLinks = {},
}: {
  staticLinks?: Record<string, string>;
  settings?: Localized<SiteSettings | null>;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const language = useLanguageStore((s) => s.language);
  const t = translations[language].nav;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.works, href: "#work" },
    { name: t.contact, href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <nav className="flex items-center justify-between gap-4 rounded-full border border-border/40 bg-background/60 p-2 px-4 backdrop-blur-md md:px-5">
          {/* Left side: Navigation links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="rounded-full px-4 py-2 text-xs font-bold text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-1 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t.hire}
            </a>
          </div>

          {/* Left side mobile fallback */}
          <div className="flex items-center md:hidden">
            <a
              href="#contact"
              className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground"
            >
              {t.hire}
            </a>
          </div>

          {/* Right side: Social links & Language toggle */}
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
                    aria-label={meta.label}
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
              aria-label="Toggle menu"
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
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold text-foreground"
                >
                  {link.name}
                </a>
              ))}
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
