import type { Project, Experience, Education } from "@/types";
import { localized } from "@/lib/utils";

/**
 * English translations of the projects and experience copy.
 * The Spanish lives in projects.ts / experience.ts (base source); here only the
 * English override, keyed by slug / id. Keeps the data array clean.
 */
const projectCopyEn: Record<string, { tagline: string; description: string }> = {
  "metri-info": {
    tagline:
      "Free EN/ES fitness web suite: 17 shareable calculators, a bilingual knowledge base and a PWA with server-first SEO.",
    description:
      "Free fitness web suite built with Next.js 16 (App Router, React Server Components). It bundles 17 health and training calculators — each with metric/imperial units, comparison mode and results shareable via URL/QR with dynamic OG images — plus a bilingual MDX knowledge base (~20 guides × 2 languages). Optional accounts with Better Auth (email/Google/GitHub, history, favorites, sync), installable offline-capable PWA, server-first SEO (JSON-LD, hreflang, dynamic OG), an admin dashboard with analytics, and a premium sync API for the mobile app (push/pull, LWW, tombstones, purge cron).",
  },
  metri: {
    tagline:
      "Offline-first workout tracker with a SQLite-driven UI, a headless Android widget and delta premium sync with the web.",
    description:
      "Open-source workout tracker built with Expo (SDK 56) and React Native 0.85. Offline-first architecture: SQLite with Drizzle ORM is the single source of truth and its `useLiveQuery` drives the UI with no global state library; MMKV handles synchronous reads. It ships a workout-session engine, a program/routine/day editor, 16 calculators, a knowledge base with a custom Markdown renderer, a headless Android home-screen widget that reads SQLite with no UI, local notifications with a rest-timer and 100% local progress photos. Automatic premium sync push→pull with delta sync, tombstones and exponential backoff; OTA via EAS and 4 GitHub Actions workflows. Beta APK (v1.7.0) distributed from metri.info/download.",
  },
  "cafe-combate": {
    tagline:
      "Monorepo running an entire multi-branch coffee-shop business: 13 apps, offline-first and a full requisition flow.",
    description:
      "A TypeScript monorepo (36 workspaces: 13 deployable apps, 12 domain modules, 11 shared packages) that runs an entire multi-branch coffee-shop/retail business: warehouse, purchasing, sales, production and electronic invoicing (CFDI/SAT via Facturapi + pdf-lib). Offline-first with Dexie 4/IndexedDB and optional Dexie Cloud sync, multi-tenant via realmId, uploads with uploaderkit to GCS, and a complete requisition flow (requisition→quote→approval→purchase orders→receiving→payments). Express 5 + Drizzle + PostgreSQL backend, Redis, multi-dyno Heroku deploys with GitHub Actions CI.",
  },
  espau: {
    tagline:
      "Institutional site and clinical back office for Esperanza para el Autismo I.A.P., with minors' health data encrypted at rest.",
    description:
      "Institutional website and clinical-administrative back office for ESPAU, a nonprofit dedicated to the diagnosis and therapy of Autism Spectrum Disorder. The public site covers the 6 programs (ADOS-2/ADI-R/ABAS-II, individual/group therapy, DENVER preschool, parent guidance, professional training), donations and transparency; the back office runs student records, therapists, schedules, cron-generated weekly plans, evaluations and an audit log under RBAC. Minors' health data is encrypted at rest and only released inside a step-up TOTP window. Auth.js v5 with mandatory TOTP, pgtyped + zql, node-pg-migrate, listkit and Vercel crons.",
  },
  "agates-from-mexico": {
    tagline:
      "One-of-a-kind-pieces e-commerce with a PWA storefront, in-person POS via Stripe Terminal and Spotlight search on Postgres.",
    description:
      "An online store for one-of-a-kind pieces (each SKU is a physical item with stock of exactly 1) built with the Next.js App Router: a storefront installable as a PWA (service worker that never caches HTML), online payments with Stripe and in-person card-present POS via Stripe Terminal, plus an admin panel with RBAC driven by a permission catalog. Each product exposes two public URLs (configurable Publishing Rules + a no-guessable private link), Spotlight search runs on a denormalized read-model in Postgres (accent-insensitive, advisory locks), and media uploads are server-validated straight to Backblaze B2. pgtyped + node-pg-migrate + zql, Cloudinary, PostHog, listkit for admin lists, Vercel.",
  },
  "danny-cuevas": {
    tagline: "Photography portfolio with an admin panel for managing albums and images.",
    description:
      "A portfolio site for photographer Daniel Cuevas, with public portfolio and contact pages plus an admin panel to manage albums and images. Built with Next.js, PostgreSQL with generated typing, and image uploads to AWS S3.",
  },
  chachitos: {
    tagline: "Official website for Chachitos, featuring a Google Maps store locator.",
    description:
      "Website for Chachitos, a Mexican puffed-wheat cereal company with over 70 years of tradition. Built with Next.js and React, it includes institutional pages and a Google Maps store locator with distance calculation.",
  },
  "corporativo-fiscal": {
    tagline:
      "Internal operating platform for an accounting firm: 13 apps, encrypted digital records, 2FA and a real-time collaborative whiteboard.",
    description:
      "A TypeScript monorepo with 13 applications running a tax and accounting firm: corporate portal, customer self-service portal, HR digital records, reception, administration, a snack-bar PWA and a real-time collaborative whiteboard (Excalidraw + Yjs) for tax-planning sessions. Baseline security: mandatory 2FA/OTP (speakeasy), fine-grained RBAC (ADMIN, ACCOUNTANT, CUSTOMER, HR, BARISTA, SERVICE) and digital records with encrypted documents. Deep Mexican tax-compliance domain: CFDI multi-payment, the SAT cancellation cycle, payment CFDIs and SAT scraping with Puppeteer. Express 5 + MongoDB/Mongoose backend with JWT.",
  },
  facturalandia: {
    tagline:
      "CFDI 4.0 electronic invoicing SaaS, genuinely multi-tenant per organization, with in-house auth and realtime sync.",
    description:
      "An electronic invoicing platform (CFDI 4.0) that is genuinely multi-tenant: each organization operates with its own Facturapi key encrypted with AES-256-GCM, an auto-registered signed webhook and its own buckets. TypeScript monorepo (Turborepo) with 5 apps (api, auth with 2FA, invoicing, read-only materialization, purchases), domains as vertical slices and 10 shared packages. 100% in-house auth with argon2id, realtime sync via signed webhooks + SSE, the full SAT cancellation cycle, Mongo transactions on a replica set, idempotent backfill, spotlight search and jobs with SSE-streamed logs. Node 22, React 19 + Vite 6, Express 5 + Mongoose, GCS, Stripe, Heroku.",
  },
  increscendo: {
    tagline:
      "Corporate site for Increscendo with blog, services and a quoter with PDF generation and SAT catalogs, plus an admin panel.",
    description:
      "A website for Increscendo focused on its public presence: landing, services, blog, events and FAQs server-rendered for SEO, plus a quoter with PDF generation and SAT catalogs. The admin panel manages customers, event types and quotes with listkit lists wired to server actions over parameterized SQL (zql).",
  },
  "portillo-y-young": {
    tagline:
      "Multilingual corporate site for Portillo y Young, with a portfolio and contact forms.",
    description:
      "A corporate website built with Next.js and React, featuring multilingual routing driven by a URL language segment. It includes services pages, a portfolio with per-project detail, and contact forms validated with Zod and protected by reCAPTCHA.",
  },
  listkit: {
    tagline:
      "A React library for standardized list views: 10 tree-shakeable subpath exports, Zod-validated advanced filters and byte-identical CSV export.",
    description:
      "@pibytelabs/listkit (v4.7.0) is a React library that produces a complete list view (toolbar, table, cards, pagination and filters) from a single declarative config, shipped as 10 tree-shakeable subpath exports. Advanced filters are validated with Zod, CSV export is verified byte-identical against real MongoDB and PostgreSQL, and it ships EN/ES i18n, SSR and adapters (memory/fetch/serverAction/Dexie). Releases are automated with release-please CI.",
  },
  uploaderkit: {
    tagline:
      "Full-stack file upload layer for React and Node with a shared client/server contract, headless hook and GCS/S3 providers.",
    description:
      "@pibytelabs/uploaderkit is a full-stack file upload layer for React and Node: a shared client/server contract with declarative scopes, a headless hook with magic-number validation, image compression and retry/abort, GCS/S3 providers, AES-256-GCM encryption, Express and Next.js adapters, and EN/ES i18n.",
  },
  "honeywell-internal": {
    tagline: "20+ internal automation solutions at Honeywell Intelligrated Chihuahua.",
    description:
      "Internal automation solutions with VBA macros and VB.NET, real-time metric dashboards via Oracle ERP, and ASP.NET MVC web apps with SQL Server. Apps not publicly hosted.",
  },
};

const experienceCopyEn: Record<string, string> = {
  "exp-corpfiscal":
    "Building the internal operating platform of a tax and accounting firm on Express microservices: 13 apps in a monorepo (legal, clients, accounting, reception, HR, administration, corporate and more). Real-time collaborative whiteboard for tax-planning sessions with WebSockets, Excalidraw and Yjs.",
  "exp-pibytelabs":
    "I designed and maintain the internal @pibytelabs package ecosystem (ui, utils — private packages) that powers every company product. Author of listkit and uploaderkit, published as open source on npm. Full-stack architecture for clients in electronic invoicing, e-commerce, health and education: Facturalandia, CorpFiscal, Café Combate, Espau, Agates From Mexico, Danny Cuevas, Increscendo and Portillo y Young.",
  "exp-sid":
    "Enterprise Java applications with a custom Struts-based framework. IoT integration via REST/HTTP APIs. Cross-platform communication modules for real-time inventory tracking. MySQL database management.",
  "exp-honeywell":
    "Professional internship. 20+ automation solutions with VBA macros and VB.NET scripts, reducing manual processes by 40%. Real-time metric dashboards via Oracle ERP integration. ASP.NET MVC web apps with SQL Server for enterprise resource tracking.",
};

const educationCopyEn: Record<string, string> = {
  "edu-utch-ing": "B.Eng. in Software Development and Management",
  "edu-utch-tsu": "Associate Degree (TSU) in IT — Multiplatform Software Development",
};

export const getTagline = (p: Project, locale: string): string =>
  localized(locale, p.tagline, projectCopyEn[p.slug]?.tagline);

export const getDescription = (p: Project, locale: string): string =>
  localized(locale, p.description, projectCopyEn[p.slug]?.description);

export const getExperienceDescription = (e: Experience, locale: string): string =>
  localized(locale, e.description, experienceCopyEn[e.id]);

export const getEducationDegree = (e: Education, locale: string): string =>
  localized(locale, e.degree, educationCopyEn[e.id]);
