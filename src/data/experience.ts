import type { Experience } from "@/types";
import { techList } from "./technologies";

/**
 * Ordered most recent first, so ExperienceTimeline renders it as-is.
 */
export const experiences: Experience[] = [
  {
    id: "exp-corpfiscal",
    role: "Full-Stack Developer",
    company: "CorpFiscal",
    location: "Chihuahua, México",
    type: "full-time",
    startDate: "2025-05",
    isCurrent: true,
    description:
      "Desarrollo de la plataforma operativa interna de un despacho fiscal sobre microservicios Express: 13 aplicaciones en monorepo (legal, clientes, contabilidad, recepción, RH, administración, corporativo y más). Pizarra colaborativa en tiempo real para sesiones fiscales con WebSockets, Excalidraw y Yjs.",
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
    projects: ["corporativo-fiscal"],
  },
  {
    id: "exp-pibytelabs",
    role: "Full-Stack Developer",
    company: "PibyteLabs",
    location: "Remoto, México",
    type: "freelance",
    startDate: "2025-05",
    isCurrent: true,
    description:
      "Diseñé y mantengo el ecosistema interno de paquetes @pibytelabs (ui, utils — paquetes privados) que impulsa todos los productos de la empresa. Autor de listkit y uploaderkit, publicados como open source en npm. Arquitectura full-stack para clientes en facturación electrónica, e-commerce, salud y educación: Facturalandia, CorpFiscal, Café Combate, Espau, Agates From Mexico, Danny Cuevas, Increscendo y Portillo y Young.",
    highlights: [
      "Facturalandia: emisión de CFDI 4.0 de Ingreso, Egreso y Pago, y cancelación con motivos SAT vía FacturAPI.",
      "Frontend React con TanStack Query, React Hook Form y Zod sobre un monorepo Turborepo.",
      "Tiempo de emisión por factura de 13 a 4.5 min; errores fiscales de 12 a 3 por mes.",
    ],
    technologies: techList(
      "next",
      "react",
      "typescript",
      "tailwind",
      "node",
      "express",
      "postgres",
      "mongodb",
      "firebase",
    ),
    projects: [
      "facturalandia",
      "cafe-combate",
      "espau",
      "agates-from-mexico",
      "danny-cuevas",
      "increscendo",
      "portillo-y-young",
      "listkit",
      "uploaderkit",
    ],
  },
  {
    id: "exp-sid",
    role: "Full-Stack Developer",
    company: "SID Enterprise",
    location: "Chihuahua, México",
    type: "full-time",
    startDate: "2024-12",
    endDate: "2025-04",
    isCurrent: false,
    description:
      "Aplicaciones Java empresariales con framework personalizado basado en Struts. Integración IoT vía APIs REST/HTTP. Módulos de comunicación multiplataforma para seguimiento de inventarios en tiempo real. Gestión de bases de datos MySQL.",
    technologies: techList("java", "struts", "restApi", "iot", "mysql"),
  },
  {
    id: "exp-honeywell",
    role: "IT Intern",
    company: "Honeywell Intelligrated",
    location: "Chihuahua, México",
    type: "internship",
    startDate: "2024-05",
    endDate: "2025-05",
    isCurrent: false,
    description:
      "Prácticas profesionales en la planta de Chihuahua: aplicaciones web internas, el muro de KPIs de producción y los pipelines de datos que lo alimentan desde Oracle EBS.",
    highlights: [
      "Desarrollé 20+ aplicaciones web internas sobre IIS (ASP.NET MVC 5, VB.NET, Entity Framework 6, SQL Server) para producción, calidad, embarques, inventario, auditorías 5S y control de acceso de visitantes.",
      "Construí Honeywall, el muro de KPIs de la planta (Highcharts + AdminLTE) proyectado en la pantalla LED del piso de producción.",
      "Automaticé pipelines de datos Oracle EBS → SQL Server con ~28 jobs en VBA, VBScript y PowerShell orquestados con Task Scheduler.",
      "Reduje el reporte de partes embarcadas de 4 h 30 min a 10 min y subí la tasa de éxito de datos de 95 % a 99.9 %.",
      "Java: servlets en Tomcat y una app Swing de impresión de etiquetas para impresoras Honeywell PM43.",
      "Migré el Andon legacy en WebForms a .NET 4.8 sobre IIS.",
    ],
    technologies: techList(
      "aspnet",
      "vbnet",
      "dotnet",
      "sqlServer",
      "oracleErp",
      "vba",
      "java",
      "iis",
      "powershell",
      "powerAutomate",
    ),
    projects: ["honeywell"],
    image: {
      src: "/images/experience/honeywell.jpg",
      alt: "Honeywall, el muro de KPIs de planta, en la pantalla LED del piso de producción",
      width: 1039,
      height: 805,
    },
  },
];

/** Home preview: the three most recent roles. */
export const recentExperience = experiences.slice(0, 3);
