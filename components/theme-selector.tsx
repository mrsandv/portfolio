"use client";

import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLanguageStore } from "@/hooks/use-language";
import { track } from "@/lib/analytics";
import { FLAVORS_BY_PREFERENCE, type FlavorSlug } from "@/lib/flavors";
import { translations } from "@/lib/translations";

/**
 * Flavor picker.
 *
 * `variant="grid"` is the section version: cards with name and appearance.
 * `variant="compact"` is the navbar version: color swatches only.
 */
export function ThemeSelector({ variant = "grid" }: { variant?: "grid" | "compact" }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const language = useLanguageStore((s) => s.language);
  const t = translations[language].themes;

  // The theme lives in localStorage: until the client mounts we don't know
  // which one is active, and painting the wrong one causes a visible jump.
  useEffect(() => setMounted(true), []);

  const active = mounted ? (theme as FlavorSlug) : undefined;

  const select = (slug: FlavorSlug) => {
    if (slug === active) return;
    setTheme(slug);
    track("theme-change", { flavor: slug, location: variant });
  };

  if (variant === "compact") {
    return (
      <fieldset className="flex items-center gap-1 border-0 p-0" aria-label={t.label}>
        {FLAVORS_BY_PREFERENCE.map((flavor) => {
          const isActive = active === flavor.slug;
          return (
            <button
              key={flavor.slug}
              type="button"
              onClick={() => select(flavor.slug)}
              aria-label={flavor.name}
              aria-pressed={isActive}
              title={flavor.name}
              className={`h-5 w-5 rounded-full border transition-all ${
                isActive
                  ? "scale-110 border-primary"
                  : "border-border/60 hover:scale-105 hover:border-border"
              }`}
              style={{
                background: `linear-gradient(135deg, ${flavor.swatch[1]} 0%, ${flavor.swatch[1]} 48%, ${flavor.swatch[0]} 50%, ${flavor.swatch[0]} 100%)`,
              }}
            />
          );
        })}
      </fieldset>
    );
  }

  return (
    <fieldset className="grid grid-cols-2 gap-3 border-0 p-0 sm:grid-cols-3" aria-label={t.label}>
      {FLAVORS_BY_PREFERENCE.map((flavor) => {
        const isActive = active === flavor.slug;
        return (
          <button
            key={flavor.slug}
            type="button"
            onClick={() => select(flavor.slug)}
            aria-pressed={isActive}
            className={`group relative flex flex-col gap-3 rounded-xl border p-4 text-left transition-all ${
              isActive
                ? "border-primary ring-1 ring-primary"
                : "border-border hover:border-muted-foreground"
            }`}
          >
            <span className="flex items-center gap-1.5">
              {flavor.swatch.map((color, i) => (
                <span
                  key={color}
                  className="h-6 w-6 rounded-full border border-black/10"
                  style={{
                    background: color,
                    marginLeft: i === 0 ? 0 : "-0.65rem",
                  }}
                />
              ))}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-medium text-sm leading-tight">{flavor.name}</span>
              <span className="font-mono text-[0.65rem] text-muted-foreground uppercase tracking-wider">
                {flavor.appearance === "dark" ? t.dark : t.light}
              </span>
            </span>
            {isActive && (
              <Check className="absolute top-3 right-3 h-4 w-4 text-primary" aria-hidden="true" />
            )}
          </button>
        );
      })}
    </fieldset>
  );
}
