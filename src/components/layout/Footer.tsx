import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { siteConfig } from "@/data/site";

/** One quiet line; the social links live in the sidebar now. */
export const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="border-border border-t py-8">
      <Container>
        <p className="text-foreground-dim flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
          <span className="text-foreground-muted">{siteConfig.name}</span>
          <span aria-hidden>·</span>
          <span>{t("builtWith")}</span>
          <span aria-hidden>·</span>
          <span>© {new Date().getFullYear()}</span>
        </p>
      </Container>
    </footer>
  );
};
