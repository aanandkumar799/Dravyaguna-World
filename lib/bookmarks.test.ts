import { describe, expect, it } from "vitest";
import { isBookmarked, toggleBookmark } from "./bookmarks";

describe("bookmarks", () => {
  it("toggles a plant without duplicating it", () => {
    expect(toggleBookmark([], "plant-tulasi")).toEqual(["plant-tulasi"]);
    expect(toggleBookmark(["plant-tulasi"], "plant-tulasi")).toEqual([]);
    expect(toggleBookmark(["plant-tulasi"], "plant-ashwagandha")).toEqual([
      "plant-tulasi",
      "plant-ashwagandha",
    ]);
  });

  it("detects saved plants", () => {
    expect(isBookmarked(["plant-tulasi"], "plant-tulasi")).toBe(true);
    expect(isBookmarked(["plant-tulasi"], "plant-brahmi")).toBe(false);
  });
});
