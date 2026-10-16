import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getProjectBySlug, workProjects } from "@/data/projects";
import { getTagline } from "@/data/localize";
import { siteConfig } from "@/data/site";
import { ogImageResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import es from "../../../../../messages/es.json";
import en from "../../../../../messages/en.json";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

interface Params {
  params: Promise<{ locale: string; slug: string }>;
}

/** Prerender one card per locale × case study, so sharing a link never waits on
 * an on-demand render (scrapers time out fast and then cache the miss). */
export const generateStaticParams = () =>
  routing.locales.flatMap((locale) => workProjects.map((p) => ({ locale, slug: p.slug })));

/** The alt names the project; a static `alt` export would say "case study" for all. */
export const generateImageMetadata = async ({ params }: Params) => {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return [{ id: "card", alt: `${project?.title ?? slug} — ${siteConfig.name}`, size, contentType }];
};

/**
 * Per-case-study Open Graph card: category eyebrow, project title, localized
 * tagline and the stack as chips. Overrides the locale card so a shared
 * case-study link previews as itself rather than as the homepage.
 */
const Image = async ({ params }: Params) => {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || project.status === "internal") notFound();

  const kind = (locale === "en" ? en : es).og.caseStudy;
  return ogImageResponse({
    eyebrow: `${kind} · ${project.category}`,
    title: project.title,
    subtitle: getTagline(project, locale),
    chips: project.technologies.slice(0, 4).map((t) => t.name),
  });
};

export default Image;
