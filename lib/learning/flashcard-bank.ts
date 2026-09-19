import type { Flashcard } from "./types";
import { plantCatalog } from "../plant/catalog";

export const flashcardBank: Flashcard[] = plantCatalog.flatMap((plant) => {
  const source = plant.sources.find((item) => item.type === "classical") ?? plant.sources[0];
  if (!source) return [];
  return [{
    id: "fc-" + plant.slug + "-identity",
    plantId: plant.id,
    front: plant.names.sanskrit?.[0] ?? plant.slug,
    back: plant.identity.botanicalName + (plant.taxonomy.family ? " — " + plant.taxonomy.family : ""),
    sourceIds: [source.id],
    status: "review" as const
  }];
});
