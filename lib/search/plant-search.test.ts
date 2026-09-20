import { describe, expect, it } from "vitest";
import { searchPlants, scorePlant } from "./plant-search";

const plants = [{
  identity: { botanicalName: "Ocimum tenuiflorum" },
  names: { sanskrit: ["Tulasi"], common: ["Holy basil"] },
  taxonomy: { family: "Lamiaceae" },
  sources: [], images: [], id: "plant-tulasi", slug: "tulasi", status: "verified",
}];

describe("plant search", () => {
  it("matches botanical names", () => expect(searchPlants(plants as any, "Ocimum").length).toBe(1));
  it("matches Sanskrit names", () => expect(searchPlants(plants as any, "Tulasi")[0]?.plant.id).toBe("plant-tulasi"));
  it("ignores empty and whitespace-only queries", () => {
    expect(searchPlants(plants as any, "")).toEqual([]);
    expect(searchPlants(plants as any, "   ")).toEqual([]);
  });
  it("normalizes punctuation and case", () => {
    expect(searchPlants(plants as any, "  OCIMUM-TENUFLORUM ")).toHaveLength(1);
  });
  it("scores exact matches above partial matches", () => {
    expect(scorePlant(plants[0] as any, "Tulasi")).toBeGreaterThan(scorePlant(plants[0] as any, "Tula"));
  });
});