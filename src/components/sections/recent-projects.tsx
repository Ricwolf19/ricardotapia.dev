"use client";

import { motion, type Variants } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, ArrowUpRight, ExternalLink, Lock } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Project } from "@/types";
import { recentProjects, getLiveUrl } from "@/data/projects";
import { getTagline } from "@/data/localize";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { ProjectThumbnail } from "./project-thumbnail";

const EASE = [0.22, 1, 0.36, 1] as const;
const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const ProjectRow = ({ project, index }: { project: Project; index: number }) => {
  const t = useTranslations("home.recent");
  const tStatus = useTranslations("status");
  const locale = useLocale();
  const liveUrl = getLiveUrl(project);

  return (
    <motion.li variants={item} className="border-border border-b">
      <div className="group/row relative flex items-center gap-4 py-5 sm:gap-5 sm:px-3">
        {/* Barra de acento al hover */}
        <span className="bg-accent absolute top-0 left-0 h-full w-0.5 origin-top scale-y-0 transition-transform duration-200 group-hover/row:scale-y-100" />

        <span className="text-foreground-dim group-hover/row:text-accent w-7 shrink-0 font-mono text-sm tabular-nums transition-colors">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Área principal -> case study */}
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

        {/* Atajo rápido a la app hosteada */}
        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-accent/40 bg-accent/10 text-accent hover:border-accent hover:bg-accent hidden shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-xs font-medium transition-all hover:text-white sm:inline-flex"
          >
            {t("viewLive")}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : (
          <span className="border-border text-foreground-dim hidden shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-xs sm:inline-flex">
            <Lock className="h-3.5 w-3.5" />
            {t("comingSoon")}
          </span>
        )}

        <ArrowUpRight className="text-foreground-dim group-hover/row:text-accent h-5 w-5 shrink-0 transition-all group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 sm:hidden" />
      </div>
    </motion.li>
  );
};

/**
 * Lista numerada e interactiva de proyectos recientes con landing pública (Home).
 * Cada fila enlaza al case study y ofrece un atajo directo a la app en vivo.
 */
export const RecentProjects = () => {
  const t = useTranslations("home.recent");

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

      <motion.ol
        className="border-border border-t"
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {recentProjects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </motion.ol>

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
