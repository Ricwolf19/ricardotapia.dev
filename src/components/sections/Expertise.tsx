import { getTranslations } from "next-intl/server";
import { Boxes, Globe, ShoppingCart, Smartphone } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";

const SERVICES = [
  { key: "web", Icon: Globe },
  { key: "ecommerce", Icon: ShoppingCart },
  { key: "erp", Icon: Boxes },
  { key: "mobile", Icon: Smartphone },
] as const;

const SECTORS = [
  "fintech",
  "ecommerce",
  "health",
  "education",
  "institutional",
  "professional",
] as const;

/** Core stack — proper nouns, identical across locales, so kept out of i18n. */
const STACK = [
  "TypeScript",
  "React",
  "Next.js",
  "React Native",
  "Expo",
  "Node.js",
  "PostgreSQL",
  "Drizzle ORM",
  "Tailwind CSS",
] as const;

/**
 * "What I do" — services (the priority), sectors served and core stack. Server
 * component: pure HTML, no client JS, and rich textual content for SEO depth.
 */
export const Expertise = async () => {
  const t = await getTranslations("home.expertise");

  return (
    <Section>
      <p className="text-accent font-mono text-sm">{t("label")}</p>
      <h2 className="mt-2 max-w-3xl text-3xl tracking-tight">{t("title")}</h2>
      <p className="text-foreground-muted mt-3 max-w-2xl text-lg leading-relaxed">{t("intro")}</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {SERVICES.map(({ key, Icon }) => (
          <article key={key} className="reveal border-border bg-surface rounded-lg border p-6">
            <span className="bg-accent/10 text-accent flex size-10 items-center justify-center rounded-lg">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-mono text-lg tracking-tight">{t(`services.${key}.title`)}</h3>
            <p className="text-foreground-muted mt-2 text-sm leading-relaxed">
              {t(`services.${key}.desc`)}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-foreground-dim mb-3 font-mono text-xs tracking-widest uppercase">
            {t("sectorsTitle")}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {SECTORS.map((s) => (
              <li key={s}>
                <Badge>{t(`sectors.${s}`)}</Badge>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-foreground-dim mb-3 font-mono text-xs tracking-widest uppercase">
            {t("stackTitle")}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {STACK.map((s) => (
              <li key={s}>
                <Badge variant="accent">{s}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};
