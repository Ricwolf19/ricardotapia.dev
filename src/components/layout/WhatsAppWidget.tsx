import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/data/site";
import { WHATSAPP_WIDGET_ID } from "./shell-ids";

/** Bottom-right corner; the dev indicator sits bottom-left. Never renders the
 * number in the UI. The `id` lets the mobile overlay make it inert. */
export const WhatsAppWidget = () => {
  const t = useTranslations("contact.whatsapp");
  const number = siteConfig.whatsappNumber;
  if (!number) return null;

  const message = encodeURIComponent(t("prefill"));
  const href = `https://wa.me/${number}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("tooltip")}
      id={WHATSAPP_WIDGET_ID}
      className="group fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6"
    >
      {/* Fixed circle (aspect 1:1) -> perfectly round */}
      <span className="bg-foreground text-background border-border flex h-14 w-14 items-center justify-center rounded-full border shadow-lg transition-transform duration-200 group-hover:scale-110">
        <FaWhatsapp className="h-7 w-7" />
      </span>

      {/* Tooltip (does not affect the button shape). Opens to the LEFT of
          the button — the widget sits on the right screen edge. */}
      <span className="bg-foreground text-background pointer-events-none absolute top-1/2 right-[4.25rem] -translate-y-1/2 rounded-md px-2.5 py-1 font-mono text-xs whitespace-nowrap opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
        {t("tooltip")}
      </span>
    </a>
  );
};
