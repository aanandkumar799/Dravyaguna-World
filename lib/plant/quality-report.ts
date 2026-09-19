import { plantCatalog } from "./catalog";
import { auditPlant } from "./quality";
import { learningQuestionBank } from "../learning/question-bank";
import { flashcardBank } from "../learning/flashcard-bank";
import { vivaBank } from "../learning/viva-bank";
import { auditLearningCollection } from "../learning/quality";

export function buildQualityReport() {
  const plants=plantCatalog.map((plant)=>{
    const issues=auditPlant(plant);
    return {plant,errors:issues.filter((i)=>i.severity==="error"),warnings:issues.filter((i)=>i.severity==="warning")};
  });
  const learning=auditLearningCollection(learningQuestionBank,flashcardBank,vivaBank);
  const learningErrors=[...learning.questions,...learning.flashcards,...learning.viva];
  return {plants,learning,totals:{
    plantErrors:plants.reduce((n,p)=>n+p.errors.length,0),
    plantWarnings:plants.reduce((n,p)=>n+p.warnings.length,0),
    learningErrors:learningErrors.length,
    learningWarnings:0
  }};
}