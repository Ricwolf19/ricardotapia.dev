"use client";

import { useMemo, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { Project } from "@/types";
import { workFilters, type WorkFilter } from "@/data/constants";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  projects: Project[];
}

/** Grid de proyectos con filtros pill client-side y animación de filtrado (spec §10.4). */
export const ProjectGrid = ({ projects }: ProjectGridProps) => {
  const t = useTranslations("work");
  const [filter, setFilter] = useState<WorkFilter>("all");
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {workFilters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => startTransition(() => setFilter(f.value))}
            className={cn(
              "rounded-full border px-4 py-1.5 font-mono text-sm transition-all",
              filter === f.value
                ? "border-primary bg-primary shadow-primary/30 text-white shadow-sm"
                : "border-border-strong bg-surface text-foreground-muted hover:border-accent/50 hover:text-foreground",
            )}
          >
            {t(f.messageKey)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-foreground-muted py-12 text-center">{t("empty")}</p>
      ) : (
        <motion.div
          layout
          className={cn(
            "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
            isPending && "opacity-70",
          )}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                className="h-full"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
