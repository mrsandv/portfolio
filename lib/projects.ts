export type ProjectKind = "snippet" | "client" | "open";

type ProjectBase = {
  id: string;
  kind: ProjectKind;
  title: string;
  description: string;
  tags: string[];
  size: "small" | "medium" | "large";
  status: string;
  isComingSoon?: boolean;
};

export type SnippetProject = ProjectBase & {
  kind: "snippet";
  language: string;
  code: string;
  output?: string;
};

export type ClientProject = ProjectBase & {
  kind: "client";
  screenshot: string;
  liveUrl: string;
};

export type OpenProject = ProjectBase & {
  kind: "open";
  repoUrl: string;
  screenshot?: string;
  demoUrl?: string;
  cli?: string;
};

export type Project = SnippetProject | ClientProject | OpenProject;

export const PROJECTS: Project[] = [
  {
    kind: "snippet",
    id: "binary-search-go",
    title: "Búsqueda binaria",
    description:
      "Implementación iterativa del clásico algoritmo de búsqueda binaria sobre slices ordenados.",
    language: "go",
    code: `func bsearch(arr []int, target int) int {
    lo, hi := 0, len(arr)-1
    for lo <= hi {
        mid := (lo + hi) / 2
        switch {
        case arr[mid] == target:
            return mid
        case arr[mid] < target:
            lo = mid + 1
        default:
            hi = mid - 1
        }
    }
    return -1
}`,
    output: "bsearch([]int{1, 3, 5, 7, 9, 11}, 7) → 3",
    tags: ["Go", "Algorithms"],
    size: "medium",
    status: "Demo",
  },
  {
    kind: "client",
    id: "acme-dashboard",
    title: "Acme Dashboard",
    description:
      "Plataforma interna de gestión y métricas en tiempo real para equipos de operaciones distribuidos.",
    screenshot: "/projects/placeholder-client.svg",
    liveUrl: "https://example.com",
    tags: ["React", "Next.js", "Postgres", "AWS"],
    size: "large",
    status: "Shipped",
  },
  {
    kind: "open",
    id: "antojo",
    title: "Antojo",
    description:
      "App para decisiones grupales basadas en entusiasmo genuino. Adiós a la fatiga de elegir restaurante.",
    repoUrl: "https://github.com/mrsan/antojo",
    demoUrl: "https://antojo.app",
    cli: `# Instalación
go install github.com/mrsan/antojo@latest

# Levantar el servidor
antojo serve --port 8080`,
    tags: ["Go", "React", "Sockets"],
    size: "medium",
    status: "WIP",
  },
];
