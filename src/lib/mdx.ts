import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ProjectFrontmatter } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export interface ProjectContent {
  frontmatter: ProjectFrontmatter;
  body: string;
}

/**
 * Reads and parses a project's MDX. Returns frontmatter + raw body.
 * The body is rendered with compileMDX on the page (RSC).
 * Returns null if the file does not exist (project without a case study).
 */
export const getProjectContent = async (slug: string): Promise<ProjectContent | null> => {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    return { frontmatter: data as ProjectFrontmatter, body: content };
  } catch {
    return null;
  }
};

/** Slugs that have an MDX file in content/projects. */
export const getContentSlugs = async (): Promise<string[]> => {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
};
