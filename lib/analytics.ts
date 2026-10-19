/**
 * Eventos de Umami. Los clics en enlaces se registran con atributos
 * `data-umami-event` en el propio elemento; esto es para lo que no es un
 * clic simple (envío del formulario, cambio de theme).
 *
 * Si el script no cargó (bloqueado, sin website id, en desarrollo), no hace nada.
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
