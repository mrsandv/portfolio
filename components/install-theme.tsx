"use client";

import { Check, Copy, Download } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeSelector } from "@/components/theme-selector";
import { useLanguageStore } from "@/hooks/use-language";
import { FLAVORS, type FlavorSlug } from "@/lib/flavors";
import { translations } from "@/lib/translations";

const REPO = "https://github.com/mrsandv/spacehole-theme";

interface Target {
  id: string;
  label: string;
  /** Comando o ruta, con el slug del flavor activo interpolado. */
  command: (slug: FlavorSlug) => string;
}

const TARGETS: Target[] = [
  {
    id: "vscode",
    label: "VS Code",
    command: () => "ext install mrsandv.spacehole-theme",
  },
  {
    id: "iterm",
    label: "iTerm2",
    command: (slug) => `open "ports/iterm2/Spacehole ${label(slug)}.itermcolors"`,
  },
  {
    id: "ghostty",
    label: "Ghostty",
    command: (slug) => `theme = spacehole-${slug}`,
  },
  {
    id: "alacritty",
    label: "Alacritty",
    command: (slug) => `import = ["~/.config/alacritty/spacehole-${slug}.toml"]`,
  },
];

function label(slug: FlavorSlug) {
  return FLAVORS.find((f) => f.slug === slug)?.name ?? "Hawking";
}

export function InstallTheme({ codeHtml }: { codeHtml: string }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const language = useLanguageStore((s) => s.language);
  const t = translations[language].themes;

  useEffect(() => setMounted(true), []);

  const slug = (mounted ? (theme as FlavorSlug) : undefined) ?? "hawking";

  async function copy(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      // Sin portapapeles (http, permisos): el comando sigue visible para
      // seleccionarlo a mano, así que no hace falta avisar de nada.
    }
  }

  return (
    <section id="theme" className="border-border/60 border-t py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-primary text-xs uppercase tracking-[0.2em]">
            {t.eyebrow}
          </p>
          <h2 className="mb-4 text-balance font-semibold text-3xl leading-tight sm:text-4xl">
            {t.title}
          </h2>
          <p className="text-pretty text-muted-foreground leading-relaxed">{t.description}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Preview: el mismo HTML resaltado en servidor con los seis
              themes; el color lo elige CSS según el flavor activo. */}
          <div className="min-w-0">
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="flex items-center gap-2 border-border border-b bg-card px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
                <span className="h-2.5 w-2.5 rounded-full bg-chart-5" />
                <span className="h-2.5 w-2.5 rounded-full bg-chart-3" />
                <span className="ml-2 font-mono text-muted-foreground text-xs">
                  lib/highlight.ts
                </span>
                <span className="ml-auto font-mono text-[0.65rem] text-muted-foreground uppercase tracking-wider">
                  {mounted ? label(slug) : " "}
                </span>
              </div>
              <div
                className="overflow-x-auto [&_pre]:p-5 [&_pre]:font-mono [&_pre]:text-[0.8125rem] [&_pre]:leading-relaxed"
                // El HTML lo genera shiki en el servidor a partir de código propio.
                dangerouslySetInnerHTML={{ __html: codeHtml }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h3 className="mb-4 font-medium text-sm">{t.pickerTitle}</h3>
              <ThemeSelector />
            </div>

            <div>
              <h3 className="mb-1 font-medium text-sm">{t.installTitle}</h3>
              <p className="mb-4 text-muted-foreground text-xs leading-relaxed">{t.installNote}</p>
              <ul className="flex flex-col gap-2">
                {TARGETS.map((target) => {
                  const command = target.command(slug);
                  const isCopied = copied === target.id;
                  return (
                    <li key={target.id}>
                      <button
                        type="button"
                        onClick={() => copy(target.id, command)}
                        className="group flex w-full items-center gap-3 rounded-lg border border-border px-3 py-2.5 text-left transition-colors hover:border-muted-foreground"
                        aria-label={`${isCopied ? t.copied : t.copy}: ${command}`}
                      >
                        <span className="w-20 shrink-0 font-mono text-[0.7rem] text-muted-foreground uppercase tracking-wider">
                          {target.label}
                        </span>
                        <code className="min-w-0 flex-1 truncate font-mono text-xs">{command}</code>
                        {isCopied ? (
                          <Check className="h-3.5 w-3.5 shrink-0 text-chart-3" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground text-sm transition-opacity hover:opacity-90"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {t.viewSource}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
