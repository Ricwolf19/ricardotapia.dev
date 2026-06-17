import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, ExternalLink, Globe, Lock } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getProjectBySlug, workProjects, splitLinks, splitApps, getLiveUrl } from "@/data/projects";
import { getTagline, getDescription } from "@/data/localize";
import { siteConfig } from "@/data/site";
import { localeAlternates } from "@/lib/seo";
import { getProjectContent } from "@/lib/mdx";
import { MdxContent } from "@/components/mdx/MdxContent";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import type { ProjectLink, SubApp } from "@/types";

export const generateStaticParams = () => workProjects.map((p) => ({ slug: p.slug }));

/** A list of project links (sidebar). Private links are rendered muted. */
const LinkList = ({ links, muted = false }: { links: ProjectLink[]; muted?: boolean }) => (
  <ul className="space-y-2">
    {links.map((link) => (
      <li key={link.url}>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 font-mono text-sm ${
            muted
              ? "text-foreground-muted hover:text-foreground"
              : "text-accent hover:text-accent-hover"
          }`}
        >
          {link.label}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </li>
    ))}
  </ul>
);

/** Expandable detail for a single monorepo app. */
const AppDetails = ({ app }: { app: SubApp }) => (
  <details className="group border-border bg-surface rounded-lg border p-4">
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
);

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
    alternates: localeAlternates(locale, `/work/${slug}`),
    openGraph: {
      title: project.title,
      description: tagline,
      url: `${siteConfig.url}/${locale}/work/${slug}`,
      type: "article",
    },
  };
};

const CaseStudyPage = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project || project.status === "internal") notFound();

  const t = await getTranslations({ locale, namespace: "work.caseStudy" });
  const tStatus = await getTranslations({ locale, namespace: "status" });
  const tWork = await getTranslations({ locale, namespace: "work" });
  const fileContent = await getProjectContent(slug);

  const mdxSource = fileContent
    ? await serialize(fileContent.body, {
        mdxOptions: {
          rehypePlugins: [[rehypePrettyCode, { theme: "github-dark-dimmed" }]],
        },
      })
    : null;

  const index = workProjects.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? workProjects[index - 1] : undefined;
  const next = index < workProjects.length - 1 ? workProjects[index + 1] : undefined;

  const { publicLinks, privateLinks } = splitLinks(project.links);
  const { publicApps, privateApps } = project.apps
    ? splitApps(project.apps)
    : { publicApps: [], privateApps: [] };

  // Per-project structured data: a CreativeWork for the case study (the breadcrumb
  // trail is emitted by <Breadcrumbs/>), so search engines can surface a rich result.
  const projectUrl = `${siteConfig.url}/${locale}/work/${slug}`;
  const liveUrl = getLiveUrl(project);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: getTagline(project, locale),
    url: projectUrl,
    inLanguage: locale,
    datePublished: project.launchDate ?? project.startDate,
    keywords: project.tags.join(", "),
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    ...(liveUrl ? { sameAs: liveUrl } : {}),
    ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
  };

  return (
    <Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        locale={locale}
        trail={[
          { name: tWork("title"), path: "/work" },
          { name: project.title, path: `/work/${slug}` },
        ]}
      />

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_18rem]">
        {/* Main content */}
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
            {mdxSource ? (
              <MdxContent source={mdxSource} />
            ) : (
              <p className="text-foreground-muted">{getDescription(project, locale)}</p>
            )}
          </div>

          {project.isMonorepo && (publicApps.length > 0 || privateApps.length > 0) && (
            <section className="mt-12">
              <h2 className="mb-4 font-mono text-2xl tracking-tight">{t("subApps")}</h2>

              {publicApps.length > 0 && (
                <div className="mb-6">
                  <p className="text-foreground-dim mb-2 inline-flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase">
                    <Globe className="h-3.5 w-3.5" />
                    {t("publicLinks")}
                  </p>
                  <div className="space-y-2">
                    {publicApps.map((app) => (
                      <AppDetails key={app.slug} app={app} />
                    ))}
                  </div>
                </div>
              )}

              {privateApps.length > 0 && (
                <div>
                  <p className="text-foreground-dim mb-2 inline-flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase">
                    <Lock className="h-3.5 w-3.5" />
                    {t("privateLinks")}
                  </p>
                  <div className="space-y-2">
                    {privateApps.map((app) => (
                      <AppDetails key={app.slug} app={app} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </article>

        {/* Meta sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {(publicLinks.length > 0 || privateLinks.length > 0) && (
            <div>
              <h2 className="text-foreground-dim mb-3 font-mono text-xs tracking-widest uppercase">
                {t("links")}
              </h2>

              {publicLinks.length > 0 && (
                <div className="mb-4">
                  <p className="text-foreground-dim mb-2 inline-flex items-center gap-1.5 font-mono text-[0.65rem] tracking-widest uppercase">
                    <Globe className="h-3 w-3" />
                    {t("publicLinks")}
                  </p>
                  <LinkList links={publicLinks} />
                </div>
              )}

              {privateLinks.length > 0 && (
                <div>
                  <p className="text-foreground-dim mb-2 inline-flex items-center gap-1.5 font-mono text-[0.65rem] tracking-widest uppercase">
                    <Lock className="h-3 w-3" />
                    {t("privateLinks")}
                  </p>
                  <LinkList links={privateLinks} muted />
                </div>
              )}
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
