"use client";

import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Cambia el locale preservando la ruta actual (spec §14.3). */
export const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const active = params.locale as string;

  const switchTo = (locale: string) => {
    if (locale === active) return;
    startTransition(() => {
      // @ts-expect-error -- pathname es válido para la config de routing actual
      router.replace({ pathname, params }, { locale });
    });
  };

  return (
    <div className={cn("flex items-center gap-1 font-mono text-xs", isPending && "opacity-60")}>
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          {i > 0 && <span className="text-border-strong">/</span>}
          <button
            type="button"
            onClick={() => switchTo(locale)}
            aria-current={locale === active ? "true" : undefined}
            className={cn(
              "uppercase transition-colors",
              locale === active
                ? "text-foreground font-semibold"
                : "text-foreground-dim hover:text-foreground",
            )}
          >
            {locale}
          </button>
        </span>
      ))}
    </div>
  );
};
