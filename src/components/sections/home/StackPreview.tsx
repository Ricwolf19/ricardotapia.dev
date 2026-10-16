import { getTranslations } from "next-intl/server";
import { stackHighlights } from "@/data/stack";
import { Badge } from "@/components/ui/Badge";
import { PreviewSection } from "./PreviewSection";

export const StackPreview = async () => {
  const t = await getTranslations("home");

  return (
    <PreviewSection
      index={3}
      label={t("sections.stack")}
      title={t("previews.stack.title")}
      href="/stack"
      viewAllLabel={t("sections.viewAll")}
    >
      <ul className="flex flex-wrap gap-2">
        {stackHighlights.map((tech) => (
          <li key={tech.slug}>
            <Badge variant="accent">{tech.name}</Badge>
          </li>
        ))}
      </ul>
    </PreviewSection>
  );
};
