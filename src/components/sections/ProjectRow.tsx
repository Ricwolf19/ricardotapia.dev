import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, ExternalLink, Lock } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Link } from "@/i18n/routing";
import type { Project } from "@/types";
import { getPublicUrl } from "@/data/projects";
import { getTagline } from "@/data/localize";
import { Badge } from "@/components/ui/Badge";
import { ProjectThumbnail } from "./ProjectThumbnail";

interface ProjectRowProps {
  project: Project;
  index: number;
}

/** Row in the featured projects list (Home). Server-rendered; links to the case
 * study + a shortcut to the public target (live site or source repo). The
 * scroll-in entrance is pure CSS (`.reveal`). */
export const ProjectRow = async ({ project, index }: ProjectRowProps) => {
  const t = await getTranslations("home.featured");
  const tStatus = await getTranslations("status");
  const locale = await getLocale();
  const pub = getPublicUrl(project);
  const shortcutLabel = pub?.kind === "repo" ? t("viewRepo") : t("viewLive");

  return (
    <li className="reveal border-border border-b">
      <div className="group/row relative flex items-center gap-4 py-5 sm:gap-5 sm:px-3">
        {/* Accent bar on hover */}
        <span className="bg-accent absolute top-0 left-0 h-full w-0.5 origin-top scale-y-0 transition-transform duration-200 group-hover/row:scale-y-100" />

        <span className="text-foreground-dim group-hover/row:text-accent w-7 shrink-0 font-mono text-sm tabular-nums transition-colors">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Main area -> case study */}
        <Link href={`/work/${project.slug}`} className="flex min-w-0 flex-1 items-center gap-4">
          <ProjectThumbnail
            project={project}
            priority={index === 0}
            compact
            sizes="120px"
            className="border-border hidden aspect-[16/10] w-28 shrink-0 rounded-md border sm:flex"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="group-hover/row:text-accent font-mono text-lg tracking-tight transition-colors">
                {project.title}
              </h3>
              <Badge variant="accent">{project.category.toUpperCase()}</Badge>
              <Badge variant={project.status === "production" ? "production" : "development"}>
                {tStatus(project.status)}
              </Badge>
            </div>
            <p className="text-foreground-muted mt-1.5 line-clamp-1 text-sm">
              {getTagline(project, locale)}
            </p>
          </div>
        </Link>

        {/* Quick shortcut to the public target (live site or repo) — also on mobile */}
        {pub ? (
          <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${shortcutLabel} — ${project.title}`}
            className="border-accent/40 bg-accent/10 text-accent hover:border-accent hover:bg-accent inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs font-medium transition-all hover:text-white sm:px-3.5"
          >
            {shortcutLabel}
            {pub.kind === "repo" ? (
              <FaGithub className="h-3.5 w-3.5" />
            ) : (
              <ExternalLink className="h-3.5 w-3.5" />
            )}
          </a>
        ) : (
          <span className="border-border text-foreground-dim inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs sm:px-3.5">
            <Lock className="h-3.5 w-3.5" />
            {t("comingSoon")}
          </span>
        )}

        <ArrowUpRight className="text-foreground-dim group-hover/row:text-accent hidden h-5 w-5 shrink-0 transition-all group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 sm:block" />
      </div>
    </li>
  );
};
