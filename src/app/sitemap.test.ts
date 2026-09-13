import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import { hreflangMap } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { projectSlugs } from "@/data/projects";

const entries = sitemap();
const urls = entries.map((e) => e.url);

describe("sitemap", () => {
  it("lists every locale of every page", () => {
    // Arrange: 6 static paths + one case study per slug, per locale.
    const expected = (6 + projectSlugs.length) * 2;

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

    const caseStudy = entries.find((e) => e.url.endsWith(`/en/work/${projectSlugs[0]}`));
    expect(caseStudy?.alternates?.languages).toEqual(hreflangMap(`/work/${projectSlugs[0]}`));
  });

  it("ranks the home above the section indexes", () => {
    const home = entries.find((e) => e.url === `${siteConfig.url}/es`);
    const work = entries.find((e) => e.url === `${siteConfig.url}/es/work`);
    expect(home?.priority).toBeGreaterThan(work?.priority ?? 0);
  });

  it("excludes internal projects, which would 404", () => {
    expect(urls.some((u) => u.includes("/work/honeywell-internal"))).toBe(false);
  });

  it("gives every entry a lastModified", () => {
    for (const entry of entries) expect(entry.lastModified).toBeDefined();
  });
});
