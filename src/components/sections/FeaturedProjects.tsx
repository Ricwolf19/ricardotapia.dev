import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { featuredProjects } from "@/data/projects";
import { Section } from "@/components/layout/Section";
import { ProjectRow } from "./ProjectRow";

/**
 * Numbered list of featured projects (Home). Server-rendered — only public-access
 * work (live sites or public repos) so every row can be opened right away. Each
 * row links to the case study and offers a direct shortcut. Entrance is CSS-only.
 */
export const FeaturedProjects = async () => {
  const t = await getTranslations("home.featured");

  return (
    <Section>
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-accent font-mono text-sm">{t("label")}</p>
          <h2 className="mt-2 text-3xl tracking-tight">{t("title")}</h2>
          <p className="text-foreground-muted mt-2 max-w-xl">{t("subtitle")}</p>
        </div>
        <Link
          href="/work"
          className="group text-accent hover:text-accent-hover hidden items-center gap-1 font-mono text-sm transition-colors sm:flex"
        >
          {t("viewAll")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <ol className="border-border border-t">
        {featuredProjects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </ol>

      <Link
        href="/work"
        className="text-accent hover:text-accent-hover mt-8 inline-flex items-center gap-1 font-mono text-sm transition-colors sm:hidden"
      >
        {t("viewAll")}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Section>
  );
};
