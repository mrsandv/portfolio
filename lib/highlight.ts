import { cache } from "react";
import { createHighlighter, type Highlighter } from "shiki";
import { logError } from "@/lib/log";
import type { Project } from "@/lib/projects";
import type { Language } from "@/lib/translations";

const SUPPORTED_LANGS = [
  "go",
  "typescript",
  "javascript",
  "rust",
  "python",
  "bash",
  "shell",
] as const;
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

type PayloadProjectDoc = {
  id: string;
  kind: "snippet" | "client" | "open";
  title: string;
  description: string;
  tags?: { tag: string }[];
  size: "small" | "medium" | "large";
  status: string;
  isComingSoon?: boolean;
  language?: string;
  code?: string;
  output?: string;
  screenshot?: { url?: string } | string;
  liveUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
  cli?: string;
};

function mediaUrl(value: PayloadProjectDoc["screenshot"]): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  return value.url;
}

function mapPayloadToProject(doc: PayloadProjectDoc): Project {
  const base = {
    id: doc.id,
    title: doc.title,
    description: doc.description,
    tags: doc.tags?.map((t) => t.tag) ?? [],
    size: doc.size,
    status: doc.status,
    isComingSoon: doc.isComingSoon,
  };

  if (doc.kind === "snippet") {
    return {
      ...base,
      kind: "snippet",
      language: doc.language ?? "bash",
      code: doc.code ?? "",
      output: doc.output,
    };
  }

  if (doc.kind === "client") {
    return {
      ...base,
      kind: "client",
      screenshot: mediaUrl(doc.screenshot) ?? "",
      liveUrl: doc.liveUrl ?? "",
    };
  }

  return {
    ...base,
    kind: "open",
    repoUrl: doc.repoUrl ?? "",
    screenshot: mediaUrl(doc.screenshot),
    demoUrl: doc.demoUrl,
    cli: doc.cli,
  };
}

async function fetchProjectsFromPayload(locale: Language): Promise<Project[] | null> {
  if (!process.env.MONGODB_URI) return null;
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "projects",
      limit: 100,
      depth: 1,
      locale,
    });
    return result.docs.map((doc) => mapPayloadToProject(doc as PayloadProjectDoc));
  } catch (err) {
    logError("highlight", err);
    return null;
  }
}

export const getHighlightedProjects = cache(
  async (locale: Language = "en"): Promise<HighlightedProject[]> => {
    const source = await fetchProjectsFromPayload(locale);

    if (!source || source.length === 0) {
      return [];
    }

    return Promise.all(
      source.map(async (project): Promise<HighlightedProject> => {
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
  },
);
