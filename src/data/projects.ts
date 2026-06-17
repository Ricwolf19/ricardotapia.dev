import type { Project, ProjectLink, SubApp } from "@/types";
import { techList } from "./technologies";

/**
 * Preloaded data (spec §8). Static IDs prepared for a future migration to Neon
 * as PK. Spanish is the source of truth; English copy lives in localize.ts.
 * Thumbnails are local paths; until real screenshots exist, ProjectCard renders
 * a programmatic placeholder (spec §15.2).
 *
 * Links and monorepo apps carry a `public` flag so the case study can surface
 * what visitors can actually open and keep private (account-required) targets
 * clearly separated.
 */
export const projects: Project[] = [
  {
    id: "11111111-0000-0000-0000-000000000014",
    slug: "metri-info",
    title: "Metri Web",
    tagline:
      "Toolkit web open-source de fitness: 16 calculadoras, base de conocimiento bilingüe e instalación como PWA con SEO server-first.",
    description:
      "Companion web de la app móvil Metri, construido con Next.js 16 (App Router, React Server Components). Reúne 16 calculadoras de salud y entrenamiento, una base de conocimiento MDX bilingüe (EN/ES) y una capa de cuentas opcional. SEO server-first con Metadata API, JSON-LD, sitemap y OG dinámico; analítica con PostHog y GA4; instalable como PWA con calculadoras offline. Drizzle ORM + Neon y Better Auth respaldan las cuentas; el contenido se renderiza sin base de datos.",
    status: "production",
    visibility: "public",
    category: "platform",
    featured: true,
    thumbnail: "/images/projects/metri-info-thumb.jpg",
    links: [{ label: "Sitio", url: "https://metri.info", type: "live", public: true }],
    startDate: "2026-01",
    tags: ["platform", "nextjs", "pwa", "seo", "i18n", "open-source"],
    technologies: techList(
      "next",
      "react",
      "typescript",
      "tailwind",
      "drizzle",
      "neon",
      "betterAuth",
      "posthog",
      "resend",
    ),
  },
  {
    id: "11111111-0000-0000-0000-000000000013",
    slug: "metri",
    title: "Metri",
    tagline:
      "App móvil de fitness offline-first para registrar entrenamiento y métricas corporales, con la UI dirigida directamente por SQLite.",
    description:
      "Aplicación móvil open-source construida con Expo (SDK 56) y React Native. Arquitectura offline-first: SQLite con Drizzle ORM es la única fuente de verdad y su `useLiveQuery` dirige la UI sin librería de estado global; MMKV cubre lecturas síncronas de ajustes. Incluye autenticación local cifrada, perfiles con cálculo de BMR/TDEE, recordatorios con notificaciones, galería de fotos de progreso, i18n EN/ES y temas claro/oscuro mediante tokens de diseño. Migraciones automáticas con Drizzle Kit en cada arranque.",
    status: "development",
    visibility: "public",
    category: "oss",
    featured: true,
    thumbnail: "/images/projects/metri-thumb.jpg",
    links: [
      {
        label: "Repositorio",
        url: "https://github.com/Ricwolf19/metri",
        type: "repo",
        public: true,
      },
    ],
    repoUrl: "https://github.com/Ricwolf19/metri",
    startDate: "2025-09",
    tags: ["oss", "react-native", "expo", "offline-first", "mobile"],
    technologies: techList(
      "reactNative",
      "expo",
      "typescript",
      "drizzle",
      "sqlite",
      "nativewind",
      "mmkv",
    ),
  },
  {
    id: "11111111-0000-0000-0000-000000000001",
    slug: "cafe-combate",
    title: "Café Combate",
    tagline:
      "Monorepo de gestión operativa para Café Combate: almacén, facturación CFDI, ventas y producción en un solo ecosistema.",
    description:
      "Monorepo TypeScript que unifica más de diez aplicaciones y módulos compartidos para operar almacén, facturación electrónica (CFDI/SAT), ventas, compras, producción y administración. Construido con React, Vite y React Router sobre Yarn Workspaces y Turborepo, con sincronización local mediante Dexie.",
    status: "production",
    visibility: "hybrid",
    category: "erp",
    featured: true,
    thumbnail: "/images/projects/cafe-combate-thumb.jpg",
    links: [
      {
        label: "Landing",
        url: "https://landing-ecommerce-henna.vercel.app/",
        type: "landing",
        public: true,
      },
    ],
    startDate: "2024-01",
    launchDate: "2024-06",
    tags: ["erp", "cfdi", "react", "vite", "tailwind", "offline-sync"],
    technologies: techList(
      "react",
      "vite",
      "reactRouter",
      "typescript",
      "tailwind",
      "dexie",
      "heroku",
    ),
    isMonorepo: true,
    workspaceTool: "yarn",
    apps: [
      {
        name: "Almacén",
        slug: "almacen",
        description: "Control de inventario y existencias.",
        url: "https://almacen.cafecombate.mx",
        status: "production",
        features: ["Inventario en tiempo real", "Movimientos de stock"],
        public: false,
      },
      {
        name: "Compras",
        slug: "compras",
        description: "Gestión de órdenes de compra a proveedores.",
        url: "https://compras.cafecombate.mx",
        status: "production",
        features: ["Órdenes de compra", "Proveedores"],
        public: false,
      },
      {
        name: "Producción",
        slug: "produccion",
        description: "Tostado y control de lotes de producción.",
        url: "https://produccion.cafecombate.mx",
        status: "production",
        features: ["Lotes de tostado", "Trazabilidad"],
        public: false,
      },
      {
        name: "Ventas",
        slug: "ventas",
        description: "Punto de venta y gestión comercial.",
        url: "https://ventas.cafecombate.mx",
        status: "production",
        features: ["POS", "Reportes de venta"],
        public: false,
      },
      {
        name: "Facturación",
        slug: "facturacion",
        description: "Facturación electrónica CFDI 4.0 SAT.",
        url: "https://facturacion.cafecombate.mx",
        status: "production",
        features: ["CFDI 4.0", "Timbrado SAT"],
        public: false,
      },
      {
        name: "Pagos",
        slug: "pagos",
        description: "Conciliación y registro de pagos.",
        url: "https://pagos.cafecombate.mx",
        status: "production",
        features: ["Conciliación", "Cuentas por cobrar"],
        public: false,
      },
      {
        name: "Admin",
        slug: "admin",
        description: "Administración central y configuración.",
        url: "https://admin.cafecombate.mx",
        status: "production",
        features: ["Configuración", "Usuarios", "Roles"],
        public: false,
      },
      {
        name: "Auth",
        slug: "auth",
        description: "Autenticación y autorización centralizada.",
        url: "https://auth.cafecombate.mx",
        status: "production",
        features: ["SSO", "Roles y permisos"],
        public: false,
      },
    ],
    infrastructure: {
      deployment: "Heroku + Vercel",
      ciCd: "GitHub Actions",
      environments: ["production", "staging"],
    },
  },
  {
    id: "11111111-0000-0000-0000-000000000002",
    slug: "espau",
    title: "Espau",
    tagline:
      "Sitio institucional y plataforma administrativa para Esperanza para el Autismo I.A.P. (ESPAU) en Chihuahua.",
    description:
      "Sitio web institucional y panel administrativo para ESPAU, organización civil dedicada al diagnóstico y terapia del Trastorno del Espectro Autista. Construido con Next.js (App Router), PostgreSQL con consultas tipadas y autenticación con Auth.js.",
    status: "production",
    visibility: "hybrid",
    category: "platform",
    featured: true,
    thumbnail: "/images/projects/espau-thumb.jpg",
    links: [
      { label: "Sitio", url: "https://espau.com/", type: "live", public: true },
      { label: "Admin", url: "https://app-espau.vercel.app/", type: "admin", public: false },
    ],
    startDate: "2024-09",
    tags: ["platform", "nextjs", "postgresql", "authjs", "tailwind"],
    technologies: techList("next", "typescript", "tailwind", "postgres", "authjs", "node"),
  },
  {
    id: "11111111-0000-0000-0000-000000000003",
    slug: "agates-from-mexico",
    title: "Agates From Mexico",
    tagline:
      "Plataforma de e-commerce a medida para Agates From Mexico, con tienda, panel administrativo y control de acceso por roles.",
    description:
      "Tienda en línea completa construida con Next.js: catálogo, carrito, pagos con Stripe y PayPal, envíos vía ShipStation y un panel administrativo con control de acceso por roles. Usa PostgreSQL con consultas tipadas e integra Cloudinary, Redis, Resend y PostHog.",
    status: "production",
    visibility: "public",
    category: "ecommerce",
    featured: true,
    thumbnail: "/images/projects/agates-from-mexico-thumb.jpg",
    links: [{ label: "Tienda", url: "https://agatesfrommexico.com/", type: "live", public: true }],
    startDate: "2024-08",
    tags: ["ecommerce", "nextjs", "stripe", "rbac", "postgresql"],
    technologies: techList(
      "next",
      "typescript",
      "tailwind",
      "postgres",
      "stripe",
      "paypal",
      "redis",
      "cloudinary",
      "resend",
    ),
  },
  {
    id: "11111111-0000-0000-0000-000000000004",
    slug: "danny-cuevas",
    title: "Danny Cuevas",
    tagline: "Portafolio fotográfico con panel administrativo para gestión de álbumes e imágenes.",
    description:
      "Sitio de portafolio para el fotógrafo Daniel Cuevas, con páginas públicas de portafolio y contacto más un panel administrativo para gestionar álbumes e imágenes. Construido con Next.js, PostgreSQL con tipado generado y subida de imágenes a AWS S3.",
    status: "production",
    visibility: "public",
    category: "marketing",
    thumbnail: "/images/projects/danny-cuevas-thumb.jpg",
    links: [{ label: "Sitio", url: "https://www.dannycuevas.com/", type: "live", public: true }],
    startDate: "2024-07",
    tags: ["portfolio", "nextjs", "postgresql", "aws-s3"],
    technologies: techList(
      "next",
      "typescript",
      "tailwind",
      "postgres",
      "authjs",
      "awsS3",
      "resend",
    ),
  },
  {
    id: "11111111-0000-0000-0000-000000000005",
    slug: "chachitos",
    title: "Chachitos",
    tagline: "Sitio web institucional de Chachitos, con localizador de tiendas en Google Maps.",
    description:
      "Sitio web de Chachitos, empresa mexicana de cereales de trigo inflado con más de 70 años de tradición. Construido con Next.js y React, incluye páginas institucionales y un localizador de tiendas sobre Google Maps con cálculo de distancia.",
    status: "production",
    visibility: "public",
    category: "marketing",
    thumbnail: "/images/projects/chachitos-thumb.jpg",
    links: [
      { label: "Sitio", url: "https://webpage-indol-five.vercel.app/", type: "live", public: true },
    ],
    startDate: "2024-05",
    tags: ["marketing", "nextjs", "google-maps", "tailwind"],
    technologies: techList("next", "react", "typescript", "tailwind", "resend"),
  },
  {
    id: "11111111-0000-0000-0000-000000000006",
    slug: "corporativo-fiscal",
    title: "Corporativo Fiscal",
    tagline:
      "Suite fiscal multi-app para un corporativo contable: facturación CFDI, recepción, RH y herramientas colaborativas.",
    description:
      "Monorepo TypeScript que agrupa varias aplicaciones para un despacho fiscal: portal web, autenticación, administración, atención a clientes, recepción, recursos humanos y un módulo de pizarra colaborativa. El backend en Express + MongoDB integra FACTURAPI para CFDI, Stripe y notificaciones por WhatsApp.",
    status: "production",
    visibility: "private",
    category: "saas",
    priority: true,
    loginRequired: true,
    thumbnail: "/images/projects/corporativo-fiscal-thumb.jpg",
    links: [
      { label: "Legal", url: "https://legal.corpfiscal.com.mx/", type: "admin", public: false },
    ],
    startDate: "2025-05",
    tags: ["saas", "microservicios", "express", "websockets", "cfdi"],
    technologies: techList(
      "node",
      "express",
      "react",
      "vite",
      "mongodb",
      "socketio",
      "facturapi",
      "stripe",
      "excalidraw",
      "yjs",
    ),
    isMonorepo: true,
    workspaceTool: "yarn",
    apps: [
      {
        name: "Legal",
        slug: "legal",
        description: "Gestión de servicios legales y expedientes.",
        url: "https://legal.corpfiscal.com.mx/",
        status: "production",
        features: ["Expedientes", "Documentos"],
        public: false,
      },
      {
        name: "Clientes",
        slug: "customers",
        description: "Atención y seguimiento de clientes.",
        url: "https://clientes.corpfiscal.com.mx/",
        status: "production",
        features: ["CRM", "Seguimiento"],
        public: false,
      },
      {
        name: "Recepción",
        slug: "reception",
        description: "Recepción y control de documentos.",
        url: "https://recepcion.corpfiscal.com.mx/",
        status: "production",
        features: ["Documentos entrantes"],
        public: false,
      },
      {
        name: "RH",
        slug: "rh",
        description: "Recursos humanos.",
        url: "https://rh.corpfiscal.com.mx/",
        status: "production",
        features: ["Nómina", "Personal"],
        public: false,
      },
      {
        name: "Materialización",
        slug: "materialization",
        description: "Materialización de operaciones.",
        url: "https://materializacion.corpfiscal.com.mx/",
        status: "production",
        features: ["Operaciones"],
        public: false,
      },
      {
        name: "Visión Fiscal",
        slug: "visionfiscal",
        description: "Pizarra colaborativa en tiempo real con Excalidraw y Yjs.",
        url: "https://visionfiscal.corpfiscal.com.mx/",
        status: "production",
        features: ["Tiempo real (Socket.io)", "Excalidraw", "Yjs CRDT"],
        public: false,
      },
      {
        name: "Landiabar",
        slug: "landiabar",
        description: "Módulo Landiabar del corporativo.",
        url: "https://landiabar.corpfiscal.com.mx/",
        status: "production",
        features: ["Módulo especializado"],
        public: false,
      },
      {
        name: "Admin",
        slug: "admin",
        description: "Administración central y configuración.",
        url: "https://admin.corpfiscal.com.mx/",
        status: "production",
        features: ["Configuración", "Usuarios"],
        public: false,
      },
    ],
    infrastructure: {
      deployment: "Vercel + VPS",
      ciCd: "GitHub Actions",
      environments: ["production", "staging"],
    },
  },
  {
    id: "11111111-0000-0000-0000-000000000007",
    slug: "facturalandia",
    title: "Facturalandia",
    tagline:
      "Plataforma de facturación electrónica CFDI 4.0 para México, en monorepo con API y apps de cliente.",
    description:
      "Plataforma de facturación electrónica (CFDI 4.0) construida como monorepo TypeScript con una API en Express + MongoDB y apps en React + Vite. Integra FACTURAPI para timbrado, Firebase para autenticación y notificaciones en tiempo real, Redis para caché y Google Cloud Storage para PDFs y evidencias.",
    status: "production",
    visibility: "private",
    category: "saas",
    priority: true,
    loginRequired: true,
    thumbnail: "/images/projects/facturalandia-thumb.jpg",
    links: [],
    startDate: "2025-03",
    tags: ["saas", "facturacion", "cfdi", "mongodb", "firebase"],
    technologies: techList(
      "react",
      "vite",
      "node",
      "express",
      "mongodb",
      "firebase",
      "redis",
      "facturapi",
      "gcs",
      "typescript",
    ),
  },
  {
    id: "11111111-0000-0000-0000-000000000008",
    slug: "increscendo",
    title: "Increscendo Eventos",
    tagline:
      "Sitio corporativo y panel administrativo para Increscendo, con blog, eventos, cotizaciones y gestión de clientes.",
    description:
      "Sitio web y plataforma administrativa construidos con Next.js para Increscendo: páginas públicas (servicios, blog, eventos, FAQs) y un panel con gestión de clientes, tipos de evento y cotizaciones. Usa PostgreSQL con consultas tipadas, listas administrativas con listkit y almacenamiento en AWS S3.",
    status: "production",
    visibility: "hybrid",
    category: "platform",
    thumbnail: "/images/projects/increscendo-thumb.jpg",
    links: [{ label: "Sitio", url: "https://increscendoeventos.com/", type: "live", public: true }],
    startDate: "2025-01",
    tags: ["platform", "eventos", "nextjs", "postgresql"],
    technologies: techList(
      "next",
      "typescript",
      "tailwind",
      "postgres",
      "authjs",
      "awsS3",
      "resend",
    ),
  },
  {
    id: "11111111-0000-0000-0000-000000000009",
    slug: "portillo-y-young",
    title: "Portillo y Young",
    tagline:
      "Sitio corporativo multilingüe para Portillo y Young, con portafolio y formularios de contacto.",
    description:
      "Sitio web corporativo construido con Next.js y React, con enrutamiento multilingüe e idioma por segmento de URL. Incluye páginas de servicios, portafolio con detalle por proyecto y formularios de contacto validados con Zod y protegidos por reCAPTCHA.",
    status: "production",
    visibility: "public",
    category: "marketing",
    thumbnail: "/images/projects/portillo-y-young-thumb.jpg",
    links: [{ label: "Sitio", url: "https://portilloyyoung.com/en", type: "live", public: true }],
    startDate: "2024-11",
    tags: ["marketing", "multilingual", "nextjs"],
    technologies: techList("next", "react", "typescript", "tailwind", "resend"),
  },
  {
    id: "11111111-0000-0000-0000-000000000010",
    slug: "listkit",
    title: "listkit",
    tagline:
      "Librería React para vistas de lista estandarizadas: tabla/tarjetas, búsqueda, filtros, paginación y theming desde una sola config.",
    description:
      "@pibytelabs/listkit es una librería React que genera una vista de lista completa (toolbar, tabla, tarjetas, paginación y filtros) a partir de una única configuración declarativa. Funciona con cualquier fuente de datos (REST, server actions de Next.js, IndexedDB o arrays en memoria) e incluye sincronización con la URL, caché integrada y SSR.",
    status: "production",
    visibility: "public",
    category: "oss",
    thumbnail: "/images/projects/listkit-thumb.jpg",
    links: [
      {
        label: "Repositorio",
        url: "https://github.com/Ricwolf19/listkit",
        type: "repo",
        public: true,
      },
    ],
    repoUrl: "https://github.com/Ricwolf19/listkit",
    startDate: "2025-02",
    launchDate: "2025-04",
    tags: ["oss", "react", "library", "typescript"],
    technologies: techList("react", "typescript", "tailwind", "vite"),
  },
  // Internal / historical (spec §8). Shown in /about, not in /work or /now.
  {
    id: "11111111-0000-0000-0000-000000000012",
    slug: "honeywell-internal",
    title: "Honeywell — Proyectos Internos",
    tagline: "20+ soluciones de automatización internas en Honeywell Intelligrated Chihuahua.",
    description:
      "Soluciones internas de automatización con VBA macros y VB.NET, paneles de métricas en tiempo real vía Oracle ERP y aplicaciones web ASP.NET MVC con SQL Server. Apps no hosteadas públicamente.",
    status: "internal",
    visibility: "private",
    category: "saas",
    thumbnail: "/images/projects/honeywell-internal-thumb.jpg",
    links: [],
    startDate: "2024-05",
    launchDate: "2025-05",
    tags: ["automation", "vba", "vbnet", "aspnet"],
    technologies: techList("vba", "vbnet", "oracleErp", "aspnet", "sqlServer", "powerAutomate"),
  },
];

// ============================================
// Derived selectors (reuse across pages)
// ============================================

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

/** Whether a link can be opened by anyone (admin links are private by default). */
export const isPublicLink = (link: ProjectLink): boolean => link.public ?? link.type !== "admin";

/** Whether a monorepo app is publicly reachable (private by default). */
export const isPublicApp = (app: SubApp): boolean => app.public ?? false;

/** Links split into public-first / private groups for the case study. */
export const splitLinks = (links: ProjectLink[]) => ({
  publicLinks: links.filter(isPublicLink),
  privateLinks: links.filter((l) => !isPublicLink(l)),
});

/** Monorepo apps split into public-first / private groups for the case study. */
export const splitApps = (apps: SubApp[]) => ({
  publicApps: apps.filter(isPublicApp),
  privateApps: apps.filter((a) => !isPublicApp(a)),
});

/**
 * Public, visitable URL of a project (landing or live site). Client apps that
 * require login do not expose a public URL -> returns undefined.
 */
export const getLiveUrl = (p: Project): string | undefined => {
  if (p.loginRequired) return undefined;
  return (
    p.links.find((l) => l.type === "landing" && isPublicLink(l))?.url ??
    p.links.find((l) => l.type === "live" && isPublicLink(l))?.url
  );
};

/**
 * Any URL a visitor can open without an account, with its kind: a live/landing
 * site first, otherwise a public source repository. Returns undefined for
 * login-gated client apps. Used to surface only quickly-viewable work.
 */
export const getPublicUrl = (p: Project): { url: string; kind: "live" | "repo" } | undefined => {
  const live = getLiveUrl(p);
  if (live) return { url: live, kind: "live" };
  if (p.loginRequired) return undefined;
  const repo = p.links.find((l) => l.type === "repo" && isPublicLink(l))?.url ?? p.repoUrl;
  return repo ? { url: repo, kind: "repo" } : undefined;
};

/**
 * Projects visible in /work (excludes internal/historical).
 * Priority projects first (highlighted client apps), the rest after.
 */
export const workProjects = [...projects.filter((p) => p.status !== "internal")].sort(
  (a, b) => Number(Boolean(b.priority)) - Number(Boolean(a.priority)),
);

/**
 * Featured projects (Home). Explicit order defined by Ricardo. Only projects a
 * visitor can open right now — a live site or a public repo — so the homepage
 * showcases work that can be inspected immediately. Each entry is sanity-checked
 * to actually expose a public URL.
 */
const FEATURED_ORDER = [
  "metri-info",
  "cafe-combate",
  "espau",
  "agates-from-mexico",
  "increscendo",
  "listkit",
  "danny-cuevas",
  "chachitos",
  "portillo-y-young",
] as const;

export const featuredProjects: Project[] = FEATURED_ORDER.map(getProjectBySlug).filter(
  (p): p is Project => Boolean(p) && Boolean(getPublicUrl(p as Project)),
);

/** In-progress projects for /now. */
const NOW_ORDER = [
  "metri",
  "metri-info",
  "cafe-combate",
  "agates-from-mexico",
  "corporativo-fiscal",
  "increscendo",
  "facturalandia",
] as const;

export const nowProjects: Project[] = NOW_ORDER.map(getProjectBySlug).filter((p): p is Project =>
  Boolean(p),
);

/** Slugs with a navigable case study (excludes internal projects without a public page). */
export const projectSlugs = workProjects.map((p) => p.slug);
