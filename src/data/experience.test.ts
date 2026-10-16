import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { experiences, recentExperience } from "@/data/experience";
import { getProjectBySlug } from "@/data/projects";

describe("experience", () => {
  it("references only projects that exist", () => {
    for (const e of experiences) {
      for (const slug of e.projects ?? []) expect(getProjectBySlug(slug)).toBeDefined();
    }
  });

  it("ships every evidence image it declares", () => {
    for (const e of experiences) {
      if (e.image) expect(existsSync(path.join(process.cwd(), "public", e.image.src))).toBe(true);
    }
  });

  it("previews the most recent roles in order", () => {
    expect(recentExperience).toEqual(experiences.slice(0, 3));
  });
});
