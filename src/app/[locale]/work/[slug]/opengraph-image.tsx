import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getProjectBySlug, workProjects } from "@/data/projects";
import { getTagline } from "@/data/localize";
import { ogImageResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Case study";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Prerender one card per locale × case study, so sharing a link never waits on
 * an on-demand render (scrapers time out fast and then cache the miss). */
export const generateStaticParams = () =>
  routing.locales.flatMap((locale) => workProjects.map((p) => ({ locale, slug: p.slug })));

interface Params {
  params: Promise<{ locale: string; slug: string }>;
}

/**
 * Per-case-study Open Graph card: project title, localized tagline and the
 * stack. Overrides the site-wide card from src/app/opengraph-image.tsx so a
 * shared case-study link previews as itself rather than as the homepage.
 */
const Image = async ({ params }: Params) => {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || project.status === "internal") notFound();

  return ogImageResponse({
    eyebrow: locale === "en" ? "Case study" : "Caso de estudio",
    title: project.title,
    subtitle: getTagline(project, locale),
    detail: project.technologies
      .slice(0, 5)
      .map((t) => t.name)
      .join(" · "),
  });
};

export default Image;
