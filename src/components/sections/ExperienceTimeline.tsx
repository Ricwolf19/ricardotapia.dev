import { useLocale, useTranslations } from "next-intl";
import { experiences } from "@/data/experience";
import { getExperienceDescription } from "@/data/localize";
import { Badge } from "@/components/ui/Badge";
import { formatDateRange } from "@/lib/utils";

/** Timeline vertical de experiencia laboral (spec §10.6). */
export const ExperienceTimeline = () => {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <ol className="border-border relative space-y-10 border-l pl-6">
      {experiences.map((exp) => (
        <li key={exp.id} className="relative">
          <span className="border-background bg-primary absolute top-1.5 -left-[1.65rem] h-3 w-3 rounded-full border-2" />

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-foreground-dim font-mono text-xs">
              {formatDateRange(exp.startDate, exp.endDate, locale, t("current"))}
            </span>
            <Badge variant={exp.isCurrent ? "production" : "default"}>
              {t(`type.${exp.type}`)}
            </Badge>
          </div>

          <h3 className="mt-2 font-mono text-lg tracking-tight">
            {exp.role} ·{" "}
            {exp.companyUrl ? (
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {exp.company}
              </a>
            ) : (
              <span className="text-foreground-muted">{exp.company}</span>
            )}
          </h3>

          <p className="text-foreground-dim text-xs">{exp.location}</p>
          <p className="text-foreground-muted mt-3 max-w-2xl text-sm leading-relaxed">
            {getExperienceDescription(exp, locale)}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {exp.technologies.map((tech) => (
              <Badge key={tech.slug}>{tech.name}</Badge>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
};
