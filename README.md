# Portfolio

Sitio personal en Next.js 16 (App Router), bilingüe (es/en) y prerenderizado de forma estática. Desplegado en Vercel mediante la integración de GitHub.

## Stack

- **Next.js 16 + React 19**, Tailwind CSS 4, `motion` para animaciones.
- **Contenido estático en TypeScript** (`lib/data/`). No hay CMS ni base de datos: Payload y MongoDB se retiraron en julio de 2026.
- **Spacehole** como sistema de color: seis flavors (cuatro oscuros, dos claros) seleccionables en el sitio.
- **Shiki** resalta los snippets una sola vez en el servidor con los seis themes a la vez.
- **Formulario de contacto**: Cloudflare Turnstile + Resend en `app/(site)/api/contact` (única ruta dinámica).
- **Analítica**: Umami (Cloud, plan gratuito), servido desde el propio dominio. Ver [Métricas](#métricas).
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
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami; sin esta variable no se carga el script |
| `UMAMI_HOST` | Opcional: instancia propia de Umami en vez de Umami Cloud |

## Métricas

Umami Cloud registra visitas y eventos sin cookies. El script y el envío pasan por `/stats` (rewrites en `next.config.mjs`), así los bloqueadores que filtran por dominio no lo descartan. `data-domains` limita el registro al dominio de `NEXT_PUBLIC_SITE_URL`, de modo que los Preview de Vercel no ensucian los datos.

**Eventos**

| Evento | Datos | Dónde |
| --- | --- | --- |
| `cv-download` | `lang` | Botón de CV en el hero |
| `hero-profile` | — | Foto del hero (enlace al perfil) |
| `contact-sent` | — | Formulario enviado con éxito |
| `project-click` | `project`, `target` (`live` / `demo` / `repo` / `install`) | Tarjetas del portfolio |
| `spacehole-install` | `target` (`vscode`, `ghostty`, …) | Copiar comando de instalación |
| `spacehole-repo` | — | Botón al repo de Spacehole |
| `theme-change` | `flavor`, `location` (`grid` / `compact`) | Selector de flavors |
| `social-click` | `platform`, `location` | Navbar, footer y CTA final |

Los enlaces usan atributos `data-umami-event-*`; lo demás pasa por `track()` en `lib/analytics.ts`.

**Campañas (UTM)**: LinkedIn e Instagram abren los enlaces en su navegador interno y suelen perder el referrer, así que todo enlace compartido lleva UTM:

```
?utm_source=linkedin&utm_medium=social&utm_campaign=<campaña>
?utm_source=instagram&utm_medium=social&utm_campaign=<campaña>
?utm_source=devto&utm_medium=article&utm_campaign=<slug-del-post>
```

## Flujo de ramas y despliegue

```
feature/* ──PR (squash)──▶ develop ──PR (merge commit)──▶ main
                              │                             │
                        Vercel Preview               Vercel Production
```

1. Crear una rama desde `develop` (`feat/…`, `fix/…`, `chore/…`).
2. Abrir PR hacia `develop`. CI corre `validate` y Vercel genera un Preview del PR. Mergear con **squash**.
3. Para publicar, abrir PR `develop` → `main`. Mergear con **merge commit** (no squash ni rebase), para que `develop` y `main` no diverjan.
4. Las ramas de feature se borran solas al mergear el PR (*Automatically delete head branches*). Localmente: `git fetch --prune` y `git branch -d <rama>`.

Cómo se hace cumplir:

- **CI** (`.github/workflows/ci.yml`): `validate` corre `lint`, `typecheck` y `build` en cada PR y push a `develop` y `main`. `source-branch` falla si un PR hacia `main` no sale de `develop`.
- **Rulesets de GitHub**: `develop` y `main` no aceptan push directo, force-push ni borrado; todo entra por PR con `validate` en verde. `main` además exige `source-branch` y solo permite merge commit.
- **Vercel**: *Settings → Deployment Checks* con `validate`, para que un deploy de producción no se promueva hasta que CI pase.
