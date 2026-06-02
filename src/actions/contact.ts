"use server";

import { headers } from "next/headers";
import { z } from "zod";
import type { ContactResult, ContactSubject } from "@/types";
import { features } from "@/lib/env";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { checkRateLimit } from "@/lib/ratelimit";
import { sendContactEmail } from "@/lib/resend";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.enum(["project", "consulting", "collaboration", "other"]),
  message: z.string().min(10).max(5000),
  recaptchaToken: z.string().optional(),
});

const subjectLabel: Record<ContactSubject, string> = {
  project: "Project",
  consulting: "Consulting",
  collaboration: "Collaboration",
  other: "Other",
};

/**
 * Contact form Server Action (spec §11.1).
 *
 * Pipeline: validate -> rate limit -> reCAPTCHA -> send email. Each integration
 * degrades gracefully (see src/lib/env.ts). When email delivery is not
 * configured the action reports `unavailable`, and the form falls back to a
 * `mailto:` link, so the site stays functional with no environment variables.
 */
export const contactAction = async (
  _prevState: ContactResult | null,
  formData: FormData,
): Promise<ContactResult> => {
  if (!features.resend) return { success: false, error: "unavailable" };

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    recaptchaToken: formData.get("recaptchaToken") || undefined,
  });
  if (!parsed.success) return { success: false, error: "validation" };

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { success: withinLimit } = await checkRateLimit(ip);
  if (!withinLimit) return { success: false, error: "rateLimit" };

  const isHuman = await verifyRecaptcha(parsed.data.recaptchaToken);
  if (!isHuman) return { success: false, error: "recaptcha" };

  const sent = await sendContactEmail({
    name: parsed.data.name,
    email: parsed.data.email,
    subject: subjectLabel[parsed.data.subject],
    message: parsed.data.message,
  });
  if (!sent) return { success: false, error: "email" };

  return { success: true };
};
