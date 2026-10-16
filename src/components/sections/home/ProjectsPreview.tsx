import { getTranslations } from "next-intl/server";
import { featuredProjects } from "@/data/projects";
import { ProjectRow } from "@/components/sections/ProjectRow";
import { PreviewSection } from "./PreviewSection";

/** Public-access work only (live sites or repos), so every row opens right away. */
export const ProjectsPreview = async () => {
  const t = await getTranslations("home");

  return (
    <PreviewSection
      index={1}
      label={t("sections.projects")}
      href="/projects"
      viewAllLabel={t("sections.viewAll")}
    >
      <ol className="border-border border-t">
        {featuredProjects.slice(0, 5).map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </ol>
    </PreviewSection>
  );
};
