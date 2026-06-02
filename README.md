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
- Motion for animations
- next-themes (dark default)
- Vercel Analytics + Speed Insights

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
- `npm run format` / `npm run format:fix` — Prettier
- `npm run ci` — format + lint + typecheck + build

## Environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://ricardotapia.dev
GITHUB_USERNAME=your-username
CONTACT_EMAIL=you@email.com
WHATSAPP_NUMBER=521XXXXXXXXXX
```

## Project structure

```
content/projects/   MDX case studies
messages/           i18n message files (en.json, es.json)
src/app/            App Router routes ([locale]/...)
src/components/     UI, layout, sections, motion, mdx
src/data/           Projects, experience, technologies, site config
src/i18n/           next-intl routing and request config
src/lib/            MDX parsing and utilities
src/styles/         Global styles (Tailwind v4)
```

## Content

Projects are written in Spanish as the source of truth in `src/data/projects.ts`
and `content/projects/*.mdx`. English copy lives in `src/data/localize.ts` and is
applied at runtime via the `localized()` helper.

## License

[MIT](LICENSE)
