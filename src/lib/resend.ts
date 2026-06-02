import { siteConfig } from "@/data/site";
import { env, features } from "./env";

interface ContactEmailArgs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Sends the contact email through the Resend REST API.
 * Returns `false` when Resend is not configured or the request fails, so the
 * caller can surface a graceful error and the UI can fall back to other channels.
 *
 * `RESEND_FROM_EMAIL` should be an address on a domain verified in Resend. The
 * default `onboarding@resend.dev` only delivers to the account owner, which is
 * enough to validate the flow before DNS is set up.
 */
export const sendContactEmail = async (args: ContactEmailArgs): Promise<boolean> => {
  if (!features.resend) return false;

  const from = env.resendFrom ?? "ricardotapia.dev <onboarding@resend.dev>";
  const to = env.contactEmail ?? siteConfig.email;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.resendApiKey ?? ""}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: args.email,
        subject: `[ricardotapia.dev] ${args.subject} — ${args.name}`,
        text: `${args.message}\n\n— ${args.name} (${args.email})`,
      }),
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
};
