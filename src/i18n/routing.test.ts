import { describe, it, expect } from "vitest";
import { routing } from "@/i18n/routing";

/**
 * The root redirect is the only place a visitor's language is chosen for them.
 * `localeDetection` gates both the NEXT_LOCALE cookie and Accept-Language in
 * next-intl, so with it off every English browser landed on Spanish.
 */
describe("locale routing", () => {
  it("detects the visitor's language from cookie and browser preference", () => {
    expect(routing.localeDetection).toBe(true);
  });

  it("keeps Spanish as the fallback and every URL locale-prefixed", () => {
    expect(routing.defaultLocale).toBe("es");
    expect(routing.localePrefix).toBe("always");
  });
});
