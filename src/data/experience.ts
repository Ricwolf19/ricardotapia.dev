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
      "Prácticas profesionales. 20+ soluciones de automatización con VBA macros y VB.NET scripts, reduciendo procesos manuales 40%. Paneles de métricas en tiempo real vía integración Oracle ERP. Aplicaciones web ASP.NET MVC con SQL Server para tracking de recursos empresariales.",
    technologies: techList("vba", "vbnet", "oracleErp", "aspnet", "sqlServer", "powerAutomate"),
    projects: ["honeywell-internal"],
  },
];
