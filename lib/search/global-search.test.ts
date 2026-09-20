import { describe, expect, it } from "vitest";
import { globalSearch } from "./global-search";

describe("global search", () => {
  it("returns no results for an empty query", () => {
    expect(globalSearch("")).toEqual([]);
    expect(globalSearch("   ")).toEqual([]);
  });

  it("finds a plant by botanical name", () => {
    const results = globalSearch("Ocimum");
    expect(results.some((result) => result.kind === "plant" && result.href === "/plants/tulasi")).toBe(true);
  });

  it("finds learning content through plant context", () => {
    const results = globalSearch("Tulasi");
    expect(results.some((result) => result.kind !== "plant")).toBe(true);
  });

  it("caps results at the documented maximum", () => {
    expect(globalSearch("a").length).toBeLessThanOrEqual(50);
  });
});
