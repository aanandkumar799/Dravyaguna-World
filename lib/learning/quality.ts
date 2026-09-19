import type { Flashcard, LearningQuestion, VivaPrompt } from "./types";

export function auditQuestion(q: LearningQuestion): string[] {
  const errors:string[]=[];
  if(typeof q.id!=="string"||!q.id.trim()||typeof q.plantId!=="string"||!q.plantId.trim()) errors.push("Question ID and plant ID are required");
  if(typeof q.question!=="string"||!q.question.trim()) errors.push("Question text is required");
  if(!Array.isArray(q.options)||q.options.length<2) errors.push("Question needs at least two options");
  else {
    const normalized=q.options.map((x)=>typeof x==="string"?x.trim().toLowerCase():"");
    if(normalized.some((x)=>!x)||new Set(normalized).size!==q.options.length) errors.push("Question options must be unique and non-empty");
    if(typeof q.answerIndex!=="number"||q.answerIndex<0||q.answerIndex>=q.options.length) errors.push("Answer index is invalid");
  }
  if(typeof q.explanation!=="string"||!q.explanation.trim()) errors.push("Explanation is required");
  if(q.status==="verified"&&(!Array.isArray(q.sourceIds)||q.sourceIds.length===0)) errors.push("Verified question requires source IDs");
  return errors;
}

export function auditFlashcard(f: Flashcard):string[]{
 const errors:string[]=[];
 if(typeof f.id!=="string"||!f.id.trim()||typeof f.plantId!=="string"||!f.plantId.trim()) errors.push("Flashcard ID and plant ID are required");
 if(typeof f.front!=="string"||typeof f.back!=="string"||!f.front.trim()||!f.back.trim()) errors.push("Front and back are required");
 if(f.status==="verified"&&(!Array.isArray(f.sourceIds)||f.sourceIds.length===0)) errors.push("Verified flashcard requires source IDs");
 return errors;
}

export function auditVivaPrompt(v: VivaPrompt):string[]{
 const errors:string[]=[];
 if(typeof v.id!=="string"||!v.id.trim()||typeof v.plantId!=="string"||!v.plantId.trim()) errors.push("Viva ID and plant ID are required");
 if(typeof v.prompt!=="string"||!v.prompt.trim()) errors.push("Viva prompt is required");
 if(!Array.isArray(v.clues)||v.clues.length===0||v.clues.some((clue)=>typeof clue!=="string"||!clue.trim())) errors.push("Viva clues are required and must be non-empty");
 if(typeof v.answer!=="string"||typeof v.explanation!=="string"||!v.answer.trim()||!v.explanation.trim()) errors.push("Viva answer and explanation are required");
 if(v.status==="verified"&&(!Array.isArray(v.sourceIds)||v.sourceIds.length===0)) errors.push("Verified viva prompt requires source IDs");
 return errors;
}

export function auditLearningCollection(questions:LearningQuestion[],flashcards:Flashcard[],vivaPrompts:VivaPrompt[]){
 return {questions:questions.flatMap((item)=>auditQuestion(item).map((error)=>item.id+": "+error)),flashcards:flashcards.flatMap((item)=>auditFlashcard(item).map((error)=>item.id+": "+error)),viva:vivaPrompts.flatMap((item)=>auditVivaPrompt(item).map((error)=>item.id+": "+error))};
}