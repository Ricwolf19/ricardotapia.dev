import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getProjectBySlug, workProjects } from "@/data/projects";
import { getTagline, getDescription } from "@/data/localize";
import { getProjectContent } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";

export const generateStaticParams = () => workProjects.map((p) => ({ slug: p.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> => {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const tagline = getTagline(project, locale);
  return {
    title: project.title,
    description: tagline,
    openGraph: { title: project.title, description: tagline },
  };
};

const CaseStudyPage = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project || project.status === "internal") notFound();

  const t = await getTranslations({ locale, namespace: "work.caseStudy" });
  const tStatus = await getTranslations({ locale, namespace: "status" });
  const fileContent = await getProjectContent(slug);

  const { content } = fileContent
    ? await compileMDX({
        source: fileContent.body,
        components: mdxComponents,
        options: {
          mdxOptions: {
            rehypePlugins: [[rehypePrettyCode, { theme: "github-dark-dimmed" }]],
          },
        },
      })
    : { content: null };

  const index = workProjects.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? workProjects[index - 1] : undefined;
  const next = index < workProjects.length - 1 ? workProjects[index + 1] : undefined;

  return (
    <Section>
      <Link
        href="/work"
        className="text-foreground-muted hover:text-foreground inline-flex items-center gap-1.5 font-mono text-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("backToWork")}
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_18rem]">
        {/* Contenido principal */}
        <article>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">{project.category.toUpperCase()}</Badge>
            <Badge variant={project.status === "production" ? "production" : "development"}>
              {tStatus(project.status)}
            </Badge>
          </div>
          <h1 className="mt-4 text-4xl tracking-tight">{project.title}</h1>
          <p className="text-foreground-muted mt-3 max-w-2xl text-lg">
            {getTagline(project, locale)}
          </p>

          <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
            {content ?? <p className="text-foreground-muted">{getDescription(project, locale)}</p>}
          </div>

          {project.isMonorepo && project.apps && project.apps.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-4 font-mono text-2xl tracking-tight">{t("subApps")}</h2>
              <div className="space-y-2">
                {project.apps.map((app) => (
                  <details
                    key={app.slug}
                    className="group border-border bg-surface rounded-lg border p-4"
                  >
                    <summary className="flex cursor-pointer items-center justify-between font-mono text-sm">
                      <span>{app.name}</span>
                      {app.url && (
                        <a
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:text-accent-hover"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </summary>
                    <p className="text-foreground-muted mt-2 text-sm">{app.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {app.features.map((f) => (
                        <Badge key={f}>{f}</Badge>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Sidebar meta */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {project.links.length > 0 && (
            <div>
              <h2 className="text-foreground-dim mb-3 font-mono text-xs tracking-widest uppercase">
                {t("links")}
              </h2>
              <ul className="space-y-2">
                {project.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent-hover inline-flex items-center gap-1.5 font-mono text-sm"
                    >
                      {link.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="text-foreground-dim mb-3 font-mono text-xs tracking-widest uppercase">
              {t("stack")}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Badge key={tech.slug}>{tech.name}</Badge>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Prev / Next */}
      <nav className="border-border mt-16 flex items-center justify-between gap-4 border-t pt-8">
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="text-foreground-muted hover:text-foreground inline-flex items-center gap-1.5 font-mono text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="text-foreground-muted hover:text-foreground inline-flex items-center gap-1.5 font-mono text-sm"
          >
            {next.title}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </Section>
  );
};

export default CaseStudyPage;
