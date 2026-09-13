import type { Project, ProjectLink, SubApp } from "@/types";
import { techList } from "./technologies";

/**
 * Static IDs are prepared for a future migration to Neon as PK. Spanish is the
 * source of truth; English copy lives in localize.ts. Thumbnails are local
 * paths; until real screenshots exist, ProjectCard renders a placeholder.
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
      "Suite web gratuita de fitness EN/ES: 17 calculadoras compartibles, base de conocimiento bilingüe y PWA con SEO server-first.",
    description:
      "Suite web gratuita de fitness, construida con Next.js 16 (App Router, React Server Components). Reúne 17 calculadoras de salud y entrenamiento —cada una con unidades métricas/imperiales, modo comparación y resultados compartibles por URL/QR con OG dinámica— y una base de conocimiento MDX bilingüe (~20 guías × 2 idiomas). Cuentas opcionales con Better Auth (email/Google/GitHub, historial, favoritos, sync), PWA instalable offline-capable, SEO server-first (JSON-LD, hreflang, OG dinámicas), admin dashboard con analytics y API de sync premium para la app móvil (push/pull, LWW, tombstones, cron de purge).",
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
      "Workout tracker offline-first con la UI dirigida por SQLite, widget Android headless y sync premium delta con la web.",
    description:
      "Workout tracker open-source construido con Expo (SDK 56) y React Native 0.85. Arquitectura offline-first: SQLite con Drizzle ORM es la única fuente de verdad y su `useLiveQuery` dirige la UI sin librería de estado global; MMKV cubre lecturas síncronas. Motor de sesión de entrenamiento, editor de programas/rutinas/días, 16 calculadoras, base de conocimiento con renderer Markdown propio, widget de home screen Android headless que lee SQLite sin UI, notificaciones locales con rest-timer y fotos de progreso 100% locales. Sync premium automática push→pull con delta sync, tombstones y backoff exponencial; OTA con EAS y 4 workflows de GitHub Actions. APK beta (v1.7.0) distribuido desde metri.info/download.",
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
      "Monorepo que opera todo el negocio de una cafetería multi-sucursal: 13 apps, offline-first y flujo completo de requisiciones.",
    description:
      "Monorepo TypeScript (36 workspaces: 13 apps desplegables, 12 módulos de dominio, 11 paquetes compartidos) que opera todo el negocio de una cafetería/retail multi-sucursal: almacén, compras, ventas, producción y facturación electrónica (CFDI/SAT con Facturapi + pdf-lib). Offline-first con Dexie 4/IndexedDB y sync opcional Dexie Cloud, multi-tenant via realmId, subidas con uploaderkit a GCS y flujo completo de requisiciones (requisición→cotización→autorización→órdenes de compra→recepción→pagos). Backend Express 5 + Drizzle + PostgreSQL, Redis, deploy multi-dyno en Heroku con CI en GitHub Actions.",
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
    tags: ["erp", "cfdi", "react", "offline-first", "multi-tenant"],
    technologies: techList(
      "react",
      "vite",
      "reactRouter",
      "typescript",
      "tailwind",
      "dexie",
      "node",
      "express",
      "drizzle",
      "postgres",
      "redis",
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
      "Sitio institucional y back office clínico para Esperanza para el Autismo I.A.P., con datos de salud de menores cifrados en reposo.",
    description:
      "Sitio institucional y back office clínico-administrativo para ESPAU, organización dedicada al diagnóstico y terapia del Trastorno del Espectro Autista. El sitio público cubre los 6 programas (ADOS-2/ADI-R/ABAS-II, terapia individual/grupal, preescolar DENVER, orientación a padres, formación profesional), donaciones y transparencia; el back office opera expedientes de alumnos, terapeutas, horarios, planeaciones semanales auto-generadas por cron, evaluaciones y audit log bajo RBAC. Los datos de salud de menores se cifran en reposo y solo se liberan en una ventana step-up TOTP. Auth.js v5 con TOTP obligatorio, pgtyped + zql, node-pg-migrate, listkit y Vercel crons.",
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
    tags: ["platform", "nextjs", "postgresql", "authjs", "healthcare"],
    technologies: techList("next", "typescript", "tailwind", "postgres", "authjs", "node"),
  },
  {
    id: "11111111-0000-0000-0000-000000000003",
    slug: "agates-from-mexico",
    title: "Agates From Mexico",
    tagline:
      "E-commerce de piezas únicas con storefront PWA, POS presencial con Stripe Terminal y búsqueda Spotlight sobre Postgres.",
    description:
      "Tienda en línea de piezas únicas (cada SKU es una pieza física con existencia 1) construida con Next.js App Router: storefront instalable como PWA (service worker que nunca cachea HTML), pagos online con Stripe y POS presencial card-present con Stripe Terminal, y panel administrativo con RBAC por catálogo de permisos. Cada producto expone dos URLs públicas (Publishing Rules configurables + link privado no-guessable), la búsqueda Spotlight corre sobre un read-model desnormalizado en Postgres (accent-insensitive, advisory locks) y la media sube validada en servidor directo a Backblaze B2. pgtyped + node-pg-migrate + zql, Cloudinary, PostHog, listkit en listas admin, Vercel.",
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
      "cloudinary",
      "posthog",
      "vercel",
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
      "Plataforma operativa interna de un despacho fiscal: 13 apps, expediente digital cifrado, 2FA y pizarra colaborativa en tiempo real.",
    description:
      "Monorepo TypeScript con 13 aplicaciones que operan un despacho fiscal: portal corporativo, portal self-service de clientes, expediente digital de RH, recepción, administración, PWA del snack bar y una pizarra colaborativa en tiempo real (Excalidraw + Yjs) para sesiones fiscales. Seguridad de base: 2FA/OTP obligatorio (speakeasy), RBAC fino (ADMIN, ACCOUNTANT, CUSTOMER, RH, BARISTA, SERVICE) y expediente digital con documentos cifrados. Dominio fiscal profundo: multipago CFDI, ciclo de cancelación SAT, CFDI de pago y scraping del SAT con Puppeteer. Backend Express 5 + MongoDB/Mongoose con JWT.",
    status: "production",
    visibility: "private",
    category: "platform",
    priority: true,
    loginRequired: true,
    thumbnail: "/images/projects/corporativo-fiscal-thumb.jpg",
    links: [
      { label: "Legal", url: "https://legal.corpfiscal.com.mx/", type: "admin", public: false },
    ],
    startDate: "2025-05",
    tags: ["platform", "microservicios", "express", "websockets", "cfdi"],
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
      "Plataforma SaaS de facturación electrónica CFDI 4.0, genuinamente multi-tenant por organizaciones, con auth in-house y sync en tiempo real.",
    description:
      "Plataforma de facturación electrónica (CFDI 4.0) genuinamente multi-tenant: cada organización opera con su propia llave de Facturapi cifrada AES-256-GCM, webhook firmado auto-registrado y buckets propios. Monorepo TypeScript (Turborepo) con 5 apps (api, auth con 2FA, invoicing, materialization read-only, purchases), dominios como vertical slices y 10 paquetes compartidos. Auth 100% in-house con argon2id, sync en tiempo real por webhooks firmados + SSE, ciclo de cancelación SAT completo, transacciones Mongo con replica set, backfill idempotente, spotlight search y jobs con logs por SSE. Node 22, React 19 + Vite 6, Express 5 + Mongoose, GCS, Stripe, Heroku.",
    status: "production",
    visibility: "private",
    category: "saas",
    priority: true,
    loginRequired: true,
    thumbnail: "/images/projects/facturalandia-thumb.jpg",
    links: [],
    startDate: "2025-03",
    tags: ["saas", "facturacion", "cfdi", "multi-tenant", "mongodb"],
    technologies: techList(
      "react",
      "vite",
      "node",
      "express",
      "mongodb",
      "facturapi",
      "gcs",
      "stripe",
      "typescript",
      "heroku",
    ),
  },
  {
    id: "11111111-0000-0000-0000-000000000008",
    slug: "increscendo",
    title: "Increscendo Eventos",
    tagline:
      "Sitio corporativo para Increscendo con blog, servicios y cotizador con PDF y catálogos SAT, más un panel administrativo.",
    description:
      "Sitio web para Increscendo centrado en la presencia pública: landing, servicios, blog, eventos y FAQs server-rendered para SEO, más un cotizador con generación de PDF y catálogos SAT. El panel administrativo gestiona clientes, tipos de evento y cotizaciones con listas listkit conectadas a server actions sobre SQL parametrizado (zql).",
    status: "production",
    visibility: "hybrid",
    category: "marketing",
    thumbnail: "/images/projects/increscendo-thumb.jpg",
    links: [{ label: "Sitio", url: "https://increscendoeventos.com/", type: "live", public: true }],
    startDate: "2025-01",
    tags: ["marketing", "eventos", "nextjs", "postgresql"],
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
      "Librería React para vistas de lista estandarizadas: 10 subpath exports tree-shakeables, filtros avanzados validados con Zod y exportación CSV byte-idéntica.",
    description:
      "@pibytelabs/listkit (v4.7.0) es una librería React que genera una vista de lista completa (toolbar, tabla, tarjetas, paginación y filtros) a partir de una única configuración declarativa, distribuida en 10 subpath exports tree-shakeables. Los filtros avanzados se validan con Zod, la exportación CSV tiene paridad byte-idéntica verificada contra MongoDB y PostgreSQL reales, e incluye i18n EN/ES, SSR y adapters (memory/fetch/serverAction/Dexie). CI con releases automatizados vía release-please.",
    status: "production",
    visibility: "public",
    category: "oss",
    thumbnail: "/images/projects/listkit-thumb.jpg",
    links: [
      {
        label: "npm",
        url: "https://www.npmjs.com/package/listkit",
        type: "npm",
        public: true,
      },
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
    tags: ["oss", "react", "library", "typescript", "npm"],
    technologies: techList("react", "typescript", "tailwind", "vite"),
  },
  {
    id: "11111111-0000-0000-0000-000000000015",
    slug: "uploaderkit",
    title: "uploaderkit",
    tagline:
      "Capa de subida de archivos full-stack para React y Node con contrato compartido cliente/servidor, hook headless y providers GCS/S3.",
    description:
      "@pibytelabs/uploaderkit es una capa de subida de archivos full-stack para React y Node: contrato compartido cliente/servidor con scopes declarativos, hook headless con validación por magic numbers, compresión de imágenes y retry/abort, providers GCS/S3, cifrado AES-256-GCM, adaptadores para Express y Next.js, e i18n EN/ES.",
    status: "production",
    visibility: "public",
    category: "oss",
    thumbnail: "/images/projects/uploaderkit-thumb.jpg",
    links: [
      {
        label: "npm",
        url: "https://www.npmjs.com/package/uploaderkit",
        type: "npm",
        public: true,
      },
      {
        label: "Repositorio",
        url: "https://github.com/Ricwolf19/uploaderkit",
        type: "repo",
        public: true,
      },
    ],
    repoUrl: "https://github.com/Ricwolf19/uploaderkit",
    startDate: "2026-08",
    tags: ["oss", "react", "library", "typescript", "npm"],
    technologies: techList("react", "typescript", "node", "express", "next", "awsS3", "gcs"),
  },
  // Internal / historical: shown in /about, never in /work or /now.
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
