import { describe, it, expect, vi, beforeEach } from "vitest";

/**
 * What is under test is the *order* of the gates, not the gates themselves
 * (those have their own specs). Order is the security property: if the email
 * were sent before the rate-limit or captcha check, both would be decoration.
 */
// `vi.mock` factories are hoisted above every `const`, so the spies have to be
// created inside `vi.hoisted` to exist by the time a factory runs.
const { sendContactEmail, checkRateLimit, verifyRecaptcha } = vi.hoisted(() => ({
  sendContactEmail: vi.fn<() => Promise<boolean>>(),
  checkRateLimit: vi.fn<() => Promise<{ success: boolean }>>(),
  verifyRecaptcha: vi.fn<() => Promise<boolean>>(),
}));

vi.mock("next/headers", () => ({
  headers: async () => new Map([["x-forwarded-for", "203.0.113.7, 10.0.0.1"]]),
}));
vi.mock("@/lib/env", () => ({ features: { resend: true, recaptcha: true, rateLimit: true } }));
vi.mock("@/lib/resend", () => ({ sendContactEmail }));
vi.mock("@/lib/ratelimit", () => ({ checkRateLimit }));
vi.mock("@/lib/recaptcha", () => ({ verifyRecaptcha }));

const { contactAction } = await import("@/actions/contact");

const validForm = (overrides: Record<string, string> = {}): FormData => {
  const data = new FormData();
  const fields = {
    name: "Ricardo",
    email: "hola@example.com",
    subject: "project",
    message: "Quiero construir una plataforma interna para mi despacho.",
    ...overrides,
  };
  for (const [key, value] of Object.entries(fields)) data.append(key, value);
  return data;
};

beforeEach(() => {
  vi.clearAllMocks();
  checkRateLimit.mockResolvedValue({ success: true });
  verifyRecaptcha.mockResolvedValue(true);
  sendContactEmail.mockResolvedValue(true);
});

describe("contactAction", () => {
  it("sends the email when every gate passes", async () => {
    expect(await contactAction(null, validForm())).toEqual({ success: true });
    expect(sendContactEmail).toHaveBeenCalledOnce();
  });

  const invalid: { name: string; overrides: Record<string, string> }[] = [
    { name: "a name under two characters", overrides: { name: "R" } },
    { name: "a malformed email", overrides: { email: "not-an-email" } },
    { name: "a message under ten characters", overrides: { message: "hola" } },
    { name: "a subject outside the enum", overrides: { subject: "spam" } },
  ];

  it.each(invalid)("rejects $name without sending anything", async ({ overrides }) => {
    const result = await contactAction(null, validForm(overrides));
    expect(result).toEqual({ success: false, error: "validation" });
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it("stops at the rate limit before spending a captcha call or an email", async () => {
    checkRateLimit.mockResolvedValue({ success: false });

    expect(await contactAction(null, validForm())).toEqual({
      success: false,
      error: "rateLimit",
    });
    expect(verifyRecaptcha).not.toHaveBeenCalled();
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it("stops at the captcha before sending", async () => {
    verifyRecaptcha.mockResolvedValue(false);

    expect(await contactAction(null, validForm())).toEqual({
      success: false,
      error: "recaptcha",
    });
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it("rate-limits on the client IP, not the proxy chain", async () => {
    await contactAction(null, validForm());
    expect(checkRateLimit).toHaveBeenCalledWith("203.0.113.7");
  });

  it("reports an email failure instead of claiming success", async () => {
    sendContactEmail.mockResolvedValue(false);
    expect(await contactAction(null, validForm())).toEqual({ success: false, error: "email" });
  });
});
