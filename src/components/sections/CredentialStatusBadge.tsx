import { useTranslations } from "next-intl";
import type { Credential } from "@/types";
import { Badge, type BadgeProps } from "@/components/ui/Badge";

const VARIANT: Record<Credential["status"], BadgeProps["variant"]> = {
  earned: "production",
  "in-progress": "development",
  planned: "default",
};

const MESSAGE_KEY: Record<Credential["status"], string> = {
  earned: "earned",
  "in-progress": "inProgress",
  planned: "planned",
};

/** Status chip for a credential (earned / in progress / planned): owns the colour and label maps. */
export const CredentialStatusBadge = ({
  status,
  className,
}: {
  status: Credential["status"];
  className?: string;
}) => {
  const t = useTranslations("certifications.status");
  return (
    <Badge variant={VARIANT[status]} className={className}>
      {t(MESSAGE_KEY[status])}
    </Badge>
  );
};
