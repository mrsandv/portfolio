import {
  siGo,
  siRust,
  siPython,
  siReact,
  siNextdotjs,
  siJavascript,
  siTypescript,
  siNodedotjs,
  siExpress,
  siGin,
  siMongodb,
  siPostgresql,
  siSupabase,
  siVercel,
  siRedis,
} from "simple-icons";
import { STACK_EXTRAS } from "./stack-extras";

type SimpleIcon = { hex: string; path: string };

const SIMPLE_ICONS: Record<string, SimpleIcon> = {
  go: siGo,
  rust: siRust,
  python: siPython,
  react: siReact,
  nextjs: siNextdotjs,
  javascript: siJavascript,
  typescript: siTypescript,
  nodejs: siNodedotjs,
  express: siExpress,
  gin: siGin,
  mongodb: siMongodb,
  postgresql: siPostgresql,
  supabase: siSupabase,
  vercel: siVercel,
  redis: siRedis,
};

export type StackItem = {
  name: string;
  slug: string;
  order?: number;
};

export type ResolvedStackIcon = {
  hex: string;
  svg: string;
};

export function resolveStackIcon(slug: string): ResolvedStackIcon | null {
  const lib = SIMPLE_ICONS[slug];
  if (lib) {
    return {
      hex: lib.hex,
      svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="${lib.path}"/></svg>`,
    };
  }
  const extra = STACK_EXTRAS[slug];
  if (extra) return extra;
  return null;
}

export const STACK: StackItem[] = [];
