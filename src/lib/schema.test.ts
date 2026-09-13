import { describe, it, expect } from "vitest";
import {
  PERSON_ID,
  WEBSITE_ID,
  personSchema,
  websiteSchema,
  profilePageSchema,
  collectionPageSchema,
  creativeWorkSchema,
  breadcrumbSchema,
} from "@/lib/schema";
import { siteConfig } from "@/data/site";

/** `JSON.stringify` drops undefined values silently, so a bad optional shows up
 * as a missing property rather than an error. Round-trip to assert on what a
 * crawler would actually receive. */
const emitted = (schema: object): Record<string, unknown> =>
  JSON.parse(JSON.stringify(schema)) as Record<string, unknown>;

describe("entity graph", () => {
  it("anchors Person and WebSite at stable, distinct @ids", () => {
    expect(PERSON_ID).not.toBe(WEBSITE_ID);
    expect(personSchema("es", "d")["@id"]).toBe(PERSON_ID);
    expect(websiteSchema("es", "d")["@id"]).toBe(WEBSITE_ID);
  });

  it("references the Person by @id from every page schema, never by a copy", () => {
    expect(profilePageSchema("es", "n", "d").mainEntity).toEqual({ "@id": PERSON_ID });
    expect(
      collectionPageSchema("es", { name: "n", description: "d", path: "/work" }, []).about,
    ).toEqual({
      "@id": PERSON_ID,
    });
    expect(
      creativeWorkSchema("es", { slug: "a", title: "A", description: "d", keywords: [] }).author,
    ).toEqual({ "@id": PERSON_ID });
  });

  it("scopes page schemas to the WebSite", () => {
    expect(profilePageSchema("en", "n", "d").isPartOf).toEqual({ "@id": WEBSITE_ID });
  });
});

describe("personSchema", () => {
  it("localizes the job title", () => {
    expect(personSchema("en", "d").jobTitle).not.toBe(personSchema("es", "d").jobTitle);
  });

  it("dedupes schools — two degrees at one university is one alumniOf", () => {
    const names = personSchema("es", "d").alumniOf.map((a) => a.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("drops unset socials instead of emitting nulls into sameAs", () => {
    for (const url of personSchema("es", "d").sameAs) expect(url).toBeTruthy();
  });

  it("points mainEntityOfPage at the locale home", () => {
    expect(personSchema("en", "d").mainEntityOfPage).toBe(`${siteConfig.url}/en`);
  });
});

describe("creativeWorkSchema", () => {
  it("omits optional fields rather than emitting undefined", () => {
    const output = emitted(
      creativeWorkSchema("es", { slug: "a", title: "A", description: "d", keywords: ["x"] }),
    );
    expect("datePublished" in output).toBe(false);
    expect("sameAs" in output).toBe(false);
    expect("codeRepository" in output).toBe(false);
  });

  it("includes optional fields when supplied", () => {
    const output = emitted(
      creativeWorkSchema("es", {
        slug: "a",
        title: "A",
        description: "d",
        keywords: ["x", "y"],
        datePublished: "2025-03",
        liveUrl: "https://live.test",
        repoUrl: "https://github.com/x/y",
      }),
    );
    expect(output.datePublished).toBe("2025-03");
    expect(output.keywords).toBe("x, y");
    expect(output.sameAs).toBe("https://live.test");
  });
});

describe("breadcrumbSchema", () => {
  it("numbers positions from 1 and resolves each crumb to an absolute URL", () => {
    const items = breadcrumbSchema("es", [
      { name: "Ricardo Tapia", path: "" },
      { name: "Work", path: "/work" },
    ]).itemListElement;

    expect(items.map((i) => i.position)).toEqual([1, 2]);
    expect(items[0]?.item).toBe(`${siteConfig.url}/es`);
    expect(items[1]?.item).toBe(`${siteConfig.url}/es/work`);
  });
});

describe("collectionPageSchema", () => {
  it("reports numberOfItems consistently with the list it emits", () => {
    const schema = collectionPageSchema("en", { name: "Work", description: "d", path: "/work" }, [
      "a",
      "b",
      "c",
    ]);
    expect(schema.mainEntity.numberOfItems).toBe(schema.mainEntity.itemListElement.length);
    expect(schema.mainEntity.itemListElement[2]?.url).toBe(`${siteConfig.url}/en/work/c`);
  });
});
