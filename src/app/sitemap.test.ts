import { describe, it, expect } from "vitest";
import sitemap, { STATIC_PATHS } from "@/app/sitemap";
import { hreflangMap } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { navEntries } from "@/data/nav";
import { projects, projectSlugs } from "@/data/projects";

const entries = sitemap();
const urls = entries.map((e) => e.url);

describe("sitemap", () => {
  it("lists every locale of every page", () => {
    // Arrange: every static path + one case study per slug, per locale.
    const expected = (STATIC_PATHS.length + projectSlugs.length) * 2;

    // Assert
    expect(entries).toHaveLength(expected);
  });

  it("has no duplicate URLs", () => {
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("points every URL at the canonical apex host", () => {
    for (const url of urls) expect(url.startsWith(`${siteConfig.url}/`)).toBe(true);
  });

  /**
   * The invariant that matters: Google cross-checks the sitemap's hreflang against
   * the tags on the page, and drops the whole language cluster when they disagree.
   * Both sides come from `hreflangMap`, and this proves it stayed that way.
   */
  it("declares the same alternates the pages emit, x-default included", () => {
    const home = entries.find((e) => e.url === `${siteConfig.url}/es`);
    expect(home?.alternates?.languages).toEqual(hreflangMap(""));

    const caseStudy = entries.find((e) => e.url.endsWith(`/en/projects/${projectSlugs[0]}`));
    expect(caseStudy?.alternates?.languages).toEqual(hreflangMap(`/projects/${projectSlugs[0]}`));
  });

  it("ranks the home above the section indexes", () => {
    const home = entries.find((e) => e.url === `${siteConfig.url}/es`);
    const work = entries.find((e) => e.url === `${siteConfig.url}/es/projects`);
    expect(home?.priority).toBeGreaterThan(work?.priority ?? 0);
  });

  it("excludes internal projects, which would 404", () => {
    for (const p of projects.filter((x) => x.status === "internal")) {
      expect(urls.some((u) => u.includes(`/projects/${p.slug}`))).toBe(false);
    }
  });

  it("includes the public internship case study", () => {
    expect(urls).toContain(`${siteConfig.url}/es/projects/honeywell`);
  });

  it("covers every navigation entry, so no linked page is missing from the index", () => {
    for (const entry of navEntries) {
      expect(STATIC_PATHS).toContain(entry.href);
    }
  });

  it("carries no renamed path", () => {
    for (const url of urls) {
      expect(url).not.toMatch(/\/(work|about|certificaciones)(\/|$)/);
    }
  });

  it("gives every entry a lastModified", () => {
    for (const entry of entries) expect(entry.lastModified).toBeDefined();
  });
});
