import type { LearningQuestion } from "./types";
import { plantCatalog } from "../plant/catalog";

const unique = (values: string[]) => [...new Set(values.map((v) => v.trim()).filter(Boolean))];

function rotateOptions(answer: string, distractors: string[], seed: string) {
  const values = unique([answer, ...distractors]).filter((value) => value !== answer);
  const ordered = [answer, ...values];
  const shift = seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) % ordered.length;
  const options = ordered.map((_, index) => ordered[(index + shift) % ordered.length]);
  return { options, answerIndex: options.indexOf(answer) };
}

function makeQuestion(
  plant: (typeof plantCatalog)[number],
  id: string,
  question: string,
  answer: string,
  distractors: string[],
  explanation: string,
): LearningQuestion | null {
  const source =
    plant.sources.find((item) => item.type === "classical") ??
    plant.sources.find((item) => item.type === "taxonomic") ??
    plant.sources[0];
  const cleanDistractors = unique(distractors).filter((item) => item !== answer);
  if (!source || !answer.trim() || cleanDistractors.length < 2) return null;

  const { options, answerIndex } = rotateOptions(answer, cleanDistractors.slice(0, 3), id);
  return {
    id,
    plantId: plant.id,
    question,
    options,
    answerIndex,
    explanation,
    sourceIds: [source.id],
    status: "review",
  };
}

const botanicalNames = plantCatalog.map((plant) => plant.identity.botanicalName);
const families = plantCatalog.map((plant) => plant.taxonomy.family ?? "").filter(Boolean);
const rasas = plantCatalog.flatMap((plant) => plant.study?.rasa ?? []);
const viryas = plantCatalog.map((plant) => plant.study?.virya ?? "").filter(Boolean);
const usefulParts = plantCatalog.flatMap((plant) => plant.study?.usefulParts ?? []);

export const learningQuestionBank: LearningQuestion[] = plantCatalog.flatMap((plant) => {
  const out: LearningQuestion[] = [];
  const name = plant.names.sanskrit?.[0] ?? plant.slug;

  const botanical = makeQuestion(
    plant,
    "q-" + plant.slug + "-botanical-name",
    "Which botanical name is associated with " + name + "?",
    plant.identity.botanicalName,
    botanicalNames,
    "The canonical plant record associates " + name + " with " + plant.identity.botanicalName + ".",
  );
  if (botanical) out.push(botanical);

  const family = makeQuestion(
    plant,
    "q-" + plant.slug + "-family",
    "Which botanical family is recorded for " + name + "?",
    plant.taxonomy.family ?? "",
    families,
    "The current canonical record lists " + (plant.taxonomy.family ?? "no family") + " as the family.",
  );
  if (family) out.push(family);

  if (plant.study?.rasa?.length) {
    const q = makeQuestion(
      plant,
      "q-" + plant.slug + "-rasa",
      "Which Rasa is recorded for " + name + "?",
      plant.study.rasa[0],
      rasas,
      "The current reviewed plant record lists: " + plant.study.rasa.join(", ") + ".",
    );
    if (q) out.push(q);
  }

  if (plant.study?.virya) {
    const q = makeQuestion(
      plant,
      "q-" + plant.slug + "-virya",
      "Which Virya is recorded for " + name + "?",
      plant.study.virya,
      viryas,
      "The current reviewed plant record lists " + plant.study.virya + " Virya.",
    );
    if (q) out.push(q);
  }

  if (plant.study?.usefulParts?.length) {
    const q = makeQuestion(
      plant,
      "q-" + plant.slug + "-useful-part",
      "Which is a useful part recorded for " + name + "?",
      plant.study.usefulParts[0],
      usefulParts,
      "The reviewed record lists " + plant.study.usefulParts.join(", ") + " as useful parts.",
    );
    if (q) out.push(q);
  }

  return out;
});