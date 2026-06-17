import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/data/site";

/** A crumb. `path` is the locale-agnostic route ("", "/work", "/work/metri-info"). */
export interface Crumb {
  name: string;
  path: string;
}

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
export const Breadcrumbs = ({ locale, trail }: BreadcrumbsProps) => {
  const items: Crumb[] = [{ name: siteConfig.name, path: "" }, ...trail];
  const last = items.length - 1;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${siteConfig.url}/${locale}${c.path}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
