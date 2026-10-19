/**
 * Umami events. Link clicks are tracked with `data-umami-event` attributes
 * on the element itself; this is for anything that isn't a plain click
 * (form submission, theme change).
 *
 * If the script didn't load (blocked, no website id, in development), it's a no-op.
 */
type EventData = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void };
  }
}

export function track(event: string, data?: EventData) {
  window.umami?.track(event, data);
}
