import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { experiences } from "@/data/experience";
import {
  getExperienceDescription,
  getExperienceHighlights,
  getExperienceImageAlt,
} from "@/data/localize";
import { Badge } from "@/components/ui/Badge";
import { formatDateRange } from "@/lib/utils";

export const ExperienceTimeline = () => {
  const t = useTranslations("experience");
  const locale = useLocale();

  return (
    <ol className="border-border relative space-y-12 border-l pl-6">
      {experiences.map((exp) => {
        const highlights = getExperienceHighlights(exp, locale);
        return (
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

            {highlights.length > 0 && (
              <ul className="text-foreground-muted marker:text-accent mt-3 max-w-2xl list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
                {highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}

            {exp.image && (
              <Image
                src={exp.image.src}
                alt={getExperienceImageAlt(exp, locale)}
                width={exp.image.width}
                height={exp.image.height}
                sizes="(max-width: 768px) 100vw, 640px"
                className="border-border mt-4 w-full max-w-2xl rounded-md border"
              />
            )}

            <div className="mt-3 flex flex-wrap gap-1.5">
              {exp.technologies.map((tech) => (
                <Badge key={tech.slug}>{tech.name}</Badge>
              ))}
            </div>
          </li>
        );
      })}
    </ol>
  );
};
