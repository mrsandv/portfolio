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

export const PROJECTS: Project[] = [];
