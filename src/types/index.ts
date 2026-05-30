// ============================================
// PROJECT
// ============================================
export type ProjectStatus = "production" | "development" | "archived" | "internal";
export type ProjectVisibility = "public" | "private" | "hybrid";
export type ProjectCategory =
  | "saas"
  | "ecommerce"
  | "erp"
  | "platform"
  | "marketing"
  | "oss"
  | "portfolio";

export type TechnologyCategory =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "mobile"
  | "design"
  | "tooling";

export interface Technology {
  name: string;
  slug: string;
  category: TechnologyCategory;
  url?: string;
}

export type ProjectLinkType = "live" | "repo" | "npm" | "docs" | "admin" | "landing";

export interface ProjectLink {
  label: string;
  url: string;
  type: ProjectLinkType;
}

export interface SubApp {
  name: string;
  slug: string;
  description: string;
  url?: string;
  status: "production" | "development";
  features: string[];
  thumbnail?: string;
}

export type WorkspaceTool = "yarn" | "pnpm" | "npm" | "turbo" | "nx";

export interface ProjectStats {
  users?: number;
  downloads?: number;
  githubStars?: number;
}

export interface ProjectInfrastructure {
  deployment: string;
  ciCd: string;
  environments: string[];
}

export interface Project {
  id: string; // UUID string. Futuro: Neon PK.
  slug: string; // URL-friendly: "cafe-combate"
  title: string;
  tagline: string; // One-liner SEO/meta (es). Traducción en src/data/localize.ts
  description: string; // Short paragraph for cards (es)
  status: ProjectStatus;
  visibility: ProjectVisibility;
  category: ProjectCategory;

  // Media
  thumbnail: string; // R2 URL o /images/local
  ogImage?: string; // /opengraph-image.tsx dynamic
  gallery?: string[]; // R2 URLs

  // Links
  links: ProjectLink[];
  repoUrl?: string; // GitHub (si público)

  // Metadata
  startDate: string; // ISO 8601: "2024-03"
  launchDate?: string; // ISO 8601
  tags: string[];
  technologies: Technology[];

  // Content
  content?: string; // MDX file path or raw MDX

  // Flags
  featured?: boolean; // Mostrar en Home
  priority?: boolean; // Destacar en /work (proyectos prioritarios con acceso privado)
  thumbnailReady?: boolean; // true cuando hay imagen real; si no, placeholder programático
  loginRequired?: boolean; // App de cliente: requiere cuenta para verse

  // Stats (optional, for future)
  stats?: ProjectStats;

  // Monorepo (optional)
  isMonorepo?: boolean;
  workspaceTool?: WorkspaceTool;
  apps?: SubApp[];
  infrastructure?: ProjectInfrastructure;

  // Relations (future Neon)
  experienceId?: string; // FK to Experience
}

// ============================================
// EXPERIENCE
// ============================================
export type EmploymentType = "full-time" | "part-time" | "freelance" | "contract" | "internship";

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: EmploymentType;
  startDate: string; // ISO 8601
  endDate?: string;
  isCurrent: boolean;
  description: string; // MDX supported (es). Traducción en src/data/localize.ts
  technologies: Technology[];
  projects?: Project["slug"][]; // Slug references
}

// ============================================
// SITE CONFIG
// ============================================
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  email: string; // ENV: CONTACT_EMAIL
  whatsappNumber?: string; // ENV: WHATSAPP_NUMBER (formato internacional sin +)
  calendlyUrl?: string;
  locale: "es" | "en";
  socials: {
    github: string; // ENV: GITHUB_USERNAME
    linkedin?: string;
    x?: string;
  };
}

// ============================================
// CONTACT FORM
// ============================================
export type ContactSubject = "project" | "consulting" | "collaboration" | "other";

export interface ContactSubmission {
  id: string; // Future Neon PK
  name: string;
  email: string;
  subject: ContactSubject;
  message: string;
  source: "form" | "whatsapp" | "calendly";
  status: "new" | "read" | "replied";
  createdAt: string;
  ipHash?: string; // For rate limiting
  recaptchaScore?: number;
}

// Resultado tipado del Server Action de contacto (Fase 2)
export type ContactErrorCode = "validation" | "rateLimit" | "recaptcha" | "email" | "unavailable";

export type ContactResult = { success: true } | { success: false; error: ContactErrorCode };

// ============================================
// PROJECT FRONTMATTER (MDX)
// ============================================
export interface ProjectFrontmatter {
  title: string;
  slug: string;
  tagline: string;
  status: ProjectStatus;
  visibility: ProjectVisibility;
  category: ProjectCategory;
  startDate: string;
  launchDate?: string;
  thumbnail: string;
  gallery?: string[];
  links?: ProjectLink[];
  tags?: string[];
  technologies?: Technology[];
}
