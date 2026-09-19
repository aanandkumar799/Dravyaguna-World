import type { LearningQuestion } from "./types";
import { plantCatalog } from "../plant/catalog";

function makeQuestion(plant: (typeof plantCatalog)[number], id: string, question: string, options: string[], answerIndex: number, explanation: string): LearningQuestion | null {
  const source = plant.sources.find((item) => item.type === "classical") ?? plant.sources.find((item) => item.type === "taxonomic") ?? plant.sources[0];
  if (!source) return null;
  return { id, plantId: plant.id, question, options, answerIndex, explanation, sourceIds: [source.id], status: "review" };
}

export const learningQuestionBank: LearningQuestion[] = plantCatalog.flatMap((plant) => {
  const out: LearningQuestion[] = [];
  const botanical = makeQuestion(plant, "q-" + plant.slug + "-botanical-name", "Which botanical name is associated with " + (plant.names.sanskrit?.[0] ?? plant.slug) + "?", [plant.identity.botanicalName, "Ocimum tenuiflorum L.", "Terminalia arjuna", "Piper nigrum L."].filter((v,i,a)=>a.indexOf(v)===i), 0, "The botanical identity recorded for this plant is " + plant.identity.botanicalName + ".");
  if (botanical) out.push(botanical);
  if (plant.study?.rasa?.length) {
    const q = makeQuestion(plant, "q-" + plant.slug + "-rasa", "Which Rasa is recorded for " + (plant.names.sanskrit?.[0] ?? plant.slug) + "?", [plant.study.rasa[0], "Madhura", "Tikta", "Kashaya"].filter((v,i,a)=>a.indexOf(v)===i), 0, "The current reviewed plant record lists: " + plant.study.rasa.join(", ") + ".");
    if (q) out.push(q);
  }
  if (plant.study?.virya) {
    const q = makeQuestion(plant, "q-" + plant.slug + "-virya", "Which Virya is recorded for " + (plant.names.sanskrit?.[0] ?? plant.slug) + "?", [plant.study.virya, "Ushna", "Sheeta"].filter((v,i,a)=>a.indexOf(v)===i), 0, "The current reviewed plant record lists " + plant.study.virya + " Virya.");
    if (q) out.push(q);
  }
  if (plant.study?.usefulParts?.length) {
    const q = makeQuestion(plant, "q-" + plant.slug + "-useful-part", "Which is a useful part recorded for " + (plant.names.sanskrit?.[0] ?? plant.slug) + "?", [plant.study.usefulParts[0], "Root", "Leaf", "Fruit"].filter((v,i,a)=>a.indexOf(v)===i), 0, "The reviewed record lists " + plant.study.usefulParts.join(", ") + " as useful parts.");
    if (q) out.push(q);
  }
  return out;
});
