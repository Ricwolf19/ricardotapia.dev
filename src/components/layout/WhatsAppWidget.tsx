import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/data/site";

/**
 * Botón flotante de WhatsApp (spec §10.9). Esquina inferior IZQUIERDA, círculo
 * perfecto con el icono de marca. Nunca muestra el número en UI.
 */
export const WhatsAppWidget = () => {
  const t = useTranslations("contact.whatsapp");
  const number = siteConfig.whatsappNumber;
  if (!number) return null;

  const message = encodeURIComponent("Hola Ricardo, me interesa hablar sobre un proyecto.");
  const href = `https://wa.me/${number}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("tooltip")}
      className="group fixed bottom-4 left-4 z-40 sm:bottom-6 sm:left-6"
    >
      {/* Círculo fijo (aspect 1:1) -> perfectamente redondo */}
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform duration-200 group-hover:scale-110">
        <FaWhatsapp className="h-7 w-7" />
      </span>

      {/* Tooltip (no afecta la forma del botón) */}
      <span className="bg-foreground text-background pointer-events-none absolute top-1/2 left-[4.25rem] -translate-y-1/2 rounded-md px-2.5 py-1 font-mono text-xs whitespace-nowrap opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
        {t("tooltip")}
      </span>
    </a>
  );
};
