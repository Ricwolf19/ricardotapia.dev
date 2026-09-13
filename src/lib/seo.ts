import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

/** Absolute URL for a site-root path ("/sitemap.xml", "/logo.svg"). */
export const absoluteUrl = (path = ""): string => `${siteConfig.url}${path}`;

/** Absolute URL for a locale-prefixed path (`path` is locale-agnostic: "",
 * "/work", "/work/metri-info"). */
export const localeUrl = (locale: string, path = ""): string =>
  `${siteConfig.url}/${locale}${path}`;

/**
 * hreflang map for a locale-agnostic path. Language-only codes (`es`, not
 * `es-MX`) so Spanish speakers outside Mexico still match; `x-default` points at
 * the default locale. Must stay identical to the sitemap's per-URL alternates —
 * Google cross-checks the two and drops the cluster when they disagree.
 */
export const hreflangMap = (path = ""): Record<string, string> => ({
  es: localeUrl("es", path),
  en: localeUrl("en", path),
  "x-default": localeUrl("es", path),
});

/**
 * Per-page canonical + hreflang alternates. Every page MUST set its own, or it
 * self-canonicalizes to the locale home. @see AGENTS.md#seo-invariants
 */
export const localeAlternates = (
  locale: string,
  path = "",
): NonNullable<Metadata["alternates"]> => ({
  canonical: localeUrl(locale, path),
  languages: hreflangMap(path),
});

/**
 * The site-wide Open Graph card, stated explicitly because declaring `openGraph`
 * in a segment drops the image Next injected from `opengraph-image.tsx`.
 * Routes that own an `opengraph-image.tsx` must NOT spread this.
 * @see AGENTS.md#seo-invariants
 */
export const defaultOgImage = {
  url: absoluteUrl(siteConfig.ogImage),
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — Full-stack Developer`,
} as const;

/**
 * Standard per-page metadata: title/description plus a self-referencing
 * canonical, hreflang alternates and a matching Open Graph URL. Pass the
 * locale-agnostic `path`; omit title/description to keep the layout defaults
 * (used by the homepage).
 */
export const pageMetadata = (
  locale: string,
  path: string,
  meta?: { title?: string; description?: string },
): Metadata => ({
  ...(meta?.title ? { title: meta.title } : {}),
  ...(meta?.description ? { description: meta.description } : {}),
  alternates: localeAlternates(locale, path),
  openGraph: {
    url: localeUrl(locale, path),
    images: [defaultOgImage],
    ...(meta?.title ? { title: meta.title } : {}),
    ...(meta?.description ? { description: meta.description } : {}),
  },
});
