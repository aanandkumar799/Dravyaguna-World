import { plantCatalog } from "../plant/catalog";
import { learningQuestionBank } from "../learning/question-bank";
import { flashcardBank } from "../learning/flashcard-bank";
import { vivaBank } from "../learning/viva-bank";
import { normalize } from "./normalize";

export type SearchResult = {
  kind: "plant" | "mcq" | "flashcard" | "viva";
  title: string;
  subtitle: string;
  href: string;
  plantId: string;
};

function scoreText(text: string, query: string) {
  const value = normalize(text);
  const q = normalize(query);
  if (!q || !value) return 0;
  if (value === q) return 100;
  if (value.startsWith(q)) return 90;
  if (value.includes(q)) return 70;
  return q.split(" ").every((token) => value.includes(token)) ? 45 : 0;
}

function plantLearningHref(kind: "mcq" | "flashcard" | "viva", plantId: string) {
  const plant = plantCatalog.find((item) => item.id === plantId);
  return plant ? `/learn/${kind}?plant=${encodeURIComponent(plant.slug)}` : `/learn/${kind}`;
}

export function globalSearch(query: string): SearchResult[] {
  const q = normalize(query);
  if (!q) return [];

  const plants = plantCatalog.map((plant) => {
    const searchable = [
      plant.identity.botanicalName,
      plant.identity.authority ?? "",
      plant.taxonomy.family ?? "",
      plant.taxonomy.genus ?? "",
      plant.names.sanskrit?.join(" ") ?? "",
      plant.names.common?.join(" ") ?? "",
      plant.names.regional?.join(" ") ?? "",
      plant.names.synonyms?.join(" ") ?? "",
      plant.study?.usefulParts?.join(" ") ?? "",
    ].join(" ");
    return {
      result: {
        kind: "plant" as const,
        title: plant.names.sanskrit?.[0] ?? plant.identity.botanicalName,
        subtitle: plant.identity.botanicalName + (plant.taxonomy.family ? " · " + plant.taxonomy.family : ""),
        href: "/plants/" + plant.slug,
        plantId: plant.id,
      },
      score: scoreText(searchable, q),
    };
  });

  const learning = [
    ...learningQuestionBank.map((item) => ({ kind: "mcq" as const, title: item.question, subtitle: "MCQ practice", href: plantLearningHref("mcq", item.plantId), plantId: item.plantId })),
    ...flashcardBank.map((item) => ({ kind: "flashcard" as const, title: item.front, subtitle: "Flashcard", href: plantLearningHref("flashcards", item.plantId), plantId: item.plantId })),
    ...vivaBank.map((item) => ({ kind: "viva" as const, title: item.prompt, subtitle: "Viva practice", href: plantLearningHref("viva", item.plantId), plantId: item.plantId })),
  ].map((item) => {
    const plant = plantCatalog.find((p) => p.id === item.plantId);
    const context = [
      item.title,
      item.subtitle,
      plant?.names.sanskrit?.join(" ") ?? "",
      plant?.identity.botanicalName ?? "",
      plant?.taxonomy.family ?? "",
    ].join(" ");
    return { result: item, score: scoreText(context, q) };
  });

  return [...plants, ...learning]
    .filter((item) => item.score > 0)
    .sort((a,b) => b.score - a.score || a.result.title.localeCompare(b.result.title))
    .map((item) => item.result)
    .slice(0, 50);
}