import { getTranslations } from "next-intl/server";
import { ArrowRight, Boxes, Globe, ShoppingCart, Smartphone } from "lucide-react";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/data/site";
import { Avatar } from "@/components/ui/Avatar";
import { buttonVariants } from "@/components/ui/Button";
import { DocumentButton } from "@/components/sections/DocumentButton";
import { cn } from "@/lib/utils";

const SERVICES = [
  { key: "web", Icon: Globe },
  { key: "ecommerce", Icon: ShoppingCart },
  { key: "erp", Icon: Boxes },
  { key: "mobile", Icon: Smartphone },
] as const;

/**
 * Home intro: photo, name, role, bio, what I do, CTAs. Server-rendered and
 * static with no entrance animation — the h1 and avatar are the LCP.
 */
export const Intro = async () => {
  const t = await getTranslations("home.intro");
  const tServices = await getTranslations("home.expertise.services");
  const tCv = await getTranslations("cv");

  return (
    <section className="py-12 sm:py-16">
      <Avatar src={siteConfig.avatar} alt={siteConfig.name} size={96} priority />

      <h1 className="mt-6 text-3xl tracking-tight sm:text-4xl">{siteConfig.name}</h1>
      <p className="text-foreground-muted mt-1 font-mono text-sm">{t("role")}</p>

      <span className="border-border text-foreground-muted mt-4 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs">
        <span className="relative flex h-2 w-2">
          <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
          <span className="bg-success relative inline-flex h-2 w-2 rounded-full" />
        </span>
        {t("available")}
      </span>

      <p className="text-foreground-muted mt-6 max-w-2xl leading-relaxed">{t("bio")}</p>

      <ul className="stagger mt-8 grid gap-4 sm:grid-cols-2">
        {SERVICES.map(({ key, Icon }, i) => (
          <li key={key} className="flex gap-3" style={{ "--i": i } as React.CSSProperties}>
            <span className="border-border text-foreground flex size-8 shrink-0 items-center justify-center rounded-md border">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <span>
              <span className="block font-mono text-sm">{tServices(`${key}.title`)}</span>
              <span className="text-foreground-muted block text-sm leading-relaxed">
                {tServices(`${key}.desc`)}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/contact" className={cn(buttonVariants(), "group")}>
          {t("ctaContact")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <DocumentButton doc="cv" label={tCv("viewCv")} variant="secondary" />
      </div>
    </section>
  );
};
