# Portfolio

Personal site built with Next.js 16 (App Router), bilingual (es/en) and statically prerendered. Deployed on Vercel through the GitHub integration.

## Stack

- **Next.js 16 + React 19**, Tailwind CSS 4, `motion` for animations.
- **Static content in TypeScript** (`lib/data/`). No CMS or database: Payload and MongoDB were removed in July 2026.
- **Spacehole** as the color system: six flavors (four dark, two light) selectable on the site.
- **Shiki** highlights snippets once on the server, with all six themes at once.
- **Contact form**: Cloudflare Turnstile + Resend at `app/(site)/api/contact` (the only dynamic route).
- **Analytics**: Umami (Cloud, free plan), served from the site's own domain. See [Metrics](#metrics).
- **Biome** for linting and formatting.

## Development

```bash
pnpm install
cp .env.example .env.local   # fill in the variables you need
pnpm dev
```

| Script | What it does |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm lint` / `pnpm lint:fix` | Biome check (without or with fixes) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm build` | Production build |
| `pnpm validate` | `lint` + `typecheck` + `build`, the same as CI |
| `pnpm resumes <dir>` | Builds the resume PDFs in `public/` from the HTML files in `<dir>` (or `RESUME_DIR`). Requires Google Chrome. |

## Content

All content lives in `lib/data/` and is served through `lib/content.ts`:

| File | Content |
| --- | --- |
| `lib/data/settings.ts` | Site copy, hero, SEO, social links, availability (es/en) |
| `lib/data/projects.ts` | Projects and Lab entries (es/en) |
| `lib/data/stack.ts` | Technologies |
| `lib/data/faq.ts` | FAQ (es/en) |
| `lib/data/methodology.ts` | Methodology steps (es/en) |

Shared types are in `lib/types.ts`. Fixed UI strings are in `lib/translations.ts`.

## Themes (Spacehole)

- `app/(site)/spacehole.css` is **generated** from `palette/tokens.json` in the Spacehole repo. Don't edit it by hand.
- `themes/*.json` are the same themes published to the VS Code Marketplace / Open VSX; Shiki uses them directly.
- `lib/flavors.ts` duplicates the color swatches for the picker only. If the palette changes, regenerate the CSS and update that list.

## Environment variables

See `.env.example`. None are required to build; without `RESEND_API_KEY` / `TURNSTILE_SECRET_KEY` the contact form returns an error.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap, robots and Umami's domain filter |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` | Sending the contact form |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Contact form captcha |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami; without it the script isn't loaded |
| `UMAMI_HOST` | Optional: self-hosted Umami instead of Umami Cloud |

## Metrics

Umami Cloud records visits and events without cookies. The script and the data it sends go through `/stats` (rewrites in `next.config.mjs`), so blockers that filter by domain don't drop it. `data-domains` limits tracking to the `NEXT_PUBLIC_SITE_URL` domain, so Vercel Preview deploys don't pollute the data.

**Events**

| Event | Data | Where |
| --- | --- | --- |
| `cv-download` | `lang` | Resume button in the hero |
| `hero-profile` | — | Hero photo (profile link) |
| `contact-sent` | — | Contact form sent successfully |
| `project-click` | `project`, `target` (`live` / `demo` / `repo` / `install`) | Portfolio cards |
| `spacehole-install` | `target` (`vscode`, `ghostty`, …) | Copying an install command |
| `spacehole-repo` | — | Spacehole repo button |
| `theme-change` | `flavor`, `location` (`grid` / `compact`) | Flavor picker |
| `social-click` | `platform`, `location` | Navbar, footer and final CTA |

Links use `data-umami-event-*` attributes; everything else goes through `track()` in `lib/analytics.ts`.

**Campaigns (UTM)**: LinkedIn and Instagram open links in their in-app browsers and often drop the referrer, so every shared link gets UTM tags:

```
?utm_source=linkedin&utm_medium=social&utm_campaign=<campaign>
?utm_source=instagram&utm_medium=social&utm_campaign=<campaign>
?utm_source=devto&utm_medium=article&utm_campaign=<post-slug>
```

## Branching and deployment

```
feature/* ──PR (squash)──▶ develop ──PR (merge commit)──▶ main
                              │                             │
                        Vercel Preview               Vercel Production
```

1. Create a branch from `develop` (`feat/…`, `fix/…`, `chore/…`).
2. Open a PR into `develop`. CI runs `validate` and Vercel builds a Preview for the PR. Merge with **squash**.
3. To release, open a PR from `develop` into `main`. Merge with a **merge commit** (not squash or rebase), so `develop` and `main` don't diverge.
4. Feature branches are deleted automatically when the PR is merged (*Automatically delete head branches*). Locally: `git fetch --prune` and `git branch -d <branch>`.

How it's enforced:

- **CI** (`.github/workflows/ci.yml`): `validate` runs `lint`, `typecheck` and `build` on every PR and push to `develop` and `main`. `source-branch` fails if a PR into `main` doesn't come from `develop`.
- **GitHub rulesets**: `develop` and `main` don't accept direct pushes, force pushes or deletion; everything goes through a PR with `validate` passing. `main` also requires `source-branch` and only allows merge commits.
- **Vercel**: *Settings → Deployment Checks* with `validate`, so a production deploy isn't promoted until CI passes.

## Conventions

Everything in this repo is written in English: code, comments, docs, commits and PRs. The only exception is the localized `es` site content in `lib/data/` and `lib/translations.ts`.
