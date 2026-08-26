import type { Localized } from "../cms";
import type { Project } from "../projects";

/** Comando de instalación que se muestra resaltado en la tarjeta. */
const SPACEHOLE_CLI = `# VS Code
ext install mrsandv.spacehole-theme

# Terminal (iTerm2, Ghostty, Alacritty…)
git clone https://github.com/mrsandv/spacehole-theme
cd spacehole-theme && npm run build`;

const SPACEHOLE_TAGS = ["Design System", "WCAG AA", "base16", "Node", "VS Code"];

const PROJECTS_ES: Project[] = [
  {
    id: "spacehole-theme",
    kind: "open",
    title: "Spacehole",
    description:
      "Una familia de themes en seis flavors — cuatro oscuros y dos claros — generada desde un solo archivo de tokens. Un comando produce los ports de VS Code, base16, iTerm2, Ghostty, Alacritty, Windows Terminal, el CSS de este sitio y hasta el logo. El CI verifica contraste WCAG AA en cada commit y compara los acentos con ΔE perceptual, no con luminancia. Es el theme que estás viendo ahora mismo.",
    tags: SPACEHOLE_TAGS,
    size: "large",
    status: "En desarrollo",
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
      "A theme family in six flavors — four dark, two light — generated from a single token file. One command produces the ports for VS Code, base16, iTerm2, Ghostty, Alacritty, Windows Terminal, this site's CSS, and even the logo. CI verifies WCAG AA contrast on every commit and compares accents with perceptual ΔE, not luminance. It's the theme you're looking at right now.",
    tags: SPACEHOLE_TAGS,
    size: "large",
    status: "In progress",
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
