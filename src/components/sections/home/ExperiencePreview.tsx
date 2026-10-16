import { getLocale, getTranslations } from "next-intl/server";
import { recentExperience } from "@/data/experience";
import { formatDateRange } from "@/lib/utils";
import { PreviewSection } from "./PreviewSection";

export const ExperiencePreview = async () => {
  const t = await getTranslations("home");
  const tExp = await getTranslations("experience");
  const locale = await getLocale();

  return (
    <PreviewSection
      index={2}
      label={t("sections.experience")}
      title={t("previews.experience.title")}
      href="/experience"
      viewAllLabel={t("sections.viewAll")}
    >
      <ul className="divide-border divide-y">
        {recentExperience.map((exp) => (
          <li
            key={exp.id}
            className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6"
          >
            <span className="text-foreground-dim w-44 shrink-0 font-mono text-xs">
              {formatDateRange(exp.startDate, exp.endDate, locale, tExp("current"))}
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-sm">{exp.role}</span>
              <span className="text-foreground-muted block text-sm">{exp.company}</span>
            </span>
          </li>
        ))}
      </ul>
    </PreviewSection>
  );
};
