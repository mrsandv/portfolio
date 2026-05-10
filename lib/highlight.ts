import { createHighlighter, type Highlighter } from "shiki";
import { PROJECTS, type Project } from "@/lib/projects";

const SUPPORTED_LANGS = ["go", "typescript", "javascript", "rust", "python", "bash", "shell"] as const;
const THEME = "github-dark-dimmed";

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME],
      langs: [...SUPPORTED_LANGS],
    });
  }
  return highlighterPromise;
}

export async function highlight(code: string, lang: string): Promise<string> {
  const highlighter = await getHighlighter();
  const normalizedLang = SUPPORTED_LANGS.includes(lang as (typeof SUPPORTED_LANGS)[number])
    ? lang
    : "bash";
  return highlighter.codeToHtml(code, { lang: normalizedLang, theme: THEME });
}

export type HighlightedProject =
  | (Extract<Project, { kind: "snippet" }> & { codeHtml: string })
  | (Extract<Project, { kind: "open" }> & { cliHtml?: string })
  | Extract<Project, { kind: "client" }>;

export async function getHighlightedProjects(): Promise<HighlightedProject[]> {
  return Promise.all(
    PROJECTS.map(async (project): Promise<HighlightedProject> => {
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
}
