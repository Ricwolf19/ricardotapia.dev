"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { recentProjects } from "@/data/projects";
import { listContainer } from "@/components/motion/variants";
import { Section } from "@/components/layout/Section";
import { ProjectRow } from "./ProjectRow";

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
        variants={listContainer}
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
