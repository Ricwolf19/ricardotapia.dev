import { describe, it, expect } from "vitest";
import { siteConfig } from "@/data/site";
import {
  absoluteUrl,
  localeUrl,
  hreflangMap,
  localeAlternates,
  pageMetadata,
  defaultOgImage,
} from "@/lib/seo";

/** Mirrors routing.defaultLocale, restated so this stays a dependency-free unit
 * test — importing src/i18n/routing would drag next-intl's navigation into it. */
const DEFAULT_LOCALE = "es";

/**
 * These lock the two SEO defects that reached production: canonicals pointing at
 * a host that redirects, and pages shipping without an og:image. Both were
 * invisible in the build output, so only an assertion catches them.
 */
describe("canonical host", () => {
  it("is the apex domain, not the redirecting www host", () => {
    // Arrange / Act
    const host = new URL(siteConfig.url).host;

    // Assert
    expect(host.startsWith("www.")).toBe(false);
  });

  it("has no trailing slash, so joined paths never double up", () => {
    expect(siteConfig.url.endsWith("/")).toBe(false);
    expect(absoluteUrl("/sitemap.xml")).toBe(`${siteConfig.url}/sitemap.xml`);
  });
});

describe("localeUrl", () => {
  // Table-driven: one behaviour, several shapes of `path`.
  const cases: { locale: string; path: string | undefined; expected: string }[] = [
    { locale: "es", path: undefined, expected: `${siteConfig.url}/es` },
    { locale: "es", path: "", expected: `${siteConfig.url}/es` },
    { locale: "en", path: "/projects", expected: `${siteConfig.url}/en/projects` },
    {
      locale: "es",
      path: "/projects/metri-info",
      expected: `${siteConfig.url}/es/projects/metri-info`,
    },
  ];

  it.each(cases)("$locale + '$path' -> $expected", ({ locale, path, expected }) => {
    expect(localeUrl(locale, path)).toBe(expected);
  });
});

describe("hreflangMap", () => {
  it("uses language-only codes so Spanish outside Mexico still matches", () => {
    expect(Object.keys(hreflangMap("/projects")).sort()).toEqual(["en", "es", "x-default"]);
  });

  it("points x-default at the default locale", () => {
    const map = hreflangMap("/experience");
    expect(map["x-default"]).toBe(map[DEFAULT_LOCALE]);
  });

  it("emits absolute URLs — relative hreflang is ignored by crawlers", () => {
    for (const url of Object.values(hreflangMap("/contact"))) {
      expect(url.startsWith("https://")).toBe(true);
    }
  });
});

describe("localeAlternates", () => {
  it("self-canonicalizes to the page, not to the locale home", () => {
    const alternates = localeAlternates("en", "/projects/metri-info");
    expect(alternates.canonical).toBe(`${siteConfig.url}/en/projects/metri-info`);
  });

  it("declares alternates reciprocally: each locale lists the whole set", () => {
    const es = localeAlternates("es", "/now");
    const en = localeAlternates("en", "/now");
    expect(es.languages).toEqual(en.languages);
  });
});

describe("pageMetadata", () => {
  it("always carries an og:image — a page without one previews blank", () => {
    const meta = pageMetadata("es", "/projects");
    expect(meta.openGraph?.images).toBeDefined();
    expect(meta.openGraph?.images).not.toHaveLength(0);
  });

  it("omits title and description so the layout defaults survive", () => {
    const meta = pageMetadata("es", "");
    expect("title" in meta).toBe(false);
    expect("description" in meta).toBe(false);
  });

  it("mirrors the given title and description into Open Graph", () => {
    const meta = pageMetadata("en", "/experience", { title: "About", description: "Who I am" });
    expect(meta.title).toBe("About");
    expect(meta.openGraph).toMatchObject({ title: "About", description: "Who I am" });
  });

  it("keeps og:url in sync with the canonical", () => {
    const meta = pageMetadata("en", "/contact", { title: "Contact" });
    expect(meta.openGraph?.url).toBe(meta.alternates?.canonical);
  });

  /**
   * A page-level `openGraph`/`twitter` replaces the layout's whole object, so
   * everything a scraper needs must be restated here or it silently disappears.
   */
  it("restates siteName, locale and type — a child object replaces the parent's", () => {
    const meta = pageMetadata("es", "/stack", { title: "Stack" });
    expect(meta.openGraph).toMatchObject({
      siteName: siteConfig.name,
      locale: "es_MX",
      alternateLocale: "en_US",
      type: "website",
    });
  });

  it("mirrors the page title into the Twitter card, not the site title", () => {
    const meta = pageMetadata("en", "/stack", { title: "Stack", description: "Tools" });
    expect(meta.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Stack",
      description: "Tools",
    });
  });

  it("points og:image and twitter:image at the same locale card", () => {
    const meta = pageMetadata("en", "/now");
    const og = (meta.openGraph?.images as { url: string }[])[0]?.url;
    expect(og).toBe(defaultOgImage("en").url);
    expect(og).toContain("/en/opengraph-image");
    expect(meta.twitter?.images).toEqual([og]);
  });

  it("leaves images to Next for a route that renders its own card", () => {
    const meta = pageMetadata(
      "es",
      "/projects/x",
      { title: "X" },
      { ownImage: true, type: "article" },
    );
    expect(meta.openGraph).not.toHaveProperty("images");
    expect(meta.twitter).not.toHaveProperty("images");
    expect(meta.openGraph).toMatchObject({ type: "article" });
  });
});
