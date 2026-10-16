"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

const ORDER = ["light", "dark", "system"] as const;
type ThemeChoice = (typeof ORDER)[number];

const ICON = { light: Sun, dark: Moon, system: Monitor } as const;

/** Cycles light → dark → system. `system` follows the OS, which is the default. */
export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch: the icon depends on the theme resolved on the client.
  useEffect(() => setMounted(true), []);

  const current: ThemeChoice = ORDER.includes(theme as ThemeChoice)
    ? (theme as ThemeChoice)
    : "system";
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length]!;
  const Icon = mounted ? ICON[current] : Monitor;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={t("toggle")}
      title={mounted ? t(current) : undefined}
      onClick={() => setTheme(next)}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};
