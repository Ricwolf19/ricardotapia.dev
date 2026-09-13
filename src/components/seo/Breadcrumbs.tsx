import { getTranslations } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/data/site";
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export type Crumb = BreadcrumbItem;

interface BreadcrumbsProps {
  locale: string;
  /** Trail after the home crumb (which is prepended automatically). */
  trail: Crumb[];
}

/**
 * Visible breadcrumb trail + matching `BreadcrumbList` JSON-LD. The home crumb is
 * prepended automatically; pages pass only the trail below it. Rendered as a
 * server component so the structured data ships in the initial HTML.
 */
export const Breadcrumbs = async ({ locale, trail }: BreadcrumbsProps) => {
  const t = await getTranslations({ locale, namespace: "nav" });
  const items: Crumb[] = [{ name: siteConfig.name, path: "" }, ...trail];
  const last = items.length - 1;

  return (
    <nav aria-label={t("breadcrumb")} className="mb-6">
      <JsonLd data={breadcrumbSchema(locale, items)} />
      <ol className="text-foreground-dim flex flex-wrap items-center gap-1.5 font-mono text-sm">
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1.5">
            {i < last ? (
              <Link
                href={c.path === "" ? "/" : c.path}
                className="hover:text-foreground transition-colors"
              >
                {c.name}
              </Link>
            ) : (
              <span className="text-foreground-muted" aria-current="page">
                {c.name}
              </span>
            )}
            {i < last && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
          </li>
        ))}
      </ol>
    </nav>
  );
};
