import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/**
 * PWA manifest, served at /manifest.webmanifest. Replaces the former static
 * public/site.webmanifest so the name/description stay tied to siteConfig.
 * `start_url` carries the default locale because every route is locale-prefixed;
 * "/" would cost an installed app a redirect on every launch.
 */
const manifest = (): MetadataRoute.Manifest => ({
  id: "/",
  name: siteConfig.title,
  short_name: siteConfig.name,
  description: siteConfig.description,
  start_url: `/${siteConfig.locale}`,
  scope: "/",
  display: "standalone",
  orientation: "portrait",
  lang: siteConfig.locale,
  dir: "ltr",
  categories: ["business", "productivity", "developer"],
  theme_color: "#0a0a0f",
  background_color: "#0a0a0f",
  // No `purpose: "maskable"` entry: that requires an icon drawn inside the ~80%
  // safe zone, and these are edge-to-edge. Declaring one would get it cropped on
  // Android. Add a padded 512px asset first, then a maskable entry pointing at it.
  icons: [
    { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
  ],
});

export default manifest;
