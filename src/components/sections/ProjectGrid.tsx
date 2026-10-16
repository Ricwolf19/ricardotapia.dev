"use client";

import { useMemo, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import type { Project } from "@/types";
import { workFilters, type WorkFilter } from "@/data/constants";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  projects: Project[];
}

/** The only JS here is the filtering state; the grid fades in on filter change via a CSS animation
 * (`.fade-in`, keyed on the active filter) — no animation library. */
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
              "h-8 rounded-full border px-4 font-mono text-xs transition-colors",
              filter === f.value
                ? "border-foreground bg-foreground text-background"
                : "border-border text-foreground-muted hover:border-foreground hover:text-foreground",
            )}
          >
            {t(f.messageKey)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-foreground-muted py-12 text-center">{t("empty")}</p>
      ) : (
        <div
          key={filter}
          className={cn(
            "stagger grid grid-cols-1 gap-6 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3",
            isPending && "opacity-60",
          )}
        >
          {filtered.map((project, i) => (
            <div key={project.id} style={{ "--i": i } as React.CSSProperties}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
