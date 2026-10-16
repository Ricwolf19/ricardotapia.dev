import { Eye, ExternalLink, FileText, GraduationCap, ShieldCheck } from "lucide-react";
import type { Credential } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { CredentialStatusBadge } from "./CredentialStatusBadge";
import { buttonVariants } from "@/components/ui/Button";
import { cn, formatDateRange, formatMonthYear } from "@/lib/utils";

const ICON: Record<Credential["docType"], typeof FileText> = {
  degree: GraduationCap,
  certificate: FileText,
  certification: ShieldCheck,
};

interface CredentialCardProps {
  credential: Credential;
  title: string;
  issuer: string;
  typeLabel: string;
  /** Fallback for an open-ended study period. */
  currentLabel: string;
  actionLabel: string;
  verifyLabel: string;
  /** "Target: …" line for upcoming credentials; omit for earned ones. */
  targetLabel?: string;
  locale: string;
  /** Omit when there is nothing to open (upcoming credentials). */
  onOpen?: () => void;
}

/**
 * One credential, same shape whether earned or upcoming: icon, type and
 * status chips, title, issuer, date line, actions pinned to the bottom so a
 * grid row lines up. `id` lets other pages deep-link to it.
 */
export const CredentialCard = ({
  credential,
  title,
  issuer,
  typeLabel,
  currentLabel,
  actionLabel,
  verifyLabel,
  targetLabel,
  locale,
  onOpen,
}: CredentialCardProps) => {
  const Icon = ICON[credential.docType];
  const period = credential.startDate
    ? formatDateRange(credential.startDate, credential.endDate, locale, currentLabel)
    : credential.issuedDate
      ? formatMonthYear(credential.issuedDate, locale)
      : targetLabel;

  return (
    <li
      id={`credential-${credential.id}`}
      className="border-border bg-surface lift flex h-full scroll-mt-24 flex-col rounded-lg border p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="border-border text-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-md border">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div className="flex flex-wrap justify-end gap-1.5">
          <Badge>{typeLabel}</Badge>
          <CredentialStatusBadge status={credential.status} />
        </div>
      </div>

      <h3 className="mt-4 line-clamp-3 min-h-[2lh] font-mono text-base leading-snug tracking-tight">
        {title}
      </h3>
      <p className="text-foreground-muted mt-1 line-clamp-2 text-sm">{issuer}</p>
      {period && <p className="text-foreground-dim mt-1 font-mono text-xs">{period}</p>}

      {/* `mt-auto` pins the actions to the card's bottom edge; grid rows stretch
          every card to the tallest, so they line up across the row. */}
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {onOpen && (
          <button
            type="button"
            onClick={onOpen}
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
          >
            <Eye className="h-3.5 w-3.5" aria-hidden />
            {actionLabel}
          </button>
        )}
        {credential.verifyUrl && (
          <a
            href={credential.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            {verifyLabel}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        )}
      </div>
    </li>
  );
};
