import type { Localized, MethodologyStep } from "../cms";

const METHODOLOGY_ES: MethodologyStep[] = [
  {
    order: 0,
    title: "Descubrimiento",
    duration: "1 semana",
    description:
      "Sesiones de descubrimiento para entender el problema, mapear restricciones técnicas y de negocio, y definir el alcance. Acordamos métricas de éxito antes de escribir código.",
  },
  {
    order: 1,
    title: "Construcción",
    duration: "2 a 6 semanas",
    description:
      "Desarrollo iterativo con entregas funcionales cada semana. Code review continuo, tests donde aportan valor y documentación de decisiones técnicas relevantes.",
  },
  {
    order: 2,
    title: "Entrega y operación",
    duration: "Continuo",
    description:
      "Lanzamiento a producción, transferencia técnica documentada y ventana de soporte para iterar sobre métricas reales una vez en operación.",
  },
];

const METHODOLOGY_EN: MethodologyStep[] = [
  {
    order: 0,
    title: "Discovery",
    duration: "1 week",
    description:
      "Discovery sessions to understand the problem, map technical and business constraints, and define scope. We agree on success metrics before writing any code.",
  },
  {
    order: 1,
    title: "Build",
    duration: "2 to 6 weeks",
    description:
      "Iterative development with functional deliveries every week. Continuous code review, tests where they add value, and documentation of relevant technical decisions.",
  },
  {
    order: 2,
    title: "Launch & operate",
    duration: "Continuous",
    description:
      "Production launch, documented technical handoff, and a support window to iterate on real metrics once in operation.",
  },
];

export const METHODOLOGY_DATA: Localized<MethodologyStep[]> = {
  es: METHODOLOGY_ES,
  en: METHODOLOGY_EN,
};
