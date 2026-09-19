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