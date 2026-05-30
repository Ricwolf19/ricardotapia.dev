import type { Project, Experience } from "@/types";
import { localized } from "@/lib/utils";

/**
 * Traducciones al inglés del copy de proyectos y experiencia.
 * El español vive en projects.ts / experience.ts (fuente base); aquí solo el
 * override en inglés, keyed por slug / id. Mantiene el array de datos limpio.
 */
const projectCopyEn: Record<string, { tagline: string; description: string }> = {
  "cafe-combate": {
    tagline:
      "13-app ERP for a coffee roaster: CFDI invoicing, warehouse, production and public store.",
    description:
      "Comprehensive monorepo-style system with 13 independently deployed apps: warehouse, purchasing, production, sales, CFDI 4.0 invoicing, payments and a public store, with offline-first sync.",
  },
  espau: {
    tagline: "Management platform with an admin panel and a public site.",
    description:
      "Platform with an admin dashboard deployed on Vercel and an associated public site. Modern full-stack architecture.",
  },
  "agates-from-mexico": {
    tagline: "E-commerce for Mexican agates and minerals, with catalog and checkout.",
    description:
      "Online store for Mexican agates and minerals, with a product catalog, cart and an optimized buying experience.",
  },
  "danny-cuevas": {
    tagline: "Personal brand site and digital presence.",
    description: "Marketing and personal-brand site with custom design and a conversion focus.",
  },
  chachitos: {
    tagline: "Marketing website with custom design.",
    description: "Landing and marketing site with a tailor-made design.",
  },
  "corporativo-fiscal": {
    tagline: "Corporate tax platform in microservices: 8 private apps and live presentations.",
    description:
      "Tax platform on an Express microservices architecture with 8 apps: Legal, Clients, Materialization, Reception, HR, Admin, Landiabar and Visión Fiscal. Includes a live presentation system with WebSockets, Excalidraw and YJS.",
  },
  facturalandia: {
    tagline: "White-label invoicing SaaS (Sonolife).",
    description: "White-label electronic-invoicing SaaS for Sonolife. Private project.",
  },
  increscendo: {
    tagline: "Event management platform.",
    description: "Platform for organizing and managing events.",
  },
  "portillo-y-young": {
    tagline: "Institutional / marketing site.",
    description: "Institutional site focused on a professional presence.",
  },
  listkit: {
    tagline: "Open-source list utilities package, published on npm.",
    description:
      "Open-source utility library for working with lists and collections, published under @pibytelabs on npm.",
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
