import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Globe, Lock, Star } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Project } from "@/types";
import { getLiveUrl } from "@/data/projects";
import { getTagline } from "@/data/localize";
import { Badge, type BadgeProps } from "@/components/ui/Badge";
import { ProjectThumbnail } from "./ProjectThumbnail";

const statusVariant: Record<Project["status"], BadgeProps["variant"]> = {
  production: "production",
  development: "development",
  internal: "internal",
  archived: "archived",
};

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

/** Tarjeta de proyecto (spec §10.3). Altura uniforme y thumbnail listo para imágenes. */
export const ProjectCard = ({ project, priority = false }: ProjectCardProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const isPublic = Boolean(getLiveUrl(project)) || project.visibility === "public";

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group border-border bg-surface hover:border-accent/50 hover:shadow-accent/5 relative flex h-full flex-col overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:shadow-none"
    >
      <ProjectThumbnail project={project} priority={priority} className="aspect-[16/10] w-full" />

      {/* Tag público / privado */}
      <span className="absolute top-3 left-3">
        <Badge variant={isPublic ? "production" : "internal"} className="gap-1 backdrop-blur">
          {isPublic ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
          {isPublic ? t("work.public") : t("work.private")}
        </Badge>
      </span>

      {/* Indicador de hover */}
      <span className="bg-background/70 text-foreground absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={statusVariant[project.status]}>{t(`status.${project.status}`)}</Badge>
          <Badge variant="accent">{project.category.toUpperCase()}</Badge>
          {project.priority && (
            <Badge variant="default" className="gap-1">
              <Star className="h-3 w-3 fill-current" />
              {t("work.priority")}
            </Badge>
          )}
        </div>

        <h3 className="group-hover:text-accent font-mono text-lg tracking-tight transition-colors">
          {project.title}
        </h3>
        <p className="text-foreground-muted line-clamp-2 text-sm">{getTagline(project, locale)}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech.slug}>{tech.name}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
};
