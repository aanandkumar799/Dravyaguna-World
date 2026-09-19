import { describe, expect, it } from "vitest";
import { learningQuestionBank } from "./question-bank";
import { flashcardBank } from "./flashcard-bank";
import { vivaBank } from "./viva-bank";
import { auditLearningCollection } from "./quality";

describe("learning content quality", () => {
  it("has no structural errors in the current learning banks", () => {
    const result = auditLearningCollection(learningQuestionBank, flashcardBank, vivaBank);
    expect(result.questions).toEqual([]);
    expect(result.flashcards).toEqual([]);
    expect(result.viva).toEqual([]);
  });

  it("keeps every learning item linked to a canonical plant", () => {
    expect(new Set(learningQuestionBank.map((q) => q.plantId)).size).toBeGreaterThan(0);
    expect(new Set(flashcardBank.map((f) => f.plantId)).size).toBeGreaterThan(0);
    expect(new Set(vivaBank.map((v) => v.plantId)).size).toBeGreaterThan(0);
  });
});