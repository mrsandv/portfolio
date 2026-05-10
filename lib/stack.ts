import { siGo, siReact, siNextdotjs, siPostgresql, siDocker } from "simple-icons";

const AWS_SVG = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>AWS</title><text x="12" y="14" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif" font-size="9" font-weight="900" fill="currentColor">aws</text><path d="M3 19c2.5 2 6 2.5 9 2.5s6.5-.5 9-2.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"/></svg>`;

export type StackItem = {
  name: string;
  svg: string;
  hex: string;
};

export const STACK: StackItem[] = [
  { name: "Go", svg: siGo.svg, hex: siGo.hex },
  { name: "React", svg: siReact.svg, hex: siReact.hex },
  { name: "Next.js", svg: siNextdotjs.svg, hex: siNextdotjs.hex },
  { name: "Postgres", svg: siPostgresql.svg, hex: siPostgresql.hex },
  { name: "AWS", svg: AWS_SVG, hex: "FF9900" },
  { name: "Docker", svg: siDocker.svg, hex: siDocker.hex },
];
