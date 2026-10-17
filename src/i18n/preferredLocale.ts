import { routing, type Locale } from "./routing";

/**
 * English is what an unsupported-language visitor is most likely to read, so
 * detection falls back to it. `routing.defaultLocale` (es) stays the site's
 * anchor for x-default, content fallbacks and the sitemap — a different concern.
 */
export const DETECTION_FALLBACK: Locale = "en";

export const isLocale = (value: string | undefined | null): value is Locale =>
  (routing.locales as readonly string[]).includes(value ?? "");

/**
 * First supported language in an Accept-Language header, honouring `q`
 * weights and matching on the primary subtag only ("es-MX" -> "es").
 * Returns undefined for a missing header, `*`, or no supported language.
 */
export const preferredLocale = (header: string | null | undefined): Locale | undefined => {
  if (!header) return undefined;
  const ranked = header
    .split(",")
    .map((part, index) => {
      const [tag = "", ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      const weight = q === undefined ? 1 : Number.parseFloat(q);
      return { lang: tag.trim().toLowerCase().split("-")[0] ?? "", weight, index };
    })
    .filter((r) => r.lang && r.lang !== "*" && r.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);
  return ranked.map((r) => r.lang).find(isLocale);
};
