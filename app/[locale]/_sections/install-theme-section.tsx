import { InstallTheme } from "@/components/install-theme";
import { highlight } from "@/lib/highlight";

/**
 * The snippet is the site's own highlighter: whoever reads it is looking at
 * the code that renders what they're looking at.
 */
const SNIPPET = `import { createHighlighter } from "shiki";
import hawking from "@/themes/spacehole-hawking-color-theme.json";

// The same JSON that ships to the Marketplace.
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
