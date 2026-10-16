import { useTranslations } from "next-intl";
import { MAIN_ID } from "./shell-ids";

/** Keyboard users jump past the navigation; visible only when focused. */
export const SkipLink = () => {
  const t = useTranslations("nav");
  return (
    <a
      href={`#${MAIN_ID}`}
      className="bg-surface text-foreground border-border sr-only rounded-md border px-3 py-2 font-mono text-sm focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70]"
    >
      {t("skipToContent")}
    </a>
  );
};
