"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * One navigation entry. The sidebar and the mobile overlay render the same
 * links with different chrome, so the active rule lives here once and
 * `variant` picks the skin. Active state is derived from the pathname so the
 * parents can stay server components.
 */
export const NavLink = ({
  href,
  label,
  variant,
  onClick,
}: {
  href: string;
  label: string;
  variant: "sidebar" | "overlay";
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  const active =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex w-fit items-center font-mono transition-colors duration-150",
        variant === "sidebar" ? "link-underline text-[13px] leading-6" : "py-1 text-base",
        active ? "text-foreground" : "text-foreground-muted hover:text-foreground",
      )}
    >
      {label}
    </Link>
  );
};
