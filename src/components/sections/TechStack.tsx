import type { Technology, TechnologyCategory } from "@/types";
import { tech } from "@/data/technologies";
import { Badge } from "@/components/ui/Badge";

const CATEGORY_ORDER: TechnologyCategory[] = [
  "frontend",
  "backend",
  "database",
  "devops",
  "tooling",
  "mobile",
  "design",
];

const CATEGORY_LABEL: Record<TechnologyCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  devops: "DevOps",
  tooling: "Tooling",
  mobile: "Mobile",
  design: "Design",
};

/** Visualización del stack agrupado por categoría (spec §10 tech-stack). */
export const TechStack = () => {
  const all = Object.values(tech) as Technology[];

  return (
    <div className="space-y-6">
      {CATEGORY_ORDER.map((category) => {
        const items = all.filter((tItem) => tItem.category === category);
        if (items.length === 0) return null;
        return (
          <div key={category}>
            <h3 className="text-foreground-dim mb-3 font-mono text-xs tracking-widest uppercase">
              {CATEGORY_LABEL[category]}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Badge key={item.slug} variant="default">
                  {item.name}
                </Badge>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
