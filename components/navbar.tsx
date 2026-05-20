"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SITE_NAME } from "@/lib/constants";
import { SOCIAL_META } from "@/lib/social-links";
import { translations } from "@/lib/translations";
import type { SiteSettings } from "@/lib/cms";

export function Navbar({
  staticLinks = {},
  settings,
}: {
  staticLinks?: Record<string, string>;
  settings?: SiteSettings | null;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations.nav;

  const siteName = settings?.siteName || SITE_NAME;

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
