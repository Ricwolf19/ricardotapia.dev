import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import { Container } from "./Container";
import { siteConfig } from "@/data/site";

export const Footer = () => {
  const t = useTranslations("footer");
  const whatsappHref = siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}`
    : undefined;

  return (
    <footer className="border-border border-t py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-foreground font-mono text-sm">Ricardo Tapia</p>
            <p className="text-foreground-dim text-xs">{t("builtWith")}</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-foreground-muted hover:text-foreground transition-colors"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
              className="text-foreground-muted hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-foreground-muted hover:text-foreground transition-colors"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
};
