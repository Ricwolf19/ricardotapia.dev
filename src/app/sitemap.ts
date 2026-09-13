import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { hreflangMap, localeUrl } from "@/lib/seo";
import { getProjectBySlug, projectSlugs } from "@/data/projects";

const STATIC_PATHS = ["", "/work", "/about", "/now", "/certificaciones", "/contact"] as const;

/** Home outranks the section indexes, which outrank individual case studies. */
const priorityFor = (path: string): number => (path === "" ? 1 : 0.7);

/** Last-modified date for a case study, derived from its launch/start date. */
const projectLastModified = (slug: string): Date | undefined => {
  const p = getProjectBySlug(slug);
  const date = p?.launchDate ?? p?.startDate;
  return date ? new Date(date) : undefined;
};

/**
 * Sitemap covering every locale-prefixed page plus each case study.
 *
 * Each locale gets its own `<url>` entry carrying the *full* reciprocal
 * alternate set (including `x-default`) — Google expects every language version
 * to be submitted on its own, not merely referenced as an alternate of the
 * other. The alternates come from the same `hreflangMap` the pages emit, so the
 * two can't drift apart.
 */
const sitemap = (): MetadataRoute.Sitemap => {
  const entries: MetadataRoute.Sitemap = [];
  // Static pages change together on deploy, so build time is an honest lastmod.
  const buildTime = new Date();

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: localeUrl(locale, path),
        lastModified: buildTime,
        changeFrequency: "monthly",
        priority: priorityFor(path),
        alternates: { languages: hreflangMap(path) },
      });
    }
    for (const slug of projectSlugs) {
      entries.push({
        url: localeUrl(locale, `/work/${slug}`),
        lastModified: projectLastModified(slug),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: hreflangMap(`/work/${slug}`) },
      });
    }
  }

  return entries;
};

export default sitemap;
