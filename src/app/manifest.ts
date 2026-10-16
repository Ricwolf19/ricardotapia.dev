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
  theme_color: "#0c0c0f",
  background_color: "#0c0c0f",
  // Generated at build time from the author photo by src/app/icon.tsx. The
  // maskable variant pads the circle into the ~80% safe zone Android crops to.
  icons: [
    { src: "/icon/192", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "/icon/512", sizes: "512x512", type: "image/png", purpose: "any" },
    { src: "/icon/512-maskable", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
});

export default manifest;
