import { Eye, FileText } from "lucide-react";
import type { Credential } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { cn, formatDateRange, formatMonthYear } from "@/lib/utils";

interface CredentialCardProps {
  credential: Credential;
  title: string;
  issuer: string;
  typeLabel: string;
  /** Fallback for an open-ended study period. */
  currentLabel: string;
  actionLabel: string;
  locale: string;
  onOpen: () => void;
}

/**
 * One credential card.
 *
 * The layout is deliberately rigid: titles run from one to three lines and only
 * degrees carry a date, so without a reserved title box and a bottom-pinned
 * action the cards in a row would put their heading, issuer and button at three
 * different heights. `min-h-[3lh]` reserves exactly three line boxes of the
 * heading's own type scale, so it keeps up if the scale changes.
 */
export const CredentialCard = ({
  credential,
  title,
  issuer,
  typeLabel,
  currentLabel,
  actionLabel,
  locale,
  onOpen,
}: CredentialCardProps) => {
  const period = credential.startDate
    ? formatDateRange(credential.startDate, credential.endDate, locale, currentLabel)
    : credential.issuedDate
      ? formatMonthYear(credential.issuedDate, locale)
      : null;

  return (
    <li className="border-border bg-surface flex h-full flex-col rounded-lg border p-6">
      <div className="flex items-center justify-between gap-2">
        <span className="bg-surface-elevated text-foreground-muted flex h-10 w-10 items-center justify-center rounded-md">
          <FileText className="h-5 w-5" aria-hidden />
        </span>
        <Badge variant="accent">{typeLabel}</Badge>
      </div>

      <h2 className="mt-4 line-clamp-3 min-h-[3lh] font-mono text-base leading-snug tracking-tight">
        {title}
      </h2>

      <div className="mt-2 pb-6">
        <p className="text-foreground-dim line-clamp-2 text-xs">{issuer}</p>
        {period && <p className="text-foreground-dim mt-1 font-mono text-xs">{period}</p>}
      </div>

      <button
        type="button"
        onClick={onOpen}
        className={cn(
          buttonVariants({ variant: "secondary", size: "sm" }),
          // `mt-auto` pins it to the card's bottom edge; grid rows stretch every
          // card to the tallest, so the buttons line up across the row.
          "mt-auto w-fit self-start",
        )}
      >
        <Eye className="h-4 w-4" aria-hidden />
        {actionLabel}
      </button>
    </li>
  );
};
