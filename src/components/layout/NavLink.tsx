"use client";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * One header navigation entry. The desktop bar and the mobile drawer render the
 * same links with different chrome, so the active/inactive rule lives here once
 * and `variant` picks the skin.
 */
export const NavLink = ({
  href,
  label,
  active,
  variant,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  variant: "bar" | "drawer";
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    aria-current={active ? "page" : undefined}
    className={cn(
      "font-mono text-sm transition-colors",
      variant === "drawer" && "rounded-lg px-3 py-2",
      active
        ? variant === "drawer"
          ? "bg-surface-elevated text-foreground"
          : "text-foreground"
        : variant === "drawer"
          ? "text-foreground-muted hover:bg-surface-elevated hover:text-foreground"
          : "text-foreground-muted hover:text-foreground",
    )}
  >
    {label}
  </Link>
);
