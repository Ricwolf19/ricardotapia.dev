import { ogImageResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { siteConfig } from "@/data/site";
import { readAvatarDataUrl } from "@/lib/avatar";

export const alt = "Ricardo Tapia — Full-Stack Developer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * Language-neutral fallback card for routes outside a locale (the global
 * not-found). Locale pages use [locale]/opengraph-image.tsx, which localizes
 * the subtitle; case studies render their own.
 */
const Image = async () =>
  ogImageResponse({
    title: siteConfig.name,
    subtitle: "Full-Stack Developer",
    detail: `${siteConfig.location.city}, ${siteConfig.location.countryName}`,
    avatar: await readAvatarDataUrl(),
  });

export default Image;
