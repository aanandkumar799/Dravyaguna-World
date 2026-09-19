import { plantCatalog } from "./catalog";
import { auditPlant } from "./quality";
import { learningQuestionBank } from "../learning/question-bank";
import { flashcardBank } from "../learning/flashcard-bank";
import { vivaBank } from "../learning/viva-bank";
import { auditLearningCollection } from "../learning/quality";

export type QualitySeverity = "error" | "warning";
export type QualityIssue = { severity: QualitySeverity; message: string };

export function buildQualityReport() {
  const plants = plantCatalog.map((plant) => {
    const audit = auditPlant(plant);
    return { plant, errors: audit.errors, warnings: audit.warnings };
  });
  const learning = auditLearningCollection([...learningQuestionBank, ...flashcardBank, ...vivaBank]);
  return {
    plants,
    learning,
    totals: {
      plantErrors: plants.reduce((n, p) => n + p.errors.length, 0),
      plantWarnings: plants.reduce((n, p) => n + p.warnings.length, 0),
      learningErrors: learning.errors.length,
      learningWarnings: learning.warnings.length,
    },
  };
}
