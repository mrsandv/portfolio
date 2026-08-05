import type { Localized, SiteSettings } from "../cms";

const SETTINGS_ES: SiteSettings = {
  siteName: "Marco Sandoval",
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
  email: "mrsandvv@gmail.com",
  socialLinks: [
    { platform: "github", url: "https://github.com/mrsandv", showInFinalCta: true },
    { platform: "linkedin", url: "https://www.linkedin.com/in/mrsan", showInFinalCta: true },
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
  ogLocale: "es_MX",
  resumes: [{ label: "PDF · 2026", file: "/resume.pdf" }],
  keywords: [
    { keyword: "software engineer" },
    { keyword: "full stack" },
    { keyword: "typescript" },
    { keyword: "next.js" },
    { keyword: "go" },
  ],
};

const SETTINGS_EN: SiteSettings = {
  siteName: "Marco Sandoval",
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
  email: "mrsandvv@gmail.com",
  socialLinks: [
    { platform: "github", url: "https://github.com/mrsandv", showInFinalCta: true },
    { platform: "linkedin", url: "https://www.linkedin.com/in/mrsan", showInFinalCta: true },
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
  ogLocale: "en_US",
  resumes: [{ label: "PDF · 2026", file: "/resume.pdf" }],
  keywords: [
    { keyword: "software engineer" },
    { keyword: "full stack" },
    { keyword: "typescript" },
    { keyword: "next.js" },
    { keyword: "go" },
  ],
};

export const SITE_SETTINGS_DATA: Localized<SiteSettings> = {
  es: SETTINGS_ES,
  en: SETTINGS_EN,
};
