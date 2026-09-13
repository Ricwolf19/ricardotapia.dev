import { describe, it, expect } from "vitest";
import { getProjectContent, getContentSlugs } from "@/lib/mdx";
import { projectSlugs } from "@/data/projects";

/**
 * These read the real `content/projects/` tree rather than a mock: what is under
 * test is that the files on disk are actually there and in the expected shape,
 * which a mocked filesystem would assert nothing about.
 */
describe("case-study content", () => {
  it("ships the same slugs in every locale, so no page silently falls back", async () => {
    const es = (await getContentSlugs("es")).sort();
    const en = (await getContentSlugs("en")).sort();
    expect(en).toEqual(es);
  });

  it("has a case study for every project listed in /work", async () => {
    const es = await getContentSlugs("es");
    for (const slug of projectSlugs) expect(es).toContain(slug);
  });

  it("reads the requested locale when it exists", async () => {
    const content = await getProjectContent("metri", "en");
    expect(content?.locale).toBe("en");
    expect(content?.body).toContain("workout tracker");
  });

  it("reports the locale it actually read, so the page can mark a fallback", async () => {
    const content = await getProjectContent("metri", "es");
    expect(content?.locale).toBe("es");
  });

  it("falls back to the default locale instead of rendering an empty page", async () => {
    // Simulates a language added before its translations land.
    const content = await getProjectContent("metri", "pt");
    expect(content?.locale).toBe("es");
  });

  it("returns null for a project with no case study at all", async () => {
    expect(await getProjectContent("does-not-exist", "es")).toBeNull();
    expect(await getProjectContent("does-not-exist", "en")).toBeNull();
  });

  it("returns an empty list for an unknown locale directory", async () => {
    expect(await getContentSlugs("pt")).toEqual([]);
  });

  it("parses frontmatter and keeps the slug consistent with the filename", async () => {
    for (const locale of ["es", "en"]) {
      const content = await getProjectContent("listkit", locale);
      expect(content?.frontmatter.slug).toBe("listkit");
      expect(content?.frontmatter.title).toBeTruthy();
    }
  });
});
