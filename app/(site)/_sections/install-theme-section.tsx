import { InstallTheme } from "@/components/install-theme";
import { highlight } from "@/lib/highlight";

/**
 * El snippet es el propio highlighter del sitio: quien lo lee está viendo
 * el código que produce lo que está viendo.
 */
const SNIPPET = `import { createHighlighter } from "shiki";
import hawking from "@/themes/spacehole-hawking-color-theme.json";

// El mismo JSON que se publica en el Marketplace.
const highlighter = await createHighlighter({
  themes: [hawking, eventHorizon, deepVoid],
  langs: ["typescript", "go", "rust"],
});

export async function highlight(code: string, lang: string) {
  return highlighter.codeToHtml(code, {
    lang,
    themes: themeMap(),
    defaultColor: false,
  });
}`;

export async function InstallThemeSection() {
  const codeHtml = await highlight(SNIPPET, "typescript");
  return <InstallTheme codeHtml={codeHtml} />;
}
