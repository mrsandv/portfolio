/**
 * Seed/update the Settings global with copy.
 * Run per-locale because localized fields require a single locale per call.
 *
 * Usage:
 *   pnpm seed:settings   (wraps the call in `doppler run`)
 *
 * Idempotent: only updates the listed fields, leaves the rest untouched.
 */
import { getPayload } from "payload";
import config from "../payload.config";

type LocaleData = {
  siteTitle: string;
  siteDescription: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroDescription: string;
  heroTagline: string;
  availability: { role: string }[];
};

const ES: LocaleData = {
  siteTitle: "Marco Sandoval — Software Engineer",
  siteDescription:
    "Más de 7 años de experiencia liderando el desarrollo de productos digitales en distintas industrias. Combino criterio técnico, comunicación clara y entregas iterativas para reducir riesgos y acelerar tiempo a mercado.",
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
};

const EN: LocaleData = {
  siteTitle: "Marco Sandoval — Software Engineer",
  siteDescription:
    "7+ years leading the development of digital products across multiple industries. I combine technical judgment, clear communication, and iterative delivery to reduce risk and accelerate time to market.",
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
};

// Non-localized fields (required by validation). Only set on first run; safe to re-run.
const SHARED = {
  siteName: "Marco Sandoval",
  email: "mrsandvv@gmail.com",
};

async function run() {
  const payload = await getPayload({ config });

  for (const [locale, data] of [
    ["es", ES],
    ["en", EN],
  ] as const) {
    await payload.updateGlobal({
      slug: "settings",
      locale,
      data: { ...SHARED, ...data },
    });
    console.log(`✓ Settings updated for locale: ${locale}`);
  }

  console.log("\nDone. Open the admin to verify or tweak.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
