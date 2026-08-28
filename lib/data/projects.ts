import type { Localized } from "../cms";
import type { Project } from "../projects";

/** Comando de instalación que se muestra resaltado en la tarjeta. */
const SPACEHOLE_CLI = `# VS Code · Cursor · VSCodium
ext install mrsandv.spacehole-theme

# Terminal (iTerm2, Ghostty, Alacritty, Windows Terminal)
git clone https://github.com/mrsandv/spacehole-theme
cd spacehole-theme && npm run build`;

const SPACEHOLE_TAGS = ["Design System", "WCAG AA", "base16", "VS Code", "Open VSX"];

const PROJECTS_ES: Project[] = [
  {
    id: "spacehole-theme",
    kind: "open",
    title: "Spacehole",
    description:
      "Una familia de themes en seis flavors — cuatro oscuros y dos claros — generada desde un solo archivo de tokens. Un comando produce los ports de VS Code, base16, iTerm2, Ghostty, Alacritty, Windows Terminal y el CSS de este sitio. El CI verifica contraste WCAG AA en cada commit y compara los acentos con ΔE perceptual, no con luminancia: dos colores pueden tener la misma luminancia y ser obviamente distintos. Publicado en el Marketplace de VS Code y en Open VSX. Es el theme que estás viendo ahora mismo.",
    tags: SPACEHOLE_TAGS,
    size: "large",
    status: "Publicado",
    repoUrl: "https://github.com/mrsandv/spacehole-theme",
    // Sin demoUrl a propósito: la tarjeta lo abriría con target="_blank" y un
    // ancla en pestaña nueva no lleva a ningún lado. Además `demoUrl` apaga el
    // botón de instalación, que es justo lo que vale la pena mostrar aquí.
    cli: SPACEHOLE_CLI,
  },
];

const PROJECTS_EN: Project[] = [
  {
    id: "spacehole-theme",
    kind: "open",
    title: "Spacehole",
    description:
      "A theme family in six flavors — four dark, two light — generated from a single token file. One command produces the ports for VS Code, base16, iTerm2, Ghostty, Alacritty, Windows Terminal, and this site's CSS. CI verifies WCAG AA contrast on every commit and compares accents with perceptual ΔE rather than luminance: two colors can share a luminance and still be obviously different. Published on the VS Code Marketplace and Open VSX. It's the theme you're looking at right now.",
    tags: SPACEHOLE_TAGS,
    size: "large",
    status: "Published",
    repoUrl: "https://github.com/mrsandv/spacehole-theme",
    // Sin demoUrl a propósito: la tarjeta lo abriría con target="_blank" y un
    // ancla en pestaña nueva no lleva a ningún lado. Además `demoUrl` apaga el
    // botón de instalación, que es justo lo que vale la pena mostrar aquí.
    cli: SPACEHOLE_CLI,
  },
];

export const PROJECTS_DATA: Localized<Project[]> = {
  es: PROJECTS_ES,
  en: PROJECTS_EN,
};
