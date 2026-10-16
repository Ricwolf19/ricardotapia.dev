import { describe, it, expect } from "vitest";
import {
  credentials,
  earnedCredentials,
  upcomingCredentials,
  credentialHighlights,
} from "@/data/credentials";

describe("credentials", () => {
  it("keeps ids unique — the learning path and the cards anchor on them", () => {
    const ids = credentials.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("attaches a document to every earned credential", () => {
    for (const c of earnedCredentials) expect(c.files?.length ?? 0).toBeGreaterThan(0);
  });

  it("attaches no document to an upcoming credential", () => {
    for (const c of upcomingCredentials) expect(c.files).toBeUndefined();
  });

  it("partitions every credential into earned or upcoming", () => {
    expect(earnedCredentials.length + upcomingCredentials.length).toBe(credentials.length);
  });

  it("uses https for every verification link", () => {
    for (const c of credentials) {
      if (c.verifyUrl) expect(c.verifyUrl).toMatch(/^https:\/\//);
    }
  });

  it("caps the home preview at four", () => {
    expect(credentialHighlights.length).toBeLessThanOrEqual(4);
  });
});
