"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { navLinks } from "@/data/constants";
import { Container } from "./Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { NavLink } from "@/components/layout/NavLink";

export const Header = () => {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-mono text-base font-semibold tracking-tight"
            onClick={() => setOpen(false)}
          >
            Ricardo Tapia
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={t(link.key)}
                active={isActive(link.href)}
                variant="bar"
              />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <ThemeToggle />
            <button
              type="button"
              className="md:hidden"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-border flex flex-col gap-1 border-t py-4 md:hidden">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={t(link.key)}
                active={isActive(link.href)}
                variant="drawer"
                onClick={() => setOpen(false)}
              />
            ))}
          </nav>
        )}
      </Container>
    </header>
  );
};
