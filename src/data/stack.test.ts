import { describe, it, expect } from "vitest";
import { stackGroups, stackHighlights } from "@/data/stack";

describe("stack groups", () => {
  it("lists every technology in exactly one group", () => {
    const slugs = stackGroups.flatMap((g) => g.technologies.map((t) => t.slug));
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has no empty group — a heading with nothing under it is a bug", () => {
    for (const g of stackGroups) expect(g.technologies.length).toBeGreaterThan(0);
  });

  it("previews only technologies that /stack also shows", () => {
    const shown = new Set(stackGroups.flatMap((g) => g.technologies.map((t) => t.slug)));
    for (const t of stackHighlights) expect(shown.has(t.slug)).toBe(true);
  });
});
