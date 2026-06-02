import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/** Robots policy + sitemap reference (spec §13.4). */
const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: "*", allow: "/" },
  sitemap: `${siteConfig.url}/sitemap.xml`,
  host: siteConfig.url,
});

export default robots;
