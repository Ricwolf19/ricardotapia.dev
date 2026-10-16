import { getLocale, getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Section } from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Localized 404 rendered inside the shell (sidebar, theme, messages). Reached
 * by `notFound()` from any page in the locale and, through the `[...rest]`
 * catch-all, by every unmatched locale-prefixed URL. The root not-found.tsx
 * stays as the neutral fallback for paths outside a locale.
 */
const LocaleNotFound = async () => {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <Section>
      <p className="text-foreground-dim font-mono text-xs tracking-widest uppercase">404</p>
      <h1 className="mt-3 text-3xl tracking-tight sm:text-4xl">{t("title")}</h1>
      <div className="bg-foreground mt-5 h-1 w-24" aria-hidden />
      <p className="text-foreground-muted mt-5 max-w-xl leading-relaxed">{t("text")}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className={cn(buttonVariants(), "group")}>
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {t("home")}
        </Link>
        <Link href="/projects" className={buttonVariants({ variant: "secondary" })}>
          {t("projects")}
        </Link>
      </div>
    </Section>
  );
};

export default LocaleNotFound;
