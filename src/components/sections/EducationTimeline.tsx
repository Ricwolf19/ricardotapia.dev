import { useLocale, useTranslations } from "next-intl";
import { education } from "@/data/education";
import { getEducationDegree } from "@/data/localize";
import { Badge } from "@/components/ui/Badge";
import { formatDateRange } from "@/lib/utils";

/** Vertical education timeline, mirroring ExperienceTimeline's visual language. */
export const EducationTimeline = () => {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <ol className="border-border relative space-y-10 border-l pl-6">
      {education.map((edu) => (
        <li key={edu.id} className="relative">
          <span className="border-background bg-primary absolute top-1.5 -left-[1.65rem] h-3 w-3 rounded-full border-2" />

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-foreground-dim font-mono text-xs">
              {formatDateRange(edu.startDate, edu.endDate, locale, t("current"))}
            </span>
            {edu.isCurrent && <Badge variant="production">{t("current")}</Badge>}
          </div>

          <h3 className="mt-2 font-mono text-lg tracking-tight">
            {getEducationDegree(edu, locale)}
          </h3>

          <p className="text-foreground-dim text-xs">{edu.school}</p>
        </li>
      ))}
    </ol>
  );
};
