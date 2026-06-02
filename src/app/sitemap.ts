import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/data/site";
import { projectSlugs } from "@/data/projects";

const STATIC_PATHS = ["", "/work", "/about", "/now", "/contact"] as const;

/** Sitemap covering every locale-prefixed page plus each case study (spec §13.3). */
const sitemap = (): MetadataRoute.Sitemap => {
  const base = siteConfig.url;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${base}/${locale}${path}`,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
    for (const slug of projectSlugs) {
      entries.push({
        url: `${base}/${locale}/work/${slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
};

export default sitemap;
