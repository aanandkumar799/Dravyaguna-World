import { describe, expect, it } from "vitest";
import { plantSchema } from "./schema";

describe("plant schema", () => {
  it("accepts a minimal draft plant", () => {
    expect(plantSchema.parse({
      id: "plant-example",
      slug: "example",
      identity: { botanicalName: "Example plant" },
      names: { sanskrit: [], common: [], regional: [], synonyms: [] },
      taxonomy: {},
      status: "draft",
      parts: [],
      sources: [],
      images: []
    }).status).toBe("draft");
  });

  it("rejects invalid plant ids", () => {
    expect(() => plantSchema.parse({
      id: "example",
      slug: "example",
      identity: { botanicalName: "Example plant" },
      names: { sanskrit: [], common: [], regional: [], synonyms: [] },
      taxonomy: {},
      status: "draft"
    })).toThrow();
  });

  it("rejects images without meaningful alt text", () => {
    expect(() => plantSchema.parse({
      id: "plant-example",
      slug: "example",
      identity: { botanicalName: "Example plant" },
      names: { sanskrit: [], common: [], regional: [], synonyms: [] },
      taxonomy: {},
      status: "draft",
      images: [{ id: "img-1", part: "leaf", alt: "leaf", verification: "reviewed" }]
    })).toThrow();
  });
});
