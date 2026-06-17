import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/data/site";
import { getProjectBySlug, projectSlugs } from "@/data/projects";

const STATIC_PATHS = ["", "/work", "/about", "/now", "/contact"] as const;

/** hreflang alternates for a locale-agnostic path, mirroring the per-page
 * `<link rel="alternate">` tags so search engines see the language map twice. */
const languages = (path: string) => ({
  es: `${siteConfig.url}/es${path}`,
  en: `${siteConfig.url}/en${path}`,
});

/** Last-modified date for a case study, derived from its launch/start date. */
const projectLastModified = (slug: string): Date | undefined => {
  const p = getProjectBySlug(slug);
  const date = p?.launchDate ?? p?.startDate;
  return date ? new Date(date) : undefined;
};

/** Sitemap covering every locale-prefixed page plus each case study (spec §13.3),
 * with hreflang alternates and per-project last-modified dates. */
const sitemap = (): MetadataRoute.Sitemap => {
  const base = siteConfig.url;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${base}/${locale}${path}`,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: { languages: languages(path) },
      });
    }
    for (const slug of projectSlugs) {
      entries.push({
        url: `${base}/${locale}/work/${slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
        lastModified: projectLastModified(slug),
        alternates: { languages: languages(`/work/${slug}`) },
      });
    }
  }

  return entries;
};

export default sitemap;
