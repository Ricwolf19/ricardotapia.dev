import { ogImageResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { siteConfig } from "@/data/site";

export const alt = "Ricardo Tapia — Full-stack Developer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * Site-wide Open Graph / Twitter card. Inherited by every route that doesn't
 * define its own (case studies do — see [locale]/work/[slug]/opengraph-image.tsx).
 * Deliberately language-neutral: this one file serves both locales.
 */
const Image = () =>
  ogImageResponse({
    title: siteConfig.name,
    subtitle: "Full-stack Developer",
    detail: "Web Development · Mobile Apps · UI/UX Design · Cloud Solutions",
  });

export default Image;
