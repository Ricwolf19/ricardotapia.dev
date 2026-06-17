import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

/** Absolute URL for a locale-prefixed path (`path` is locale-agnostic: "",
 * "/work", "/work/metri-info"). */
const localeUrl = (locale: string, path = ""): string => `${siteConfig.url}/${locale}${path}`;

/**
 * Per-page canonical + hreflang alternates. Every page MUST set its own, or it
 * would inherit the layout's and self-canonicalize to the locale home (telling
 * search engines the page is a duplicate of the homepage).
 */
export const localeAlternates = (
  locale: string,
  path = "",
): NonNullable<Metadata["alternates"]> => ({
  canonical: localeUrl(locale, path),
  languages: {
    "es-MX": localeUrl("es", path),
    en: localeUrl("en", path),
    "x-default": localeUrl("es", path),
  },
});

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
    ...(meta?.title ? { title: meta.title } : {}),
    ...(meta?.description ? { description: meta.description } : {}),
  },
});
