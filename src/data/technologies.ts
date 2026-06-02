import type { Technology } from "@/types";

/**
 * Central technology catalog. Reuse these references in
 * projects.ts and experience.ts instead of redefining inline objects (DRY).
 */
export const tech = {
  // frontend
  react: { name: "React", slug: "react", category: "frontend", url: "https://react.dev" },
  next: { name: "Next.js", slug: "nextjs", category: "frontend", url: "https://nextjs.org" },
  typescript: {
    name: "TypeScript",
    slug: "typescript",
    category: "frontend",
    url: "https://www.typescriptlang.org",
  },
  tailwind: {
    name: "Tailwind CSS",
    slug: "tailwind",
    category: "frontend",
    url: "https://tailwindcss.com",
  },

  // tooling
  vite: { name: "Vite", slug: "vite", category: "tooling", url: "https://vitejs.dev" },
  excalidraw: { name: "Excalidraw", slug: "excalidraw", category: "tooling" },
  yjs: { name: "YJS", slug: "yjs", category: "tooling" },
  powerAutomate: { name: "Power Automate", slug: "power-automate", category: "tooling" },

  // backend
  node: { name: "Node.js", slug: "nodejs", category: "backend", url: "https://nodejs.org" },
  express: { name: "Express", slug: "express", category: "backend" },
  authjs: { name: "Auth.js", slug: "authjs", category: "backend", url: "https://authjs.dev" },
  socketio: { name: "Socket.io", slug: "socketio", category: "backend", url: "https://socket.io" },
  stripe: { name: "Stripe", slug: "stripe", category: "backend", url: "https://stripe.com" },
  paypal: { name: "PayPal", slug: "paypal", category: "backend" },
  facturapi: { name: "FACTURAPI", slug: "facturapi", category: "backend" },
  resend: { name: "Resend", slug: "resend", category: "backend", url: "https://resend.com" },
  reactRouter: { name: "React Router", slug: "react-router", category: "frontend" },
  java: { name: "Java", slug: "java", category: "backend" },
  struts: { name: "Struts", slug: "struts", category: "backend" },
  vbnet: { name: "VB.NET", slug: "vbnet", category: "backend" },
  vba: { name: "VBA", slug: "vba", category: "backend" },
  aspnet: { name: "ASP.NET MVC", slug: "aspnet-mvc", category: "backend" },
  restApi: { name: "REST API", slug: "rest-api", category: "backend" },
  websockets: { name: "WebSockets", slug: "websockets", category: "backend" },
  iot: { name: "IoT", slug: "iot", category: "backend" },

  // database
  postgres: { name: "PostgreSQL", slug: "postgresql", category: "database" },
  redis: { name: "Redis", slug: "redis", category: "database" },
  mongodb: { name: "MongoDB", slug: "mongodb", category: "database" },
  mysql: { name: "MySQL", slug: "mysql", category: "database" },
  sqlServer: { name: "SQL Server", slug: "sql-server", category: "database" },
  oracleErp: { name: "Oracle ERP", slug: "oracle-erp", category: "database" },
  dexie: { name: "Dexie", slug: "dexie", category: "database" },
  firebase: { name: "Firebase", slug: "firebase", category: "database" },

  // devops
  heroku: { name: "Heroku", slug: "heroku", category: "devops" },
  vercel: { name: "Vercel", slug: "vercel", category: "devops" },
  awsS3: { name: "AWS S3", slug: "aws-s3", category: "devops" },
  gcs: { name: "Google Cloud Storage", slug: "gcs", category: "devops" },
  cloudinary: { name: "Cloudinary", slug: "cloudinary", category: "devops" },
} as const satisfies Record<string, Technology>;

export type TechKey = keyof typeof tech;

/** Helper to build Technology arrays from catalog keys. */
export const techList = (...keys: TechKey[]): Technology[] => keys.map((k) => tech[k]);
