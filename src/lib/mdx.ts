import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ProjectFrontmatter } from "@/types";
import { routing } from "@/i18n/routing";

/**
 * Case-study bodies, one directory per locale:
 * `content/projects/<locale>/<slug>.mdx`. Adding a language is adding a folder —
 * nothing here needs to change.
 */
const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export interface ProjectContent {
  frontmatter: ProjectFrontmatter;
  body: string;
  /** The locale actually read, which differs from the requested one on fallback. */
  locale: string;
}

const readLocale = async (locale: string, slug: string): Promise<ProjectContent | null> => {
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, locale, `${slug}.mdx`), "utf-8");
    const { data, content } = matter(raw);
    return { frontmatter: data as ProjectFrontmatter, body: content, locale };
  } catch {
    return null;
  }
};

/**
 * Reads a project's MDX for a locale, falling back to the default locale when
 * that translation does not exist yet. The fallback is deliberate: a missing
 * translation should degrade to a readable page, not a blank one — but callers
 * get `content.locale` so they can tell the two apart (the page marks a fallback
 * body with `lang`, so a crawler is not told Spanish prose is English).
 *
 * Returns null when the project has no case study in any locale.
 */
export const getProjectContent = async (
  slug: string,
  locale: string,
): Promise<ProjectContent | null> =>
  (await readLocale(locale, slug)) ??
  (locale === routing.defaultLocale ? null : await readLocale(routing.defaultLocale, slug));

/** Slugs that have an MDX file for the given locale. */
export const getContentSlugs = async (locale: string): Promise<string[]> => {
  try {
    const files = await fs.readdir(path.join(CONTENT_DIR, locale));
    return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
};
