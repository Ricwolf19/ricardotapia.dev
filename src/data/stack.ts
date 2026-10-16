import type { StackGroup } from "@/types";
import { techList } from "./technologies";

/**
 * Curated, ordered groups for /stack. Group labels come from messages
 * (`stack.groups.<id>`); order inside a group is display order. The catalog in
 * technologies.ts holds everything ever used — this is the subset worth showing.
 */
export const stackGroups: StackGroup[] = [
  {
    id: "frontend",
    technologies: techList(
      "typescript",
      "react",
      "next",
      "tailwind",
      "vite",
      "reactRouter",
      "tanstackQuery",
      "reactHookForm",
      "angular",
    ),
  },
  {
    id: "backend",
    technologies: techList(
      "node",
      "express",
      "zod",
      "authjs",
      "betterAuth",
      "stripe",
      "socketio",
      "websockets",
      "restApi",
      "java",
      "csharp",
      "dotnet",
      "aspnet",
      "vbnet",
      "vba",
    ),
  },
  {
    id: "database",
    technologies: techList(
      "postgres",
      "drizzle",
      "neon",
      "mongodb",
      "mysql",
      "sqlServer",
      "oracleErp",
      "redis",
      "sqlite",
      "dexie",
      "firebase",
    ),
  },
  {
    id: "devops",
    technologies: techList(
      "vercel",
      "heroku",
      "aws",
      "awsS3",
      "gcs",
      "cloudinary",
      "iis",
      "docker",
      "githubActions",
    ),
  },
  {
    id: "mobileGames",
    technologies: techList("reactNative", "expo", "nativewind", "flutter", "dart", "unity"),
  },
  {
    id: "tooling",
    technologies: techList(
      "vitest",
      "playwright",
      "turborepo",
      "posthog",
      "powershell",
      "powerAutomate",
      "excalidraw",
      "yjs",
    ),
  },
];

/** Home preview: a dozen names, hand-ordered. Must be a subset of `stackGroups`. */
export const stackHighlights = techList(
  "typescript",
  "react",
  "next",
  "reactNative",
  "expo",
  "node",
  "express",
  "postgres",
  "mongodb",
  "firebase",
  "tailwind",
  "unity",
);
