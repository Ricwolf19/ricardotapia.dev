"use client";

import { useMemo, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { Project } from "@/types";
import { workFilters, type WorkFilter } from "@/data/constants";
import { EASE } from "@/components/motion/variants";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  projects: Project[];
}

/** Project grid with client-side pill filters and filtering animation (spec §10.4). */
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
            "grid grid-cols-1 gap-6 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3",
            isPending && "opacity-60",
          )}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                className="h-full"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{
                  layout: { type: "spring", stiffness: 380, damping: 34 },
                  opacity: { duration: 0.35, ease: EASE },
                  y: { duration: 0.4, ease: EASE },
                }}
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
