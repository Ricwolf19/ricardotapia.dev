import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const loadWithSecret = async (secret: string) => {
  vi.resetModules();
  vi.stubEnv("RECAPTCHA_SECRET_KEY", secret);
  return import("@/lib/recaptcha");
};

const mockVerify = (payload: { success: boolean; score?: number }) =>
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({ json: async () => payload })),
  );

beforeEach(() => vi.unstubAllGlobals());
afterEach(() => vi.unstubAllEnvs());

describe("verifyRecaptcha", () => {
  it("skips verification when reCAPTCHA is not configured", async () => {
    const { verifyRecaptcha } = await loadWithSecret("");
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    expect(await verifyRecaptcha(undefined)).toBe(true);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects a missing token once configured", async () => {
    const { verifyRecaptcha } = await loadWithSecret("secret");
    expect(await verifyRecaptcha(undefined)).toBe(false);
  });

  const scores: { score: number; expected: boolean }[] = [
    { score: 0.9, expected: true },
    { score: 0.5, expected: true }, // boundary: the threshold itself passes
    { score: 0.49, expected: false },
    { score: 0, expected: false },
  ];

  it.each(scores)("score $score -> $expected", async ({ score, expected }) => {
    const { verifyRecaptcha } = await loadWithSecret("secret");
    mockVerify({ success: true, score });
    expect(await verifyRecaptcha("token")).toBe(expected);
  });

  it("rejects when Google reports failure even with a high score", async () => {
    const { verifyRecaptcha } = await loadWithSecret("secret");
    mockVerify({ success: false, score: 0.99 });
    expect(await verifyRecaptcha("token")).toBe(false);
  });

  it("treats a response with no score as untrusted", async () => {
    const { verifyRecaptcha } = await loadWithSecret("secret");
    mockVerify({ success: true });
    expect(await verifyRecaptcha("token")).toBe(false);
  });

  it("fails closed when the verification call throws", async () => {
    const { verifyRecaptcha } = await loadWithSecret("secret");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network");
      }),
    );

    // Opposite of the rate limiter on purpose: an unverifiable human is a bot.
    expect(await verifyRecaptcha("token")).toBe(false);
  });
});
