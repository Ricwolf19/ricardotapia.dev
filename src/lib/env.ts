/**
 * Server-side environment access and feature flags.
 *
 * Every integration degrades gracefully: when its variables are missing the
 * corresponding `features` flag is `false`, the site keeps working, and the
 * contact form falls back to WhatsApp / email. This lets production run before
 * any third-party credentials are configured.
 */
export const env = {
  resendApiKey: process.env.RESEND_API_KEY,
  resendFrom: process.env.RESEND_FROM_EMAIL,
  contactEmail: process.env.CONTACT_EMAIL,
  recaptchaSecret: process.env.RECAPTCHA_SECRET_KEY,
  upstashUrl: process.env.UPSTASH_REDIS_REST_URL,
  upstashToken: process.env.UPSTASH_REDIS_REST_TOKEN,
} as const;

export const features = {
  /** Email delivery via Resend. Only the API key is required (from address has a safe default). */
  resend: Boolean(env.resendApiKey),
  /** reCAPTCHA v3 verification. When off, the human check is skipped. */
  recaptcha: Boolean(env.recaptchaSecret),
  /** Rate limiting via Upstash Redis REST. When off, requests are not throttled. */
  rateLimit: Boolean(env.upstashUrl && env.upstashToken),
} as const;
