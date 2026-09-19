import type { VivaPrompt } from "./types";
import { plantCatalog } from "../plant/catalog";

export const vivaBank: VivaPrompt[] = plantCatalog.flatMap((plant) => {
  const source = plant.sources.find((item) => item.type === "taxonomic") ?? plant.sources[0];
  if (!source) return [];

  const clues = [
    plant.taxonomy.family ? "Family: " + plant.taxonomy.family : null,
    plant.study?.usefulParts?.length ? "Useful parts: " + plant.study.usefulParts.join(", ") : null,
    plant.study?.habit ? "Habit: " + plant.study.habit : null,
    plant.study?.identificationFeatures?.length ? "Identification: " + plant.study.identificationFeatures.join("; ") : null,
  ].filter((value): value is string => Boolean(value));

  if (clues.length === 0) return [];

  const answer = plant.names.sanskrit?.[0] ?? plant.slug;
  return [{
    id: "viva-" + plant.slug + "-identify",
    plantId: plant.id,
    prompt: "Identify the plant from the following clues.",
    clues,
    answer,
    explanation: answer + " is recorded as " + plant.identity.botanicalName + ".",
    sourceIds: [source.id],
    status: "review" as const,
  }];
});