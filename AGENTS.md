# AGENTS.md

## 1. What this is

`ricardotapia.dev` — Ricardo Tapia's personal portfolio. Next.js 15 App Router,
TypeScript strict, Tailwind v4, bilingual via next-intl. Every page is
statically generated; interactivity is confined to small client islands.

SEO is a primary requirement, not a finishing touch: the canonical/hreflang/
structured-data rules below are load-bearing. See [README](README.md) for setup
and stack detail.

## 2. How to work here

Read before you write. Make the smallest change that solves the problem, match
the surrounding style, and run the gate (§4) before calling anything done.
Invariants in §7 are not negotiable without flagging them first.

## 3. Layout

```
content/projects/<locale>/  MDX case-study bodies, one folder per locale
messages/             next-intl messages: es.json (source of truth), en.json
src/app/[locale]/     All pages. Locale-prefixed; there is no unprefixed route.
src/app/*.ts          File-convention SEO assets: sitemap, robots, manifest, OG
src/app/icon.tsx      Favicon/PWA icons rendered at build time from public/me.jpg
src/components/
  ui/                 Primitives (Button, Input, Badge, Avatar…) — keep domain-free
  layout/             Global chrome: AppShell → Sidebar (lg+) / MobileNav (<lg), Footer
  overlay/            Shared modal plumbing: scroll lock, focus trap, layer stack
  sections/           Page blocks (ProjectGrid, ExperienceTimeline, LearningPath…)
  sections/home/      The numbered home previews (Intro, ProjectsPreview…)
  seo/                JsonLd, Breadcrumbs, GoogleAnalytics
  file-viewer/        Self-contained overlay file/PDF/image viewer
  mdx/                MDX rendering
src/data/             Static content: projects, experience, education, credentials,
                      stack (curated groups), nav, site
src/lib/              seo, schema, og, avatar, redirects, mdx, env, ratelimit…
src/types/index.ts    All domain types live here — not beside the data
```

## 4. Commands

| Command              | What it runs                                               |
| -------------------- | ---------------------------------------------------------- |
| `npm run dev`        | Dev server on :3000                                        |
| `npm run test`       | Vitest, once                                               |
| `npm run test:watch` | Vitest, watch                                              |
| `npm run typecheck`  | `tsc --noEmit`                                             |
| `npm run lint`       | ESLint (next/core-web-vitals + next/typescript + prettier) |
| `npm run format:fix` | Prettier write                                             |
| `npm run ci`         | **The gate**: format + lint + typecheck + test + build     |

`npm run ci` is what CI runs. Run it before declaring work finished.

## 5. Patterns & architecture

| Pattern            | Where                                                          | Guardrail                                                                                                                 |
| ------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Page metadata      | `pageMetadata(locale, path, meta?)` in `lib/seo.ts`            | Never hand-write `alternates`/`openGraph` on a page; call this                                                            |
| Structured data    | builders in `lib/schema.ts` → `<JsonLd data={…}/>`             | Reference the Person/WebSite by `@id`, never re-describe them                                                             |
| OG cards           | `ogImageResponse()` in `lib/og.tsx`                            | All `opengraph-image.tsx` route through it                                                                                |
| Localized copy     | `es` in `data/*.ts`, `en` override in `data/localize.ts`       | Add English via `localize.ts`, not a second data array                                                                    |
| Feature flags      | `features` in `lib/env.ts`                                     | Gate every integration; never assume an env var exists                                                                    |
| Project visibility | `isPublicLink` / `getLiveUrl` in `data/projects.ts`            | Never render `link.url` directly — a link may be private                                                                  |
| Routes             | `siteNav` in `data/nav.ts`, `STATIC_PATHS` in `app/sitemap.ts` | Adding a route touches both; renaming one adds a `legacyRedirects` entry (`lib/redirects.ts`), all cross-checked by tests |
| Credentials        | one entry in `data/credentials.ts` (`status`, `files?`)        | Start as `planned`/`in-progress`, flip to `earned` + `files` later; roadmap items live in `data/learning.ts`              |
| Thumbnails         | `public/images/projects/<slug>/cover.{jpg,png}`                | Set `thumbnailReady` only once the file exists; a test checks                                                             |

Data flow: `data/*.ts` (static, Spanish) → server component → `localize.ts`
applies English → HTML. No database, no runtime fetching on any page.

### SEO invariants

Referenced from `lib/seo.ts`.

1. **Canonical host is the apex** (`https://ricardotapia.dev`). Vercel serves the
   apex as primary and 308s `www` to it. Pointing canonicals at `www` aims every
   ranking signal at a redirect. Override per-environment with
   `NEXT_PUBLIC_SITE_URL`.
2. **Every page sets its own canonical + hreflang** via `pageMetadata` /
   `localeAlternates`. A page that omits them inherits the layout's and
   self-canonicalizes to the locale home — telling Google it is a duplicate of
   the homepage.
3. **Declaring `openGraph` in a segment drops the injected `og:image`.** Next
   merges `opengraph-image.tsx` into the metadata of the segment that declares
   it, but a deeper segment's own `openGraph` object _replaces_ the parent's,
   image included. So `pageMetadata` restates `images: [defaultOgImage]`.
   Routes that own an `opengraph-image.tsx` in their own segment (case studies)
   must **not** spread `defaultOgImage` — theirs is injected afterwards and
   would be overwritten by it.
4. **Sitemap alternates must equal the pages' hreflang.** Both come from
   `hreflangMap()`. Google cross-checks the two and drops the whole language
   cluster when they disagree. `src/app/sitemap.test.ts` locks this.
5. **`metadataBase` lives in `src/app/layout.tsx`**, not the locale layout, so
   routes outside a locale (global not-found, root OG images) resolve against
   the real domain instead of `localhost:3000`.
6. Language codes are **language-only** (`es`, `en`), never `es-MX` — regional
   codes exclude Spanish speakers outside Mexico. `x-default` points at `es`.
7. **`pageMetadata` restates `openGraph` and `twitter` in full.** A page-level
   object replaces the layout's whole object, so `siteName`, `og:locale`,
   `og:type`, `twitter:card` and the Twitter title would otherwise vanish.
   Routes with their own card pass `ownImage: true` so Next injects theirs.
8. **No `getTranslations` inside `generateImageMetadata`.** It runs while Next
   resolves a page's metadata, outside next-intl's request scope; a throw there
   silently drops every `<meta>` on every page. Read `messages/*.json` directly.

### Environment & feature flags

Referenced from `lib/env.ts`.

Every integration degrades gracefully. When its variables are absent the
matching `features` flag is `false`, the feature is skipped, and the site still
builds and serves. This is why production can run before any third-party
credential exists — and why new integrations must follow the same shape rather
than throwing on a missing key.

| Flag                 | Needs                               | Off behaviour                               |
| -------------------- | ----------------------------------- | ------------------------------------------- |
| `features.resend`    | `RESEND_API_KEY`                    | Contact form falls back to a `mailto:` link |
| `features.recaptcha` | `RECAPTCHA_SECRET_KEY`              | Human check skipped (returns `true`)        |
| `features.rateLimit` | `UPSTASH_REDIS_REST_URL` + `_TOKEN` | No throttling                               |
| GA4                  | `NEXT_PUBLIC_GA_ID`                 | No gtag script is shipped at all            |
| Search Console       | `GOOGLE_SITE_VERIFICATION`          | No verification meta tag                    |

Rate limiting **fails open** (a Redis outage must not take the contact form
down); reCAPTCHA **fails closed** (an unverifiable human is a bot). That
asymmetry is deliberate.

### MDX case studies

Referenced from `components/mdx/MdxContent.tsx`.

Bodies live in `content/projects/<locale>/<slug>.mdx` — one directory per locale,
so adding a language is adding a folder. `getProjectContent(slug, locale)` falls
back to the default locale when a translation is missing and reports which locale
it actually read, so the page can set `lang` on the prose and avoid telling a
crawler that Spanish text is English.

They are compiled server-side with `next-mdx-remote/serialize`, then evaluated on
the client by `MdxContent` via `new Function` against the matching JSX runtime.

Neither of the package's own paths works here: the RSC `compileMDX` produces
elements Next 15's dev error serializer cannot stringify, and the client
`<MDXRemote>` ships without a `"use client"` directive, so it resolves the
server build of React during static generation and `useState` is null. Do not
"simplify" this back to either one.

### Project links

`getLiveUrl` prefers `landing`, then `live`, then `docs`. The `docs` fallback
exists so a library — which has no app to open — surfaces its documentation site
rather than falling through to its GitHub repo. `src/data/projects.test.ts`
pins the ordering and asserts no link carries a private registry scope or a
pinned version number.

## 6. Conventions

- Component files are **PascalCase**, one component per file. Next route files
  (`page.tsx`, `layout.tsx`) stay lowercase. Non-components are camel/kebab.
- Imports must match the file's exact case — Vercel builds on a case-sensitive
  filesystem; macOS will not catch the mistake locally.
- Arrow function components, `const`, no classes. Domain types go in
  `src/types/index.ts`, never beside the data that uses them.
- Prettier: 100 cols, double quotes, semicolons, trailing commas. Tailwind
  classes are sorted by `prettier-plugin-tailwindcss` — do not hand-order them.
- Comments explain **why**, not what. Shared components get a 1–2 line doc
  comment so they get reused instead of reinvented.
- User-facing strings come from `messages/*.json` — including `aria-label`s.
- Colors come from the CSS-var tokens in `src/styles/globals.css`, not raw
  Tailwind palette classes. Exception: `lib/og.tsx` and the `file-viewer`
  overlay, which render outside the cascade.

## 7. Invariants (do not break without flagging)

| Rule                               | Why                                                                                               | Instead                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Spanish is the source of truth     | `data/*.ts` holds `es`; `localize.ts` holds the `en` override (projects, experience, credentials) | Add English in `localize.ts`                                                     |
| Case studies exist in every locale | `content/projects/<locale>/<slug>.mdx`; `src/lib/mdx.test.ts` asserts parity                      | Add the file in every locale folder, or the page falls back and is marked `lang` |
| Every route is locale-prefixed     | `localePrefix: "always"`; `/` 307s to `/es`                                                       | Never add a route outside `[locale]` except file-convention assets               |
| Internal projects never get a page | `status: "internal"` is excluded from `workProjects`, and so from routes and sitemap              | Filter through `workProjects` / `projectSlugs`                                   |
| Server-first                       | Crawlers index server HTML                                                                        | `"use client"` only for genuine interactivity                                    |
| No secrets in `NEXT_PUBLIC_*`      | Those are inlined into the browser bundle                                                         | Server-only env via `lib/env.ts`                                                 |

## 8. Anti-patterns

- Hand-writing `alternates` or `openGraph` on a page instead of `pageMetadata`.
- Adding a page without adding its path to `STATIC_PATHS` in `src/app/sitemap.ts`
  and to `siteNav` in `src/data/nav.ts`.
- Renaming a route without a `legacyRedirects` entry (308) in `src/lib/redirects.ts`.
- Serving the icons from static files in `public/`: `src/app/icon.tsx` generates
  them from the photo, and `src/middleware.ts` must keep `icon|apple-icon` excluded
  or next-intl locale-prefixes them into a 404.
- Growing a `ui/` primitive with domain-specific props — compose a specialized
  component in `sections/` instead.
- Hardcoding user-facing copy in JSX when `messages/*.json` exists.
- Chasing test coverage. Tests here target pure, high-risk logic (SEO helpers,
  sitemap, project-visibility selectors, the contact gate order) — not
  components or framework behaviour.

## 9. Environment

Node 24 (CI pins `node-version: 24`), npm 10+. `package.json` declares a `yarn`
`packageManager` field, but the lockfile in use and every CI step are **npm** —
use npm. Deployed on Vercel.
