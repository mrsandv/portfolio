/**
 * Spacehole flavor catalog.
 *
 * These colors only paint the picker: the source of truth is `spacehole.css`,
 * generated from palette/tokens.json in the theme repo. If a color changes
 * there, regenerate the CSS and update this list — it's the only deliberate
 * duplication in the system.
 */
export type FlavorSlug =
  | "hawking"
  | "event-horizon"
  | "deep-void"
  | "background-radiation"
  | "photon-sphere"
  | "white-dwarf";

export interface Flavor {
  slug: FlavorSlug;
  name: string;
  appearance: "dark" | "light";
  /** Picker swatches: background, accent and second accent. */
  swatch: [string, string, string];
}

export const FLAVORS: Flavor[] = [
  {
    slug: "hawking",
    name: "Hawking",
    appearance: "dark",
    swatch: ["#000000", "#FF2E97", "#00F0FF"],
  },
  {
    slug: "event-horizon",
    name: "Event Horizon",
    appearance: "dark",
    swatch: ["#0B0E14", "#F2A65A", "#5FD3D8"],
  },
  {
    slug: "deep-void",
    name: "Deep Void",
    appearance: "dark",
    swatch: ["#080A0F", "#7DD3FC", "#A9B6C6"],
  },
  {
    slug: "background-radiation",
    name: "Background Radiation",
    appearance: "dark",
    swatch: ["#14101A", "#E07BAE", "#6FCEDE"],
  },
  {
    slug: "photon-sphere",
    name: "Photon Sphere",
    appearance: "light",
    swatch: ["#DCD7C9", "#7A4E27", "#1F5F66"],
  },
  {
    slug: "white-dwarf",
    name: "White Dwarf",
    appearance: "light",
    swatch: ["#F6F8FB", "#6D28D9", "#0E7C86"],
  },
];

export const FLAVOR_SLUGS = FLAVORS.map((f) => f.slug);
/**
 * Flavor the site opens with. Hawking is the brand face (Marketplace,
 * screenshots), but Background Radiation is easier for reading the whole
 * portfolio: pure neon gets tiring on long pages.
 *
 * Must match `rootFlavor` in palette/tokens.json in the theme repo, which is
 * what gets emitted on :root as the fallback.
 */
export const DEFAULT_FLAVOR: FlavorSlug = "background-radiation";

/**
 * localStorage key where the chosen flavor is stored.
 *
 * Deliberately different from next-themes' default ("theme"): the old
 * light/dark scheme already used that slot, and a stored value always wins
 * over `defaultTheme`. Without changing it, returning visitors were stuck on
 * a theme that no longer exists — and never saw the new default.
 */
export const THEME_STORAGE_KEY = "spacehole-flavor";

/**
 * Order the flavors appear in the picker: the default first.
 *
 * `FLAVORS` keeps the theme's canonical order (the `order` in tokens.json,
 * which reflects the brand hierarchy). This is only the display order, and
 * it's derived from the default instead of written by hand: if DEFAULT_FLAVOR
 * changes, the list rearranges itself.
 */
export const FLAVORS_BY_PREFERENCE: Flavor[] = [
  ...FLAVORS.filter((f) => f.slug === DEFAULT_FLAVOR),
  ...FLAVORS.filter((f) => f.slug !== DEFAULT_FLAVOR),
];
