import type { ProjectCategory } from "@/types";

/** Links de navegación del header (spec §7). href relativo al locale. */
export const navLinks = [
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
  { href: "/now", key: "now" },
  { href: "/contact", key: "contact" },
] as const;

/** Filtros de categoría para /work (spec §10.4). "all" = sin filtro. */
export type WorkFilter = "all" | ProjectCategory;

export const workFilters: { value: WorkFilter; messageKey: string }[] = [
  { value: "all", messageKey: "filterAll" },
  { value: "saas", messageKey: "filterSaas" },
  { value: "erp", messageKey: "filterErp" },
  { value: "ecommerce", messageKey: "filterEcommerce" },
  { value: "platform", messageKey: "filterPlatform" },
  { value: "marketing", messageKey: "filterMarketing" },
  { value: "oss", messageKey: "filterOss" },
];

/** Gradientes por categoría para placeholders programáticos (spec §15.2). */
export const categoryGradients: Record<ProjectCategory, string> = {
  erp: "from-indigo-500/80 to-purple-600/80",
  saas: "from-cyan-500/80 to-blue-600/80",
  ecommerce: "from-emerald-500/80 to-teal-600/80",
  platform: "from-violet-500/80 to-indigo-600/80",
  marketing: "from-orange-500/80 to-pink-600/80",
  oss: "from-sky-500/80 to-cyan-600/80",
  portfolio: "from-slate-500/80 to-slate-700/80",
};
