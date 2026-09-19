export type LearningStatus = "draft" | "review" | "verified";

export type LearningQuestion = {
  id: string;
  plantId: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  sourceIds: string[];
  status: LearningStatus;
};

export type Flashcard = {
  id: string;
  plantId: string;
  front: string;
  back: string;
  sourceIds: string[];
  status: LearningStatus;
};

export type VivaPrompt = {
  id: string;
  plantId: string;
  prompt: string;
  clues: string[];
  answer: string;
  explanation: string;
  sourceIds: string[];
  status: LearningStatus;
};

export type LearningMode = "mcq" | "flashcard" | "viva";

export type LearningAttempt = {
  id: string;
  mode: LearningMode;
  itemId: string;
  plantId: string;
  outcome: "correct" | "incorrect" | "revealed" | "skipped";
  occurredAt: string;
};

export type LearningProgress = {
  version: 1;
  attempts: LearningAttempt[];
};