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
  reactNative: {
    name: "React Native",
    slug: "react-native",
    category: "frontend",
    url: "https://reactnative.dev",
  },
  nativewind: {
    name: "NativeWind",
    slug: "nativewind",
    category: "frontend",
    url: "https://www.nativewind.dev",
  },

  // tooling
  vite: { name: "Vite", slug: "vite", category: "tooling", url: "https://vitejs.dev" },
  expo: { name: "Expo", slug: "expo", category: "tooling", url: "https://expo.dev" },
  posthog: { name: "PostHog", slug: "posthog", category: "tooling", url: "https://posthog.com" },
  excalidraw: { name: "Excalidraw", slug: "excalidraw", category: "tooling" },
  yjs: { name: "YJS", slug: "yjs", category: "tooling" },
  powerAutomate: { name: "Power Automate", slug: "power-automate", category: "tooling" },
  powershell: { name: "PowerShell", slug: "powershell", category: "tooling" },
  vitest: { name: "Vitest", slug: "vitest", category: "tooling", url: "https://vitest.dev" },
  playwright: {
    name: "Playwright",
    slug: "playwright",
    category: "tooling",
    url: "https://playwright.dev",
  },
  turborepo: {
    name: "Turborepo",
    slug: "turborepo",
    category: "tooling",
    url: "https://turbo.build",
  },

  // backend
  node: { name: "Node.js", slug: "nodejs", category: "backend", url: "https://nodejs.org" },
  express: { name: "Express", slug: "express", category: "backend" },
  authjs: { name: "Auth.js", slug: "authjs", category: "backend", url: "https://authjs.dev" },
  socketio: { name: "Socket.io", slug: "socketio", category: "backend", url: "https://socket.io" },
  stripe: { name: "Stripe", slug: "stripe", category: "backend", url: "https://stripe.com" },
  paypal: { name: "PayPal", slug: "paypal", category: "backend" },
  facturapi: { name: "FACTURAPI", slug: "facturapi", category: "backend" },
  resend: { name: "Resend", slug: "resend", category: "backend", url: "https://resend.com" },
  betterAuth: {
    name: "Better Auth",
    slug: "better-auth",
    category: "backend",
    url: "https://www.better-auth.com",
  },
  reactRouter: { name: "React Router", slug: "react-router", category: "frontend" },
  angular: { name: "Angular", slug: "angular", category: "frontend", url: "https://angular.dev" },
  tanstackQuery: {
    name: "TanStack Query",
    slug: "tanstack-query",
    category: "frontend",
    url: "https://tanstack.com/query",
  },
  reactHookForm: {
    name: "React Hook Form",
    slug: "react-hook-form",
    category: "frontend",
    url: "https://react-hook-form.com",
  },
  zod: { name: "Zod", slug: "zod", category: "backend", url: "https://zod.dev" },
  csharp: { name: "C#", slug: "csharp", category: "backend" },
  dotnet: { name: ".NET Framework", slug: "dotnet", category: "backend" },
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
  oracleErp: { name: "Oracle EBS", slug: "oracle-erp", category: "database" },
  dexie: { name: "Dexie", slug: "dexie", category: "database" },
  firebase: { name: "Firebase", slug: "firebase", category: "database" },
  drizzle: {
    name: "Drizzle ORM",
    slug: "drizzle",
    category: "database",
    url: "https://orm.drizzle.team",
  },
  neon: { name: "Neon", slug: "neon", category: "database", url: "https://neon.tech" },
  sqlite: { name: "SQLite", slug: "sqlite", category: "database", url: "https://www.sqlite.org" },
  mmkv: { name: "MMKV", slug: "mmkv", category: "database" },

  // devops
  heroku: { name: "Heroku", slug: "heroku", category: "devops" },
  vercel: { name: "Vercel", slug: "vercel", category: "devops" },
  awsS3: { name: "AWS S3", slug: "aws-s3", category: "devops" },
  gcs: { name: "Google Cloud Storage", slug: "gcs", category: "devops" },
  cloudinary: { name: "Cloudinary", slug: "cloudinary", category: "devops" },
  aws: { name: "AWS", slug: "aws", category: "devops", url: "https://aws.amazon.com" },
  iis: { name: "IIS", slug: "iis", category: "devops" },
  docker: { name: "Docker", slug: "docker", category: "devops", url: "https://www.docker.com" },
  githubActions: {
    name: "GitHub Actions",
    slug: "github-actions",
    category: "devops",
    url: "https://github.com/features/actions",
  },

  // mobile & games
  flutter: { name: "Flutter", slug: "flutter", category: "mobile", url: "https://flutter.dev" },
  dart: { name: "Dart", slug: "dart", category: "mobile", url: "https://dart.dev" },
  unity: { name: "Unity", slug: "unity", category: "game", url: "https://unity.com" },
} as const satisfies Record<string, Technology>;

export type TechKey = keyof typeof tech;

/** Helper to build Technology arrays from catalog keys. */
export const techList = (...keys: TechKey[]): Technology[] => keys.map((k) => tech[k]);
