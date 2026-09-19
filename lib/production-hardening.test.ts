import { describe, expect, it } from "vitest";
import { safeParsePlant } from "../lib/plant/schema";
import { emptyProgress, learningProgressSchema, recordAttempt } from "../lib/learning/progress";

describe("canonical plant schema", () => {
  it("rejects malformed plant identifiers", () => {
    const result = safeParsePlant({
      id: "bad",
      slug: "Tulasi",
      identity: { botanicalName: "Ocimum tenuiflorum" },
      names: {},
      taxonomy: {},
      status: "review",
      sources: [],
      images: [],
    });
    expect(result.success).toBe(false);
  });

  it("accepts image provenance metadata", () => {
    const result = safeParsePlant({
      id: "plant-example",
      slug: "example",
      identity: { botanicalName: "Example plant" },
      names: {},
      taxonomy: {},
      status: "review",
      sources: [],
      images: [{
        id: "img-1",
        part: "leaf",
        alt: "Example plant leaf",
        sourcePageUrl: "https://example.com/image",
        licenseUrl: "https://example.com/license",
        verification: "reviewed",
      }],
    });
    expect(result.success).toBe(true);
  });
});

describe("learning progress persistence", () => {
  it("rejects corrupted progress payloads", () => {
    expect(learningProgressSchema.safeParse({ version: 1, attempts: [{ bad: true }] }).success).toBe(false);
  });

  it("caps stored attempts", () => {
    let progress = emptyProgress();
    for (let i = 0; i < 2010; i += 1) {
      progress = recordAttempt(progress, {
        mode: "mcq",
        itemId: String(i),
        plantId: "plant-example",
        outcome: "correct",
      });
    }
    expect(progress.attempts).toHaveLength(2000);
  });
});
