import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import es from "../../messages/es.json";
import en from "../../messages/en.json";

/** Absolute URL for a site-root path ("/sitemap.xml", "/logo.svg"). */
export const absoluteUrl = (path = ""): string => `${siteConfig.url}${path}`;

/** Absolute URL for a locale-prefixed path (`path` is locale-agnostic: "",
 * "/projects", "/projects/metri-info"). */
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

/** Open Graph locale codes: full BCP-47 with region for richer previews. */
export const ogLocale = (locale: string) => (locale === "es" ? "es_MX" : "en_US");
export const ogAlternateLocale = (locale: string) => (locale === "es" ? "en_US" : "es_MX");

/**
 * The per-locale site card ([locale]/opengraph-image.tsx), stated explicitly
 * because declaring `openGraph` in a segment drops the image Next injected.
 * Routes that own an `opengraph-image.tsx` must NOT restate it (pass
 * `ownImage: true` to `pageMetadata`). @see AGENTS.md#seo-invariants
 */
export const defaultOgImage = (locale: string) =>
  ({
    url: localeUrl(locale, siteConfig.ogImage),
    width: 1200,
    height: 630,
    // Same role string the <title> and the card itself use (messages, not getTranslations:
    // this also runs during metadata resolution).
    alt: `${siteConfig.name} — ${(locale === "en" ? en : es).home.intro.role}`,
  }) as const;

interface PageMeta {
  title?: string;
  description?: string;
}

interface PageMetadataOptions {
  /** The route renders its own opengraph-image/twitter-image: leave the images to Next. */
  ownImage?: boolean;
  /** Open Graph object type; case studies are articles. */
  type?: "website" | "article";
}

/**
 * Standard per-page metadata: title/description, a self-referencing canonical,
 * hreflang alternates and complete Open Graph + Twitter objects. Both objects
 * must be restated in full here — a page-level `openGraph` or `twitter` replaces
 * the layout's whole object, so siteName, locale, card type and images would
 * otherwise vanish. Pass the locale-agnostic `path`; omit title/description to
 * keep the layout defaults (used by the homepage).
 */
export const pageMetadata = (
  locale: string,
  path: string,
  meta?: PageMeta,
  options: PageMetadataOptions = {},
): Metadata => {
  const text = {
    ...(meta?.title ? { title: meta.title } : {}),
    ...(meta?.description ? { description: meta.description } : {}),
  };
  const image = defaultOgImage(locale);

  return {
    ...text,
    alternates: localeAlternates(locale, path),
    openGraph: {
      ...text,
      url: localeUrl(locale, path),
      siteName: siteConfig.name,
      locale: ogLocale(locale),
      alternateLocale: ogAlternateLocale(locale),
      type: options.type ?? "website",
      ...(options.ownImage ? {} : { images: [image] }),
    },
    twitter: {
      card: "summary_large_image",
      ...text,
      ...(siteConfig.socials.x ? { creator: siteConfig.socials.x } : {}),
      ...(options.ownImage ? {} : { images: [image.url] }),
    },
  };
};
