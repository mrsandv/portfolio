import { cache } from "react";
import { createHighlighter, type Highlighter, type ThemeRegistration } from "shiki";
import type { Localized } from "@/lib/cms";
import { FLAVORS } from "@/lib/flavors";
import { PROJECTS, type Project } from "@/lib/projects";
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
 * Los themes salen del mismo JSON que se publica en el Marketplace, así que
 * el código del sitio se ve exactamente como se verá en el editor de quien
 * lo instale. Una sola fuente de verdad.
 *
 * Se importan de forma estática y no con `import()` interpolado: un import
 * dinámico con variable obliga al bundler a incluir el directorio entero y
 * falla en Turbopack.
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

/** Mapa slug → nombre del theme, que es como shiki nombra las variables. */
function themeMap() {
  return Object.fromEntries(FLAVORS.map((f) => [f.slug, `Spacehole ${f.name}`]));
}

export async function highlight(code: string, lang: string): Promise<string> {
  const highlighter = await getHighlighter();
  const normalizedLang = SUPPORTED_LANGS.includes(lang as (typeof SUPPORTED_LANGS)[number])
    ? lang
    : "bash";

  // `defaultColor: false` emite una variable CSS por flavor en vez de un
  // color fijo; spacehole.css activa la del flavor vigente. Cambiar de theme
  // en el cliente no vuelve a resaltar nada.
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
  // Cada idioma tiene su propio texto, así que se resalta por separado.
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
