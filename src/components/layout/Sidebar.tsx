import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/data/site";
import { LocalTime } from "./LocalTime";
import { NavList } from "./NavList";
import { NavUtilities } from "./NavUtilities";

/** Desktop (lg+) fixed left rail: wordmark home link, grouped nav, live status, utilities. */
export const Sidebar = () => {
  const t = useTranslations("nav");

  return (
    <aside className="border-border bg-background fixed inset-y-0 left-0 z-40 hidden w-56 flex-col overflow-y-auto border-r px-7 py-8 lg:flex">
      <Link
        href="/"
        className="link-underline w-fit font-mono text-sm font-medium tracking-tight hover:opacity-70"
      >
        {siteConfig.name}
      </Link>
      <div className="mt-2">
        <LocalTime label={t("localTime")} />
      </div>

      <div className="mt-9 flex-1">
        <NavList variant="sidebar" />
      </div>

      <div className="mt-8">
        <NavUtilities />
      </div>
    </aside>
  );
};
