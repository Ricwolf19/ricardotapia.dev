import { getTranslations } from "next-intl/server";
import { Mail } from "lucide-react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@/data/site";
import { PreviewSection } from "./PreviewSection";

export const ContactCta = async () => {
  const t = await getTranslations("home");
  const whatsappHref = siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}`
    : undefined;
  const link =
    "text-foreground-muted hover:text-foreground inline-flex items-center gap-1.5 font-mono text-sm transition-colors";

  return (
    <PreviewSection
      index={5}
      label={t("sections.contact")}
      title={t("contactCta.title")}
      href="/contact"
      viewAllLabel={t("contactCta.cta")}
    >
      <p className="text-foreground-muted max-w-2xl leading-relaxed">{t("contactCta.text")}</p>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        <li>
          <a href={`mailto:${siteConfig.email}`} className={link}>
            <Mail className="h-4 w-4" aria-hidden />
            {siteConfig.email}
          </a>
        </li>
        {whatsappHref && (
          <li>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={link}>
              <FaWhatsapp className="h-4 w-4" aria-hidden />
              WhatsApp
            </a>
          </li>
        )}
        {siteConfig.socials.linkedin && (
          <li>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              <FaLinkedin className="h-4 w-4" aria-hidden />
              LinkedIn
            </a>
          </li>
        )}
      </ul>
    </PreviewSection>
  );
};
