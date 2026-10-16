import { useTranslations } from "next-intl";
import { siteNav } from "@/data/nav";
import { NavLink } from "./NavLink";
import { cn } from "@/lib/utils";

interface NavListProps {
  variant: "sidebar" | "overlay";
  /** The overlay adds a Home entry: its heading is not a link, unlike the sidebar's avatar. */
  includeHome?: boolean;
  /** Overlay only: drives the staggered entrance. */
  entered?: boolean;
  onNavigate?: () => void;
}

/** The grouped site navigation, shared by the sidebar and the mobile overlay. */
export const NavList = ({
  variant,
  includeHome = false,
  entered = true,
  onNavigate,
}: NavListProps) => {
  const t = useTranslations("nav");
  const groups = [
    [...(includeHome ? [{ href: "/", key: "home" } as const] : []), ...siteNav.primary],
    siteNav.secondary,
  ];

  return (
    <nav aria-label={t("primaryNav")} className="flex flex-col">
      {groups.map((group, i) => (
        <div key={i} className="contents">
          {i > 0 && <div className="bg-border my-4 h-px" aria-hidden />}
          <ul
            className={cn(
              "flex flex-col",
              variant === "sidebar" ? "gap-1.5" : "gap-2",
              variant === "overlay" &&
                "transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none",
              variant === "overlay" &&
                (entered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"),
            )}
            style={variant === "overlay" ? { transitionDelay: `${i * 70}ms` } : undefined}
          >
            {group.map((entry) => (
              <li key={entry.href}>
                <NavLink
                  href={entry.href}
                  label={t(entry.key)}
                  variant={variant}
                  onClick={onNavigate}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};
