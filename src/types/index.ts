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
  | "portfolio"
  | "game";

export type TechnologyCategory =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "mobile"
  | "game"
  | "design"
  | "tooling";

export interface Technology {
  name: string;
  slug: string;
  category: TechnologyCategory;
  url?: string;
}

// ============================================
// STACK (curated groups for /stack)
// ============================================
/** Group labels live in messages under `stack.groups.<id>`. */
export type StackGroupId =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "mobileGames"
  | "tooling";

export interface StackGroup {
  id: StackGroupId;
  /** Built with `techList()`, so every entry is a catalog technology. */
  technologies: Technology[];
}

export type ProjectLinkType = "live" | "repo" | "npm" | "docs" | "admin" | "landing";

export interface ProjectLink {
  label: string;
  url: string;
  type: ProjectLinkType;
  /**
   * Whether anyone can open the link without an account. Defaults are derived
   * from `type` (admin = private, everything else = public); set explicitly to
   * override (e.g. a public storefront vs. a private monorepo app).
   */
  public?: boolean;
}

export interface SubApp {
  name: string;
  slug: string;
  description: string;
  url?: string;
  status: "production" | "development";
  features: string[];
  thumbnail?: string;
  /** Monorepo apps are private (account required) unless marked public. */
  public?: boolean;
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

/** Why a project has no public URL — lets cards say "internal" instead of a generic lock. */
export type ProjectNoLinkReason = "internal";

export interface Project {
  id: string; // UUID string. Future: Neon PK.
  slug: string; // URL-friendly: "cafe-combate"
  title: string;
  tagline: string; // One-liner SEO/meta (es). Translation in src/data/localize.ts
  description: string; // Short paragraph for cards (es)
  status: ProjectStatus;
  visibility: ProjectVisibility;
  category: ProjectCategory;

  // Media
  thumbnail: string; // R2 URL or /images/local
  ogImage?: string; // /opengraph-image.tsx dynamic
  gallery?: string[]; // R2 URLs

  // Links
  links: ProjectLink[];
  repoUrl?: string; // GitHub (if public)

  // Metadata
  startDate: string; // ISO 8601: "2024-03"
  launchDate?: string; // ISO 8601
  tags: string[];
  technologies: Technology[];

  // Content
  content?: string; // MDX file path or raw MDX

  /** Set when `links` is empty on purpose; drives the card badge and case-study aside. */
  noLinkReason?: ProjectNoLinkReason;

  // Flags
  featured?: boolean; // Show on Home
  priority?: boolean; // Highlight on /work (priority projects with private access)
  thumbnailReady?: boolean; // true when a real image exists; otherwise a programmatic placeholder
  loginRequired?: boolean; // Client app: requires an account to view

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
  description: string; // MDX supported (es). Translation in src/data/localize.ts
  /** Bullet achievements (es). Translation in src/data/localize.ts */
  highlights?: string[];
  /** Evidence photo under public/ (alt is es; translation in src/data/localize.ts). */
  image?: ExperienceImage;
  technologies: Technology[];
  projects?: Project["slug"][]; // Slug references
}

export interface ExperienceImage {
  src: string;
  alt: string;
  /** Intrinsic pixel size, so next/image reserves the box without a layout shift. */
  width: number;
  height: number;
}

// ============================================
// EDUCATION
// ============================================
export interface Education {
  id: string;
  school: string;
  degree: string; // Degree name (es). Translation in src/data/localize.ts
  startDate: string; // ISO 8601
  endDate?: string; // ISO 8601; omit when in progress
  isCurrent: boolean;
}

// ============================================
// CREDENTIALS
// ============================================
/**
 * Structurally the FileViewer's `ViewableFile`, restated here because the data
 * layer must not import from a component. The viewer's fields are optional; a
 * credential always knows its name and type, so these are required.
 */
export interface CredentialFile {
  url: string;
  fileName: string;
  mimeType: string;
}

export type CredentialStatus = "earned" | "in-progress" | "planned";
/** `certification` = industry credential (AWS…); `certificate` = course diploma. */
export type CredentialDocType = "degree" | "certificate" | "certification";

export interface Credential {
  id: string;
  title: string; // es. Translation in src/data/localize.ts
  issuer: string; // es. Translation in src/data/localize.ts
  docType: CredentialDocType;
  status: CredentialStatus;
  /** Study period (ISO 8601) — degrees, which span years. */
  startDate?: string;
  endDate?: string;
  /** Single issue date (ISO 8601) — one-off certificates, which do not. */
  issuedDate?: string;
  /** Planned exam/issue date for an upcoming credential; omit = "target TBD". */
  targetDate?: string;
  /** Issuer's public verification page, rendered as an outbound link. */
  verifyUrl?: string;
  /** One file = single preview; several = gallery. Omit for upcoming credentials. */
  files?: CredentialFile[];
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
  /** Site-root path of the author photo (public/). */
  avatar: string;
  /** Where the author is based: drives the sidebar clock, the OG cards and the Person schema. */
  location: { city: string; countryCode: string; countryName: string; timeZone: string };
  email: string; // ENV: CONTACT_EMAIL
  whatsappNumber?: string; // ENV: WHATSAPP_NUMBER (international format without +)
  calendlyUrl?: string;
  locale: "es" | "en";
  keywords: string[]; // SEO keywords (specialties, stack, name)
  socials: {
    github: string; // ENV: GITHUB_USERNAME
    linkedin?: string;
    x?: string; // X/Twitter handle for twitter:creator, e.g. "@ricardotapia" (ENV: TWITTER_HANDLE)
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

// Typed result of the contact Server Action (Phase 2)
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
