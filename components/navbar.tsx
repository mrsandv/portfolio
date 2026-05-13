"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Menu, X, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguageStore } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  linkedin: Linkedin,
  github: Github,
  twitter: X,
  instagram: Instagram,
};

export function Navbar({ staticLinks = {} }: { staticLinks?: Record<string, string> }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language } = useLanguageStore();
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
        <nav className="relative flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 group"
          >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-black text-xl transition-transform group-hover:rotate-12">
              M
            </div>
            <span className="hidden font-mono text-sm font-bold uppercase tracking-tighter sm:block text-foreground">
              Marco Sandoval
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-border/40 bg-background/60 p-1 backdrop-blur-md md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="rounded-full px-5 py-2 text-xs font-bold text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t.hire}
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden items-center gap-1 border-r border-border pr-4 md:flex">
              {Object.entries(staticLinks).map(([platform, url]) => {
                const Icon = SOCIAL_ICONS[platform];
                if (!Icon) return null;
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full bg-secondary p-2 text-foreground md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
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
                  const Icon = SOCIAL_ICONS[platform];
                  if (!Icon) return null;
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
