import { env, features } from "./env";

const MIN_SCORE = 0.5;

/**
 * Verifies a reCAPTCHA v3 token against Google's API.
 * Returns `true` when reCAPTCHA is not configured (graceful skip).
 */
export const verifyRecaptcha = async (token: string | undefined): Promise<boolean> => {
  if (!features.recaptcha) return true;
  if (!token) return false;

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: env.recaptchaSecret ?? "", response: token }),
      cache: "no-store",
    });
    const data = (await res.json()) as { success: boolean; score?: number };
    return data.success && (data.score ?? 0) >= MIN_SCORE;
  } catch {
    return false;
  }
};
