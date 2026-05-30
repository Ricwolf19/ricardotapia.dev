import { useTranslations } from "next-intl";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Container } from "./Container";
import { siteConfig } from "@/data/site";

export const Footer = () => {
  const t = useTranslations("footer");

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
            {siteConfig.socials.linkedin && (
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-foreground-muted hover:text-foreground transition-colors"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
};
