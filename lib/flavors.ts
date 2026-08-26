/**
 * Catálogo de flavors de Spacehole.
 *
 * Los colores de aquí son solo para pintar el selector: los que mandan son
 * los de `spacehole.css`, generado desde palette/tokens.json en el repo del
 * theme. Si cambia un color allá, hay que regenerar el CSS y actualizar esta
 * lista — es la única duplicación consciente del sistema.
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
  /** Muestras para el selector: fondo, acento y segundo acento. */
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
 * Flavor con el que abre el sitio. Hawking es la cara de marca (Marketplace,
 * screenshots), pero para leer el portfolio entero gana Background Radiation:
 * el neón puro cansa en pantallas largas.
 *
 * Debe coincidir con `rootFlavor` en palette/tokens.json del repo del theme,
 * que es lo que se emite en :root como fallback.
 */
export const DEFAULT_FLAVOR: FlavorSlug = "background-radiation";

/**
 * Clave de localStorage donde se guarda el flavor elegido.
 *
 * Deliberadamente distinta de la que usa next-themes por defecto ("theme"):
 * ese slot ya lo ocupaba el esquema viejo de light/dark, y un valor guardado
 * gana siempre sobre `defaultTheme`. Sin cambiarla, quien hubiera visitado el
 * sitio antes se quedaba anclado a un theme que ya no existe — y el nuevo
 * default no se veía nunca.
 */
export const THEME_STORAGE_KEY = "spacehole-flavor";

/**
 * Orden en que se muestran los flavors en el selector: el default primero.
 *
 * `FLAVORS` conserva el orden canónico del theme (el `order` de tokens.json,
 * que refleja la jerarquía de marca). Este es solo el orden de presentación, y
 * se deriva del default en vez de escribirse a mano: si mañana cambia
 * DEFAULT_FLAVOR, la lista se reacomoda sola.
 */
export const FLAVORS_BY_PREFERENCE: Flavor[] = [
  ...FLAVORS.filter((f) => f.slug === DEFAULT_FLAVOR),
  ...FLAVORS.filter((f) => f.slug !== DEFAULT_FLAVOR),
];
