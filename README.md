<div align="center">
  <img src="public/android-chrome-192x192.png" alt="ricardotapia.dev" width="88" height="88" />
  <h1>ricardotapia.dev</h1>
  <p>
    Personal portfolio and professional site of Ricardo Tapia, a full-stack
    developer based in Chihuahua, Mexico.<br />
    Bilingual (Spanish/English), statically generated, with a developer-focused aesthetic.
  </p>
  <p><a href="https://ricardotapia.dev"><strong>ricardotapia.dev</strong></a></p>
</div>

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- next-intl (i18n: `es` default, `en`)
- MDX case studies (`next-mdx-remote` + `gray-matter`)
- next-themes (dark default)
- Vitest for the unit suite
- Vercel Analytics + Speed Insights, GA4 optional

## Requirements

- Node.js 24+
- npm 10+

## Getting started

```bash
git clone https://github.com/Ricwolf19/ricardotapia.dev.git
cd ricardotapia.dev
npm install
npm run dev
```

The site runs at http://localhost:3000.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm start` — start production server
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript check
- `npm run test` / `npm run test:watch` — Vitest
- `npm run format` / `npm run format:fix` — Prettier
- `npm run ci` — format + lint + typecheck + test + build

## Environment variables

Every variable is optional — the site builds and serves with none of them set,
and each integration switches itself off instead of failing. See
`.env.example` for the full list and
[AGENTS.md](AGENTS.md#environment--feature-flags) for the degradation rules.

```env
NEXT_PUBLIC_SITE_URL=https://ricardotapia.dev
GITHUB_USERNAME=your-username
CONTACT_EMAIL=you@email.com
WHATSAPP_NUMBER=521XXXXXXXXXX

# SEO / analytics
GOOGLE_SITE_VERIFICATION=...      # Search Console HTML-tag verification
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX    # omit and no gtag script is loaded
```

## Project structure

```
content/projects/   MDX case studies, one folder per locale (es/, en/)
messages/           i18n message files (en.json, es.json)
src/app/            App Router routes ([locale]/...)
src/components/     ui, layout, sections, seo, file-viewer, mdx
src/data/           Projects, experience, technologies, site config
src/i18n/           next-intl routing and request config
src/lib/            SEO, structured data, OG images, MDX, integrations
src/styles/         Global styles (Tailwind v4)
```

## Testing

Unit tests live next to their source as `*.test.ts` and run on Vitest. They
cover pure, high-risk logic — SEO helpers, the sitemap, project-visibility
selectors, the OG text clamps and the contact-form gate order — rather than
components or framework behaviour.

```bash
npm run test
```

## Content

Projects are written in Spanish as the source of truth in `src/data/projects.ts`;
English copy lives in `src/data/localize.ts` and is applied at runtime via the
`localized()` helper.

Case-study bodies are MDX under `content/projects/<locale>/<slug>.mdx`, fully
translated in both locales. Adding a language means adding a folder: the loader
falls back to the default locale for any file that is missing, and the page
marks a fallback body with `lang` so it is not indexed as the wrong language.

## Contributing

Conventions, invariants and architectural decisions live in
[AGENTS.md](AGENTS.md). Read it before changing SEO metadata, i18n routing or
the MDX pipeline.

## License

[MIT](LICENSE)
