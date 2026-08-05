import type { Localized } from "../cms";
import type { FAQItem } from "../faq";

const FAQ_ES: FAQItem[] = [
  {
    order: 0,
    question: "¿Cuál es tu disponibilidad actual?",
    answer:
      "La agenda suele estar comprometida con 2 a 4 semanas de anticipación. Para consultorías puntuales o intervenciones acotadas existe margen de respuesta más ágil. La vía formal de consulta es el formulario de contacto.",
  },
  {
    order: 1,
    question: "¿Trabajas con startups en etapa temprana?",
    answer:
      "Sí. Tengo experiencia en el desarrollo de MVPs y acompañamiento técnico durante la validación de producto. El alcance y el nivel de formalidad se adaptan a la etapa de la compañía.",
  },
  {
    order: 2,
    question: "¿Tienes una preferencia de stack tecnológico?",
    answer:
      "Priorizo la herramienta adecuada al problema antes que una preferencia personal. Trabajo con frecuencia en Go para servicios backend y React/Next.js en frontend, pero el criterio de selección siempre es mantenibilidad, ecosistema y costo total de operación.",
  },
  {
    order: 3,
    question: "¿Cómo iniciamos un proyecto?",
    answer:
      "El primer paso es enviar un resumen breve del proyecto a través del formulario de contacto. La respuesta llega en un plazo de 24 a 48 horas para coordinar una llamada inicial de descubrimiento de 15 minutos.",
  },
];

const FAQ_EN: FAQItem[] = [
  {
    order: 0,
    question: "What is your current availability?",
    answer:
      "The agenda is typically committed 2 to 4 weeks in advance. For one-off consulting or scoped engagements, response times can be shorter. The formal channel for inquiries is the contact form.",
  },
  {
    order: 1,
    question: "Do you work with early-stage startups?",
    answer:
      "Yes. I have experience developing MVPs and providing technical support during product validation. Scope and level of formality are adapted to the company's stage.",
  },
  {
    order: 2,
    question: "Do you have a technology stack preference?",
    answer:
      "I prioritize the right tool for the problem over personal preference. I frequently work with Go for backend services and React/Next.js on the frontend, but the selection criteria is always maintainability, ecosystem, and total operating cost.",
  },
  {
    order: 3,
    question: "How do we start a project?",
    answer:
      "The first step is to send a brief project summary through the contact form. A response will follow within 24 to 48 hours to schedule an initial 15-minute discovery call.",
  },
];

export const FAQ_DATA: Localized<FAQItem[]> = {
  es: FAQ_ES,
  en: FAQ_EN,
};
