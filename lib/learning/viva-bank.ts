import type { LearningQuestion } from "./types";
import { plantCatalog } from "../plant/catalog";

export const vivaBank: LearningQuestion[] = plantCatalog.flatMap((plant) => {
  const source = plant.sources.find((s) => s.type === "taxonomic") ?? plant.sources[0];
  if (!source) return [];
  const clues = [
    plant.taxonomy.family ? "Family: " + plant.taxonomy.family : null,
    plant.study?.usefulParts?.length ? "Useful parts: " + plant.study.usefulParts.join(", ") : null,
    plant.study?.habit ? "Habit: " + plant.study.habit : null,
    plant.study?.identificationFeatures?.length ? "Identification: " + plant.study.identificationFeatures.join("; ") : null
  ].filter(Boolean);
  return [{
    id: "viva-" + plant.slug + "-identify",
    plantId: plant.id,
    question: "Identify the plant from these clues:\n" + clues.join("\n"),
    options: [plant.names.sanskrit?.[0] ?? plant.slug],
    answerIndex: 0,
    explanation: "Answer: " + (plant.names.sanskrit?.[0] ?? plant.slug) + " — " + plant.identity.botanicalName + ".",
    sourceIds: [source.id],
    status: "review" as const
  }];
});
