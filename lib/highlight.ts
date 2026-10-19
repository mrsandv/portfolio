import { cache } from "react";
import { createHighlighter, type Highlighter, type ThemeRegistration } from "shiki";
import { FLAVORS } from "@/lib/flavors";
import { PROJECTS, type Project } from "@/lib/projects";
import type { Localized } from "@/lib/types";
import backgroundRadiation from "@/themes/spacehole-background-radiation-color-theme.json";
import deepVoid from "@/themes/spacehole-deep-void-color-theme.json";
import eventHorizon from "@/themes/spacehole-event-horizon-color-theme.json";
import hawking from "@/themes/spacehole-hawking-color-theme.json";
import photonSphere from "@/themes/spacehole-photon-sphere-color-theme.json";
import whiteDwarf from "@/themes/spacehole-white-dwarf-color-theme.json";

const SUPPORTED_LANGS = [
  "go",
  "typescript",
  "javascript",
  "rust",
  "python",
  "bash",
  "shell",
] as const;

/**
 * The themes come from the same JSON that ships to the Marketplace, so the
 * code on the site looks exactly like it will in the editor of whoever
 * installs it. A single source of truth.
 *
 * They're imported statically, not with an interpolated `import()`: a dynamic
 * import with a variable forces the bundler to include the whole directory
 * and fails in Turbopack.
 */
const THEMES = [
  hawking,
  eventHorizon,
  deepVoid,
  backgroundRadiation,
  photonSphere,
  whiteDwarf,
] as unknown as ThemeRegistration[];

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: THEMES,
      langs: [...SUPPORTED_LANGS],
    });
  }
  return highlighterPromise;
}

/** Map of slug → theme name, which is how shiki names the variables. */
function themeMap() {
  return Object.fromEntries(FLAVORS.map((f) => [f.slug, `Spacehole ${f.name}`]));
}

export async function highlight(code: string, lang: string): Promise<string> {
  const highlighter = await getHighlighter();
  const normalizedLang = SUPPORTED_LANGS.includes(lang as (typeof SUPPORTED_LANGS)[number])
    ? lang
    : "bash";

  // `defaultColor: false` emits one CSS variable per flavor instead of a
  // fixed color; spacehole.css enables the active flavor's. Switching themes
  // on the client doesn't re-highlight anything.
  return highlighter.codeToHtml(code, {
    lang: normalizedLang,
    themes: themeMap(),
    defaultColor: false,
    cssVariablePrefix: "--sh-shiki-",
  });
}

export type HighlightedProject =
  | (Extract<Project, { kind: "snippet" }> & { codeHtml: string })
  | (Extract<Project, { kind: "open" }> & { cliHtml?: string })
  | Extract<Project, { kind: "client" }>;

export const getHighlightedProjects = cache(async (): Promise<Localized<HighlightedProject[]>> => {
  // Each language has its own text, so each one is highlighted separately.
  const entries = await Promise.all(
    (["es", "en"] as const).map(async (locale) => {
      const list = PROJECTS[locale] ?? [];
      const highlighted = await Promise.all(
        list.map(async (project): Promise<HighlightedProject> => {
          if (project.kind === "snippet") {
            const codeHtml = await highlight(project.code, project.language);
            return { ...project, codeHtml };
          }
          if (project.kind === "open" && project.cli) {
            const cliHtml = await highlight(project.cli, "bash");
            return { ...project, cliHtml };
          }
          return project;
        }),
      );
      return [locale, highlighted] as const;
    }),
  );

  return Object.fromEntries(entries) as Localized<HighlightedProject[]>;
});
