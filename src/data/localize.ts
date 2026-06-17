import type { Project, Experience } from "@/types";
import { localized } from "@/lib/utils";

/**
 * English translations of the projects and experience copy.
 * The Spanish lives in projects.ts / experience.ts (base source); here only the
 * English override, keyed by slug / id. Keeps the data array clean.
 */
const projectCopyEn: Record<string, { tagline: string; description: string }> = {
  "metri-info": {
    tagline:
      "Open-source fitness web toolkit: 16 calculators, a bilingual knowledge base and installable PWA, with server-first SEO.",
    description:
      "Web companion to the Metri mobile app, built with Next.js 16 (App Router, React Server Components). It bundles 16 health and training calculators, a bilingual MDX knowledge base (EN/ES) and an optional accounts layer. Server-first SEO with the Metadata API, JSON-LD, sitemap and dynamic OG; analytics via PostHog and GA4; installable as a PWA with offline calculators. Drizzle ORM + Neon and Better Auth power accounts, while the content renders with no database.",
  },
  metri: {
    tagline:
      "Offline-first fitness mobile app for logging training and body metrics, with the UI driven directly by SQLite.",
    description:
      "Open-source mobile app built with Expo (SDK 56) and React Native. Offline-first architecture: SQLite with Drizzle ORM is the single source of truth and its `useLiveQuery` drives the UI with no global state library; MMKV handles synchronous setting reads. It ships encrypted local auth, profiles with BMR/TDEE calculation, reminders with notifications, a progress-photo gallery, EN/ES i18n and light/dark themes via design tokens. Drizzle Kit runs automatic migrations on every launch.",
  },
  "cafe-combate": {
    tagline:
      "Operations monorepo for Café Combate: warehouse, CFDI invoicing, sales and production in a single ecosystem.",
    description:
      "A TypeScript monorepo unifying more than ten applications and shared modules to run warehouse, electronic invoicing (CFDI/SAT), sales, purchasing, production and administration. Built with React, Vite and React Router on top of Yarn Workspaces and Turborepo, with local-first sync via Dexie.",
  },
  espau: {
    tagline:
      "Institutional site and admin platform for Esperanza para el Autismo I.A.P. (ESPAU) in Chihuahua, Mexico.",
    description:
      "Institutional website and admin panel for ESPAU, a nonprofit dedicated to the diagnosis and therapy of Autism Spectrum Disorder. Built with Next.js (App Router), PostgreSQL with type-safe queries, and Auth.js authentication.",
  },
  "agates-from-mexico": {
    tagline:
      "Custom e-commerce platform for Agates From Mexico, with storefront, admin panel and role-based access control.",
    description:
      "A full online store built with Next.js: catalog, cart, Stripe and PayPal payments, ShipStation shipping, and a role-based admin panel. Backed by PostgreSQL with type-safe queries and integrated with Cloudinary, Redis, Resend and PostHog.",
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
      "Multi-app fiscal suite for an accounting firm: CFDI invoicing, reception, HR and collaborative tools.",
    description:
      "A TypeScript monorepo bundling several applications for a tax/accounting firm: web portal, authentication, administration, customer service, reception, HR and a collaborative whiteboard module. The Express + MongoDB backend integrates FACTURAPI for CFDI, Stripe, and WhatsApp notifications.",
  },
  facturalandia: {
    tagline:
      "Electronic invoicing platform (CFDI 4.0) for Mexico, built as a monorepo with an API and client apps.",
    description:
      "An electronic invoicing platform (CFDI 4.0) built as a TypeScript monorepo with an Express + MongoDB API and React + Vite apps. It integrates FACTURAPI for stamping, Firebase for auth and realtime notifications, Redis for caching, and Google Cloud Storage for PDFs and evidence.",
  },
  increscendo: {
    tagline:
      "Corporate site and admin panel for Increscendo, with blog, events, quotes and customer management.",
    description:
      "A website and admin platform built with Next.js for Increscendo: public pages (services, blog, events, FAQs) and an admin panel with customer management, event types and quotes. Backed by PostgreSQL with type-safe queries, admin lists powered by listkit, and AWS S3 storage.",
  },
  "portillo-y-young": {
    tagline:
      "Multilingual corporate site for Portillo y Young, with a portfolio and contact forms.",
    description:
      "A corporate website built with Next.js and React, featuring multilingual routing driven by a URL language segment. It includes services pages, a portfolio with per-project detail, and contact forms validated with Zod and protected by reCAPTCHA.",
  },
  listkit: {
    tagline:
      "A React library for standardized list views: table/cards, search, filters, pagination and theming from a single config.",
    description:
      "@pibytelabs/listkit is a React library that produces a complete list view (toolbar, table, cards, pagination and filters) from a single declarative config. It works with any data source (REST, Next.js server actions, IndexedDB or in-memory arrays) and ships URL sync, a built-in cache, and SSR support.",
  },
  "honeywell-internal": {
    tagline: "20+ internal automation solutions at Honeywell Intelligrated Chihuahua.",
    description:
      "Internal automation solutions with VBA macros and VB.NET, real-time metric dashboards via Oracle ERP, and ASP.NET MVC web apps with SQL Server. Apps not publicly hosted.",
  },
};

const experienceCopyEn: Record<string, string> = {
  "exp-corpfiscal":
    "Development of a corporate tax platform on an Express microservices architecture. 8 private apps: Legal, Clients, Materialization, Reception, HR, Admin, Landiabar and Visión Fiscal. Live presentation system with WebSockets, Excalidraw and YJS.",
  "exp-pibytelabs":
    "Full-stack architecture for clients in fintech, e-commerce, health and education. Built Facturalandia, CorpFiscal, Café Combate, Espau, Agates From Mexico, Danny Cuevas, Increscendo and Portillo y Young. Author of listkit.",
  "exp-sid":
    "Enterprise Java applications with a custom Struts-based framework. IoT integration via REST/HTTP APIs. Cross-platform communication modules for real-time inventory tracking. MySQL database management.",
  "exp-honeywell":
    "Professional internship. 20+ automation solutions with VBA macros and VB.NET scripts, reducing manual processes by 40%. Real-time metric dashboards via Oracle ERP integration. ASP.NET MVC web apps with SQL Server for enterprise resource tracking.",
};

export const getTagline = (p: Project, locale: string): string =>
  localized(locale, p.tagline, projectCopyEn[p.slug]?.tagline);

export const getDescription = (p: Project, locale: string): string =>
  localized(locale, p.description, projectCopyEn[p.slug]?.description);

export const getExperienceDescription = (e: Experience, locale: string): string =>
  localized(locale, e.description, experienceCopyEn[e.id]);
