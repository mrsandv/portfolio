export type TMenu = {
  id: string;
  text: string;
  path: string;
}

export const menu: Array<TMenu> = [
  { id: "1", text: "Blog", path: "/blog" },
  { id: "2", text: "Projects", path: '/projects' },
  { id: "3", text: "Resume/CV", path: "/resume" },
]

export type TProjects = {
  id?: string
  href: string;
  title: string;
  description: string;
  media: string;
}

export const projects: Array<TProjects> = [
  {
    id: "1",
    title: "Calculadora",
    description: "Web calculator...",
    href: "https:github.com/mrsan/calculator",
    media: "/vercel.svg"
  },
  {
    id: "2",
    title: "Calculadora 2",
    description: "Web calculator 2...",
    href: "https:github.com/mrsan/calculator-2",
    media: "/vercel.svg"
  },
]