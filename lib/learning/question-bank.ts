import type { LearningQuestion } from "./types";
import { plantCatalog } from "../plant/catalog";

export const learningQuestionBank: LearningQuestion[] = plantCatalog.flatMap((plant) => {
  const source = plant.sources.find((item) => item.type === "taxonomic") ?? plant.sources[0];
  if (!source) return [];
  return [{
    id: "q-" + plant.slug + "-botanical-name",
    plantId: plant.id,
    question: "Which botanical name is associated with " + (plant.names.sanskrit?.[0] ?? plant.slug) + "?",
    options: [plant.identity.botanicalName, "Ocimum tenuiflorum L.", "Terminalia arjuna", "Piper nigrum L."].filter((value, index, all) => all.indexOf(value) === index),
    answerIndex: 0,
    explanation: "The botanical identity recorded for this plant is " + plant.identity.botanicalName + ".",
    sourceIds: [source.id],
    status: "review" as const
  }];
});
