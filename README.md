# Portfolio

Sitio personal en Next.js 16 (App Router), bilingüe (es/en) y prerenderizado de forma estática. Desplegado en Vercel mediante la integración de GitHub.

## Stack

- **Next.js 16 + React 19**, Tailwind CSS 4, `motion` para animaciones.
- **Contenido estático en TypeScript** (`lib/data/`). No hay CMS ni base de datos: Payload y MongoDB se retiraron en julio de 2026.
- **Spacehole** como sistema de color: seis flavors (cuatro oscuros, dos claros) seleccionables en el sitio.
- **Shiki** resalta los snippets una sola vez en el servidor con los seis themes a la vez.
- **Formulario de contacto**: Cloudflare Turnstile + Resend en `app/(site)/api/contact` (única ruta dinámica).
- **Analítica**: Umami (opcional, por variable de entorno) y Vercel Analytics / Speed Insights.
- **Biome** para lint y formato.

## Desarrollo

```bash
pnpm install
cp .env.example .env.local   # completar las variables necesarias
pnpm dev
```

| Script | Qué hace |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo |
| `pnpm lint` / `pnpm lint:fix` | Biome check (con o sin correcciones) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm build` | Build de producción |
| `pnpm validate` | `lint` + `typecheck` + `build`, lo mismo que corre CI |
| `pnpm resumes <dir>` | Genera los PDFs del CV en `public/` desde los HTML de `<dir>` (o `RESUME_DIR`). Requiere Google Chrome. |

## Contenido

Todo el contenido vive en `lib/data/` y se sirve a través de `lib/content.ts`:

| Archivo | Contenido |
| --- | --- |
| `lib/data/settings.ts` | Textos del sitio, hero, SEO, redes, disponibilidad (es/en) |
| `lib/data/projects.ts` | Proyectos y entradas del Lab (es/en) |
| `lib/data/stack.ts` | Tecnologías |
| `lib/data/faq.ts` | Preguntas frecuentes (es/en) |
| `lib/data/methodology.ts` | Pasos de la metodología (es/en) |

Los tipos compartidos están en `lib/types.ts`. Los textos fijos de la interfaz están en `lib/translations.ts`.

## Themes (Spacehole)

- `app/(site)/spacehole.css` se **genera** desde `palette/tokens.json` en el repo de Spacehole. No editar a mano.
- `themes/*.json` son los mismos themes que se publican en el Marketplace de VS Code / Open VSX; Shiki los consume directamente.
- `lib/flavors.ts` duplica las muestras de color solo para el selector. Si cambia la paleta, regenerar el CSS y actualizar esa lista.

## Variables de entorno

Ver `.env.example`. Ninguna es necesaria para compilar; sin `RESEND_API_KEY` / `TURNSTILE_SECRET_KEY` el formulario de contacto responde con error.

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canónica para metadata, sitemap y robots |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` | Envío del formulario de contacto |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Captcha del formulario |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID`, `NEXT_PUBLIC_UMAMI_SRC` | Umami (opcional) |

## Flujo de ramas y despliegue

```
feature/* ──PR──▶ develop ──PR──▶ main
                    │                │
              Vercel Preview   Vercel Production
```

- **`develop`** es la rama por defecto e integra el trabajo. Cada push genera un deploy de **Preview** en Vercel.
- **`main`** es producción. Solo se actualiza mediante PR desde `develop`; cada merge genera el deploy de **Production**.
- **CI** (`.github/workflows/ci.yml`, check `validate`) corre `lint`, `typecheck` y `build` en cada PR y push a `develop` y `main`.

Cómo se hace cumplir:

1. **GitHub**: reglas de rama en `develop` y `main` que exigen PR y el check `validate` en verde antes de mergear (y bloquean force-push y borrado).
2. **Vercel**: *Settings → Deployment Checks* con el check `validate` de GitHub. Vercel compila el deploy pero no lo promueve a producción hasta que CI pase.
