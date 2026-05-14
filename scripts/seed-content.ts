/**
 * Seed/update all formal copy across:
 *   - Settings global (SEO, Hero, Section Headings, Branding)
 *   - Methodology collection (3 steps × 2 locales)
 *   - FAQ collection (4 items × 2 locales)
 *
 * Usage: pnpm seed:content   (wrapped in `doppler run`)
 *
 * Idempotent: collections lookup by `order`, then update or create.
 */
import { getPayload } from "payload";
import config from "../payload.config";

// ─────────────────────────────────────────────────────────────────────────────
// SETTINGS — Localized fields
// ─────────────────────────────────────────────────────────────────────────────

type SettingsLocale = {
  siteTitle: string;
  siteDescription: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroDescription: string;
  heroTagline: string;
  availability: { role: string }[];
  // Section Headings
  portfolioTitle: string;
  portfolioDescription: string;
  stackTitle: string;
  processTitle: string;
  contactTitle: string;
  contactSubtitle: string;
  faqTitle: string;
  finalCtaLine1: string;
  finalCtaLine2: string;
  // Branding (localized)
  jobTitle: string;
};

const SETTINGS_ES: SettingsLocale = {
  siteTitle: "Marco Sandoval — Ingeniero de Software",
  siteDescription:
    "Ingeniero de software con más de 7 años de experiencia liderando el desarrollo de productos digitales. Soluciones técnicas confiables, mantenibles y alineadas a objetivos de negocio.",
  heroTitle: "Soluciones de software",
  heroTitleAccent: "diseñadas para perdurar.",
  heroDescription:
    "Más de 7 años de experiencia liderando el desarrollo de productos digitales en distintas industrias. Combino criterio técnico, comunicación clara y entregas iterativas para reducir riesgos y acelerar tiempo a mercado.",
  heroTagline: "// quality · velocity · ownership",
  availability: [
    { role: "Posiciones full-time" },
    { role: "Consultoría técnica" },
    { role: "Contratos por proyecto" },
  ],
  portfolioTitle: "Proyectos destacados",
  portfolioDescription:
    "Selección de proyectos en producción: algoritmos, herramientas open source y trabajos con clientes.",
  stackTitle: "Stack tecnológico",
  processTitle: "Metodología de trabajo",
  contactTitle: "Contacto",
  contactSubtitle: "Tiempo de respuesta habitual: 24 a 48 horas hábiles.",
  faqTitle: "Preguntas frecuentes",
  finalCtaLine1: "CONSTRUYAMOS",
  finalCtaLine2: "JUNTOS.",
  jobTitle: "Ingeniero de Software",
};

const SETTINGS_EN: SettingsLocale = {
  siteTitle: "Marco Sandoval — Software Engineer",
  siteDescription:
    "Software engineer with 7+ years leading the development of digital products. Reliable, maintainable technical solutions aligned with business goals.",
  heroTitle: "Software solutions",
  heroTitleAccent: "built to last.",
  heroDescription:
    "7+ years leading the development of digital products across multiple industries. I combine technical judgment, clear communication, and iterative delivery to reduce risk and accelerate time to market.",
  heroTagline: "// quality · velocity · ownership",
  availability: [
    { role: "Full-time positions" },
    { role: "Technical consulting" },
    { role: "Project-based contracts" },
  ],
  portfolioTitle: "Selected work",
  portfolioDescription:
    "A curated selection of production projects: algorithms, open source tools, and client work.",
  stackTitle: "Technology stack",
  processTitle: "Engagement methodology",
  contactTitle: "Contact",
  contactSubtitle: "Typical response time: 24 to 48 business hours.",
  faqTitle: "Frequently asked questions",
  finalCtaLine1: "LET'S BUILD",
  finalCtaLine2: "TOGETHER.",
  jobTitle: "Software Engineer",
};

// Non-localized fields (required by validation, only re-applied on each run)
const SETTINGS_SHARED = {
  siteName: "Spacehole tech",
  email: "mrsandvv@gmail.com",
  ogLocale: "es_MX",
};

// ─────────────────────────────────────────────────────────────────────────────
// METHODOLOGY — 3 steps
// ─────────────────────────────────────────────────────────────────────────────

type MethodologyStep = {
  order: number;
  es: { title: string; duration: string; description: string };
  en: { title: string; duration: string; description: string };
};

const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    order: 0,
    es: {
      title: "Descubrimiento",
      duration: "1 semana",
      description:
        "Sesiones de descubrimiento para entender el problema, mapear restricciones técnicas y de negocio, y definir el alcance. Acordamos métricas de éxito antes de escribir código.",
    },
    en: {
      title: "Discovery",
      duration: "1 week",
      description:
        "Discovery sessions to understand the problem, map technical and business constraints, and define scope. We agree on success metrics before writing any code.",
    },
  },
  {
    order: 1,
    es: {
      title: "Construcción",
      duration: "2 a 6 semanas",
      description:
        "Desarrollo iterativo con entregas funcionales cada semana. Code review continuo, tests donde aportan valor y documentación de decisiones técnicas relevantes.",
    },
    en: {
      title: "Build",
      duration: "2 to 6 weeks",
      description:
        "Iterative development with functional deliveries every week. Continuous code review, tests where they add value, and documentation of relevant technical decisions.",
    },
  },
  {
    order: 2,
    es: {
      title: "Entrega y operación",
      duration: "Continuo",
      description:
        "Lanzamiento a producción, transferencia técnica documentada y ventana de soporte para iterar sobre métricas reales una vez en operación.",
    },
    en: {
      title: "Launch & operate",
      duration: "Continuous",
      description:
        "Production launch, documented technical handoff, and a support window to iterate on real metrics once in operation.",
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FAQ — 4 items
// ─────────────────────────────────────────────────────────────────────────────

type FAQEntry = {
  order: number;
  es: { question: string; answer: string };
  en: { question: string; answer: string };
};

const FAQ_ITEMS: FAQEntry[] = [
  {
    order: 0,
    es: {
      question: "¿Cuál es tu disponibilidad actual?",
      answer:
        "La agenda suele estar comprometida con 2 a 4 semanas de anticipación. Para consultorías puntuales o intervenciones acotadas existe margen de respuesta más ágil. La vía formal de consulta es el formulario de contacto.",
    },
    en: {
      question: "What is your current availability?",
      answer:
        "The agenda is typically committed 2 to 4 weeks in advance. For one-off consulting or scoped engagements, response times can be shorter. The formal channel for inquiries is the contact form.",
    },
  },
  {
    order: 1,
    es: {
      question: "¿Trabajas con startups en etapa temprana?",
      answer:
        "Sí. Tengo experiencia en el desarrollo de MVPs y acompañamiento técnico durante la validación de producto. El alcance y el nivel de formalidad se adaptan a la etapa de la compañía.",
    },
    en: {
      question: "Do you work with early-stage startups?",
      answer:
        "Yes. I have experience developing MVPs and providing technical support during product validation. Scope and level of formality are adapted to the company's stage.",
    },
  },
  {
    order: 2,
    es: {
      question: "¿Tienes una preferencia de stack tecnológico?",
      answer:
        "Priorizo la herramienta adecuada al problema antes que una preferencia personal. Trabajo con frecuencia en Go para servicios backend y React/Next.js en frontend, pero el criterio de selección siempre es mantenibilidad, ecosistema y costo total de operación.",
    },
    en: {
      question: "Do you have a technology stack preference?",
      answer:
        "I prioritize the right tool for the problem over personal preference. I frequently work with Go for backend services and React/Next.js on the frontend, but the selection criteria is always maintainability, ecosystem, and total operating cost.",
    },
  },
  {
    order: 3,
    es: {
      question: "¿Cómo iniciamos un proyecto?",
      answer:
        "El primer paso es enviar un resumen breve del proyecto a través del formulario de contacto. La respuesta llega en un plazo de 24 a 48 horas para coordinar una llamada inicial de descubrimiento de 15 minutos.",
    },
    en: {
      question: "How do we start a project?",
      answer:
        "The first step is to send a brief project summary through the contact form. A response will follow within 24 to 48 hours to schedule an initial 15-minute discovery call.",
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Runner
// ─────────────────────────────────────────────────────────────────────────────

async function run() {
  const payload = await getPayload({ config });

  // Settings ──────────────────────────────────────────────────────────────
  for (const [locale, data] of [
    ["es", SETTINGS_ES],
    ["en", SETTINGS_EN],
  ] as const) {
    await payload.updateGlobal({
      slug: "settings",
      locale,
      data: { ...SETTINGS_SHARED, ...data },
    });
    console.log(`✓ Settings updated → ${locale}`);
  }

  // Methodology ──────────────────────────────────────────────────────────
  for (const step of METHODOLOGY_STEPS) {
    const existing = await payload.find({
      collection: "methodology",
      where: { order: { equals: step.order } },
      limit: 1,
      locale: "es",
    });

    if (existing.docs[0]) {
      const id = existing.docs[0].id;
      await payload.update({
        collection: "methodology",
        id,
        locale: "es",
        data: { ...step.es, order: step.order },
      });
      await payload.update({
        collection: "methodology",
        id,
        locale: "en",
        data: { ...step.en, order: step.order },
      });
      console.log(`✓ Methodology[${step.order}] updated`);
    } else {
      const created = await payload.create({
        collection: "methodology",
        locale: "es",
        data: { ...step.es, order: step.order },
      });
      await payload.update({
        collection: "methodology",
        id: created.id,
        locale: "en",
        data: { ...step.en, order: step.order },
      });
      console.log(`✓ Methodology[${step.order}] created`);
    }
  }

  // FAQ ──────────────────────────────────────────────────────────────────
  for (const item of FAQ_ITEMS) {
    const existing = await payload.find({
      collection: "faq",
      where: { order: { equals: item.order } },
      limit: 1,
      locale: "es",
    });

    if (existing.docs[0]) {
      const id = existing.docs[0].id;
      await payload.update({
        collection: "faq",
        id,
        locale: "es",
        data: { ...item.es, order: item.order },
      });
      await payload.update({
        collection: "faq",
        id,
        locale: "en",
        data: { ...item.en, order: item.order },
      });
      console.log(`✓ FAQ[${item.order}] updated`);
    } else {
      const created = await payload.create({
        collection: "faq",
        locale: "es",
        data: { ...item.es, order: item.order },
      });
      await payload.update({
        collection: "faq",
        id: created.id,
        locale: "en",
        data: { ...item.en, order: item.order },
      });
      console.log(`✓ FAQ[${item.order}] created`);
    }
  }

  console.log("\nDone.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
