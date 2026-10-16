import { getTranslations } from "next-intl/server";
import { stackGroups } from "@/data/stack";
import { Badge } from "@/components/ui/Badge";

/** /stack: the curated catalog, one block per group. Server-rendered, no JS. */
export const StackGroups = async () => {
  const t = await getTranslations("stack.groups");

  return (
    <div className="space-y-10">
      {stackGroups.map((group) => (
        <section key={group.id} className="reveal">
          <h2 className="text-foreground-dim border-border mb-4 border-b border-dashed pb-2 font-mono text-xs tracking-widest uppercase">
            {t(group.id)}
          </h2>
          <ul className="stagger flex flex-wrap gap-2">
            {group.technologies.map((tech, i) => (
              <li key={tech.slug} style={{ "--i": i } as React.CSSProperties}>
                {tech.url ? (
                  <a href={tech.url} target="_blank" rel="noopener noreferrer">
                    <Badge className="hover:border-foreground hover:text-foreground">
                      {tech.name}
                    </Badge>
                  </a>
                ) : (
                  <Badge>{tech.name}</Badge>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};
