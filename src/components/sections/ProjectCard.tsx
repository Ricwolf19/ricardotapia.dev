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
  /** On the "Now" page, flag the card as actively in development. */
  activeNow?: boolean;
}

/** Uniform height across a row, so a grid of cards stays aligned. */
export const ProjectCard = ({ project, priority = false, activeNow = false }: ProjectCardProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const isPublic = Boolean(getLiveUrl(project)) || project.visibility === "public";
  const accessLabel = isPublic
    ? t("work.public")
    : project.noLinkReason === "internal"
      ? t("work.internalOnly")
      : t("work.private");

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group border-border bg-surface lift relative flex h-full flex-col overflow-hidden rounded-lg border"
    >
      <ProjectThumbnail project={project} priority={priority} className="aspect-[16/10] w-full" />

      {/* Public / private tag */}
      <span className="absolute top-3 left-3">
        <Badge variant="default" className="bg-background/90 text-foreground gap-1.5 backdrop-blur">
          {/* Green = you can open it; non-developers read it like the "available" dot. */}
          {isPublic ? (
            <Globe className="text-success h-3 w-3" aria-hidden />
          ) : (
            <Lock className="text-foreground-dim h-3 w-3" aria-hidden />
          )}
          {accessLabel}
        </Badge>
      </span>

      {/* Hover indicator */}
      <span className="bg-foreground text-background absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={statusVariant[project.status]}>{t(`status.${project.status}`)}</Badge>
          {activeNow && project.status !== "development" && (
            <Badge variant="development">{t("status.development")}</Badge>
          )}
          <Badge variant="accent">{project.category.toUpperCase()}</Badge>
          {project.priority && (
            <Badge variant="default" className="gap-1">
              <Star className="h-3 w-3 fill-current" />
              {t("work.priority")}
            </Badge>
          )}
        </div>

        <h3 className="font-mono text-lg tracking-tight">{project.title}</h3>
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
