import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/Button";
import { Stagger } from "@/components/motion/Stagger";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { cn } from "@/lib/utils";

/** Hero del Home (spec §10.2). Dark-first, con stagger de entrada y señal de disponibilidad. */
export const Hero = () => {
  const t = useTranslations("home.hero");

  return (
    <section className="border-border relative overflow-hidden border-b">
      {/* Glow sutil + grid de fondo (vibe developer, performance-first) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,_color-mix(in_srgb,_var(--color-primary)_22%,_transparent),_transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,var(--color-foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-foreground)_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.04]"
      />

      <Container>
        <Stagger
          trigger="mount"
          className="relative flex min-h-[78vh] flex-col justify-center py-20"
        >
          {/* Badge de disponibilidad — gancho para no-developers */}
          <StaggerItem>
            <span className="border-success/30 bg-success/10 text-success inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs">
              <span className="relative flex h-2 w-2">
                <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                <span className="bg-success relative inline-flex h-2 w-2 rounded-full" />
              </span>
              {t("available")}
            </span>
          </StaggerItem>

          <StaggerItem>
            <p className="text-accent mt-6 font-mono text-sm tracking-[0.2em] uppercase">
              {t("subtitle")}
            </p>
          </StaggerItem>

          <StaggerItem>
            <h1 className="from-foreground to-foreground-muted mt-3 bg-gradient-to-br bg-clip-text text-5xl font-medium tracking-tight text-transparent sm:text-6xl lg:text-8xl">
              {t("title")}
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="text-foreground-muted mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
              {t("description")}
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/work"
                className={cn(buttonVariants({ size: "lg" }), "group shadow-primary/20 shadow-lg")}
              >
                {t("ctaProjects")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
              >
                {t("ctaContact")}
              </Link>
            </div>
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
};
