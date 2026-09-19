import type { Flashcard, LearningQuestion, VivaPrompt } from "./types";

export function auditQuestion(q: LearningQuestion): string[] {
  const errors: string[] = [];
  if (!q.id.trim() || !q.plantId.trim()) errors.push("Question ID and plant ID are required");
  if (!q.question.trim()) errors.push("Question text is required");
  if (q.options.length < 2) errors.push("Question needs at least two options");
  if (new Set(q.options.map((x) => x.trim().toLowerCase())).size !== q.options.length) errors.push("Question options must be unique");
  if (q.answerIndex < 0 || q.answerIndex >= q.options.length) errors.push("Answer index is invalid");
  if (!q.explanation.trim()) errors.push("Explanation is required");
  if (q.status === "verified" && q.sourceIds.length === 0) errors.push("Verified question requires source IDs");
  return errors;
}

export function auditFlashcard(f: Flashcard): string[] {
  const errors: string[] = [];
  if (!f.id.trim() || !f.plantId.trim()) errors.push("Flashcard ID and plant ID are required");
  if (!f.front.trim() || !f.back.trim()) errors.push("Front and back are required");
  if (f.status === "verified" && f.sourceIds.length === 0) errors.push("Verified flashcard requires source IDs");
  return errors;
}

export function auditVivaPrompt(v: VivaPrompt): string[] {
  const errors: string[] = [];
  if (!v.id.trim() || !v.plantId.trim()) errors.push("Viva ID and plant ID are required");
  if (!v.prompt.trim()) errors.push("Viva prompt is required");
  if (v.clues.length === 0 || v.clues.some((clue) => !clue.trim())) errors.push("Viva clues are required and must be non-empty");
  if (!v.answer.trim() || !v.explanation.trim()) errors.push("Viva answer and explanation are required");
  if (v.status === "verified" && v.sourceIds.length === 0) errors.push("Verified viva prompt requires source IDs");
  return errors;
}

export function auditLearningCollection(
  questions: LearningQuestion[],
  flashcards: Flashcard[],
  vivaPrompts: VivaPrompt[],
) {
  return {
    questions: questions.flatMap((item) => auditQuestion(item).map((error) => item.id + ": " + error)),
    flashcards: flashcards.flatMap((item) => auditFlashcard(item).map((error) => item.id + ": " + error)),
    viva: vivaPrompts.flatMap((item) => auditVivaPrompt(item).map((error) => item.id + ": " + error)),
  };
}