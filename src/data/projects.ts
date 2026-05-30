import type { Project } from "@/types";
import { techList } from "./technologies";

/**
 * Datos precargados (spec §8). IDs estáticos preparados para futura
 * migración a Neon como PK. Thumbnails son rutas locales; mientras no
 * existan screenshots reales, ProjectCard renderiza un placeholder
 * programático (spec §15.2).
 */
export const projects: Project[] = [
  {
    id: "11111111-0000-0000-0000-000000000001",
    slug: "cafe-combate",
    title: "Café Combate",
    tagline:
      "ERP de 13 aplicaciones para tostador de café con facturación CFDI, almacén, producción y tienda pública.",
    description:
      "Sistema integral tipo monorepo con 13 aplicaciones desplegadas de forma independiente: almacén, compras, producción, ventas, facturación CFDI 4.0, pagos y tienda pública, con sincronización offline-first.",
    status: "production",
    visibility: "hybrid",
    category: "erp",
    featured: true,
    thumbnail: "/images/projects/cafe-combate-thumb.jpg",
    links: [
      { label: "Landing", url: "https://landing-ecommerce-henna.vercel.app/", type: "landing" },
      { label: "Almacén", url: "https://almacen.cafecombate.mx", type: "admin" },
      { label: "Tienda", url: "https://publico.cafecombate.mx", type: "live" },
    ],
    startDate: "2024-01",
    launchDate: "2024-06",
    tags: ["erp", "cfdi", "react", "vite", "tailwind", "offline-sync"],
    technologies: techList("react", "vite", "dexie", "heroku", "tailwind"),
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
      },
      {
        name: "Compras",
        slug: "compras",
        description: "Gestión de órdenes de compra a proveedores.",
        url: "https://compras.cafecombate.mx",
        status: "production",
        features: ["Órdenes de compra", "Proveedores"],
      },
      {
        name: "Producción",
        slug: "produccion",
        description: "Tostado y control de lotes de producción.",
        url: "https://produccion.cafecombate.mx",
        status: "production",
        features: ["Lotes de tostado", "Trazabilidad"],
      },
      {
        name: "Ventas",
        slug: "ventas",
        description: "Punto de venta y gestión comercial.",
        url: "https://ventas.cafecombate.mx",
        status: "production",
        features: ["POS", "Reportes de venta"],
      },
      {
        name: "Facturación",
        slug: "facturacion",
        description: "Facturación electrónica CFDI 4.0 SAT.",
        url: "https://facturacion.cafecombate.mx",
        status: "production",
        features: ["CFDI 4.0", "Timbrado SAT"],
      },
      {
        name: "Pagos",
        slug: "pagos",
        description: "Conciliación y registro de pagos.",
        url: "https://pagos.cafecombate.mx",
        status: "production",
        features: ["Conciliación", "Cuentas por cobrar"],
      },
      {
        name: "Tienda pública",
        slug: "publico",
        description: "E-commerce de cara al cliente.",
        url: "https://publico.cafecombate.mx",
        status: "production",
        features: ["Catálogo", "Carrito", "Checkout"],
      },
      {
        name: "Auth",
        slug: "auth",
        description: "Autenticación y autorización centralizada.",
        url: "https://auth.cafecombate.mx",
        status: "production",
        features: ["SSO", "Roles y permisos"],
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
    tagline: "Plataforma de gestión con panel administrativo y sitio público.",
    description:
      "Plataforma con panel administrativo desplegado en Vercel y sitio público asociado. Arquitectura moderna full-stack.",
    status: "production",
    visibility: "hybrid",
    category: "platform",
    featured: true,
    thumbnail: "/images/projects/espau-thumb.jpg",
    links: [
      { label: "Sitio", url: "https://www.espau.com/", type: "live" },
      { label: "Admin", url: "https://app-espau.vercel.app/", type: "admin" },
    ],
    startDate: "2024-09",
    tags: ["platform", "react", "nextjs", "tailwind"],
    technologies: techList("next", "react", "typescript", "tailwind", "node"),
  },
  {
    id: "11111111-0000-0000-0000-000000000003",
    slug: "agates-from-mexico",
    title: "Agates From Mexico",
    tagline: "E-commerce de ágatas y minerales mexicanos con catálogo y checkout.",
    description:
      "Tienda en línea para venta de ágatas y minerales mexicanos, con catálogo de productos, carrito y experiencia de compra optimizada.",
    status: "production",
    visibility: "public",
    category: "ecommerce",
    featured: true,
    thumbnail: "/images/projects/agates-from-mexico-thumb.jpg",
    links: [{ label: "Tienda", url: "https://agatesfrommexico.com/", type: "live" }],
    startDate: "2024-08",
    tags: ["ecommerce", "react", "nextjs", "tailwind"],
    technologies: techList("next", "react", "typescript", "tailwind"),
  },
  {
    id: "11111111-0000-0000-0000-000000000004",
    slug: "danny-cuevas",
    title: "Danny Cuevas",
    tagline: "Sitio de marca personal y presencia digital.",
    description: "Sitio de marketing y marca personal con diseño a medida y enfoque en conversión.",
    status: "production",
    visibility: "public",
    category: "marketing",
    thumbnail: "/images/projects/danny-cuevas-thumb.jpg",
    links: [{ label: "Sitio", url: "https://www.dannycuevas.com/", type: "live" }],
    startDate: "2024-07",
    tags: ["marketing", "nextjs", "tailwind"],
    technologies: techList("next", "react", "tailwind"),
  },
  {
    id: "11111111-0000-0000-0000-000000000005",
    slug: "chachitos",
    title: "Chachitos",
    tagline: "Sitio web de marketing con diseño a medida.",
    description: "Landing y sitio de marketing con diseño personalizado.",
    status: "production",
    visibility: "public",
    category: "marketing",
    thumbnail: "/images/projects/chachitos-thumb.jpg",
    links: [{ label: "Sitio", url: "https://webpage-indol-five.vercel.app/", type: "live" }],
    startDate: "2024-05",
    tags: ["marketing", "react", "tailwind"],
    technologies: techList("react", "tailwind", "vercel"),
  },
  {
    id: "11111111-0000-0000-0000-000000000006",
    slug: "corporativo-fiscal",
    title: "Corporativo Fiscal",
    tagline:
      "Plataforma fiscal corporativa en microservicios con 8 aplicaciones privadas y presentaciones live.",
    description:
      "Plataforma fiscal en arquitectura de microservicios Express con 8 aplicaciones: Legal, Clientes, Materialización, Recepción, RH, Admin, Landiabar y Visión Fiscal. Incluye sistema de presentaciones live con WebSockets, Excalidraw y YJS.",
    status: "production",
    visibility: "private",
    category: "saas",
    priority: true,
    loginRequired: true,
    thumbnail: "/images/projects/corporativo-fiscal-thumb.jpg",
    links: [{ label: "Legal", url: "https://legal.corpfiscal.com.mx/", type: "admin" }],
    startDate: "2025-05",
    tags: ["saas", "microservicios", "express", "websockets"],
    technologies: techList(
      "node",
      "express",
      "react",
      "vite",
      "mongodb",
      "websockets",
      "yjs",
      "excalidraw",
    ),
    isMonorepo: true,
    workspaceTool: "npm",
    apps: [
      {
        name: "Legal",
        slug: "legal",
        description: "Gestión de servicios legales.",
        url: "https://legal.corpfiscal.com.mx/",
        status: "production",
        features: ["Expedientes", "Documentos"],
      },
      {
        name: "Clientes",
        slug: "clientes",
        description: "CRM de clientes corporativos.",
        status: "production",
        features: ["CRM", "Seguimiento"],
      },
      {
        name: "Materialización",
        slug: "materializacion",
        description: "Materialización de operaciones.",
        status: "production",
        features: ["Operaciones"],
      },
      {
        name: "Recepción",
        slug: "recepcion",
        description: "Recepción y control de documentos.",
        status: "production",
        features: ["Documentos entrantes"],
      },
      {
        name: "RH",
        slug: "rh",
        description: "Recursos humanos.",
        status: "production",
        features: ["Nómina", "Personal"],
      },
      {
        name: "Admin",
        slug: "admin",
        description: "Administración central.",
        status: "production",
        features: ["Configuración", "Usuarios"],
      },
      {
        name: "Landiabar",
        slug: "landiabar",
        description: "Módulo Landiabar.",
        status: "production",
        features: ["Módulo especializado"],
      },
      {
        name: "Visión Fiscal",
        slug: "vision-fiscal",
        description: "Presentaciones live fiscales.",
        status: "production",
        features: ["Live con WebSockets", "Excalidraw", "YJS"],
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
    tagline: "SaaS de facturación white-label (Sonolife).",
    description:
      "Solución SaaS de facturación electrónica en modelo white-label para Sonolife. Proyecto privado.",
    status: "production",
    visibility: "private",
    category: "saas",
    priority: true,
    loginRequired: true,
    thumbnail: "/images/projects/facturalandia-thumb.jpg",
    links: [],
    startDate: "2025-03",
    tags: ["saas", "facturacion", "white-label"],
    technologies: techList("next", "react", "typescript", "node", "postgres"),
  },
  {
    id: "11111111-0000-0000-0000-000000000008",
    slug: "increscendo",
    title: "Increscendo Eventos",
    tagline: "Plataforma para gestión de eventos.",
    description: "Plataforma para organización y gestión de eventos.",
    status: "production",
    visibility: "private",
    category: "platform",
    thumbnail: "/images/projects/increscendo-thumb.jpg",
    links: [{ label: "Sitio", url: "https://increscendoeventos.com/", type: "live" }],
    startDate: "2025-01",
    tags: ["platform", "eventos", "nextjs"],
    technologies: techList("next", "react", "typescript", "tailwind"),
  },
  {
    id: "11111111-0000-0000-0000-000000000009",
    slug: "portillo-y-young",
    title: "Portillo y Young",
    tagline: "Sitio institucional / de marketing.",
    description: "Sitio institucional con enfoque en presencia profesional.",
    status: "production",
    visibility: "private",
    category: "marketing",
    thumbnail: "/images/projects/portillo-y-young-thumb.jpg",
    links: [{ label: "Sitio", url: "https://portilloyyoung.com/en", type: "live" }],
    startDate: "2024-11",
    tags: ["marketing", "institucional"],
    technologies: techList("next", "react", "tailwind"),
  },
  {
    id: "11111111-0000-0000-0000-000000000010",
    slug: "listkit",
    title: "listkit",
    tagline: "Paquete open source de utilidades para listas, publicado en npm.",
    description:
      "Librería open source de utilidades para manipulación de listas y colecciones, publicada bajo @pibytelabs en npm.",
    status: "production",
    visibility: "public",
    category: "oss",
    thumbnail: "/images/projects/listkit-thumb.jpg",
    links: [
      { label: "npm", url: "https://www.npmjs.com/package/@pibytelabs/listkit", type: "npm" },
    ],
    startDate: "2025-02",
    tags: ["oss", "typescript", "npm"],
    technologies: techList("typescript", "node"),
  },
  // Interno / histórico (spec §8). Se muestra en /about, no en /work ni /now.
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
// Derived selectors (reutilizar en páginas)
// ============================================

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

/**
 * URL pública visitable de un proyecto (landing o sitio live). Las apps de
 * cliente con login NO exponen URL pública -> devuelve undefined.
 */
export const getLiveUrl = (p: Project): string | undefined => {
  if (p.loginRequired) return undefined;
  return (
    p.links.find((l) => l.type === "landing")?.url ?? p.links.find((l) => l.type === "live")?.url
  );
};

/**
 * Proyectos visibles en /work (excluye internos/históricos).
 * Prioritarios primero (apps de cliente destacadas), resto después.
 */
export const workProjects = [...projects.filter((p) => p.status !== "internal")].sort(
  (a, b) => Number(Boolean(b.priority)) - Number(Boolean(a.priority)),
);

/**
 * Proyectos RECIENTES con landing pública visitable (Home).
 * Orden explícito definido por Ricardo. Se priorizan las landings que
 * cualquier visitante puede abrir sin cuenta.
 */
const RECENT_ORDER = [
  "cafe-combate",
  "espau",
  "increscendo",
  "danny-cuevas",
  "chachitos",
  "agates-from-mexico",
  "portillo-y-young",
] as const;

export const recentProjects: Project[] = RECENT_ORDER.map(getProjectBySlug).filter(
  (p): p is Project => Boolean(p),
);

/** Proyectos en curso (in-progress) para /now. */
const NOW_ORDER = [
  "cafe-combate",
  "agates-from-mexico",
  "corporativo-fiscal",
  "increscendo",
  "facturalandia",
] as const;

export const nowProjects: Project[] = NOW_ORDER.map(getProjectBySlug).filter((p): p is Project =>
  Boolean(p),
);

/** Slugs con case study navegable (excluye internos sin página pública). */
export const projectSlugs = workProjects.map((p) => p.slug);
