import { z } from "zod";
import type { LearningAttempt, LearningMode, LearningProgress } from "./types";

export const PROGRESS_STORAGE_KEY = "dravyaguna-world-learning-progress-v1";
export const MAX_STORED_ATTEMPTS = 2000;

const learningAttemptSchema = z.object({
  id: z.string().min(1),
  mode: z.enum(["mcq", "flashcard", "viva"]),
  itemId: z.string().min(1),
  plantId: z.string().min(1),
  outcome: z.enum(["correct", "incorrect", "revealed", "skipped"]),
  occurredAt: z.string().datetime(),
}).strict();

export const learningProgressSchema = z.object({
  version: z.literal(1),
  attempts: z.array(learningAttemptSchema).max(MAX_STORED_ATTEMPTS),
}).strict();

export function emptyProgress(): LearningProgress { return { version: 1, attempts: [] }; }

export function readProgress(): LearningProgress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = learningProgressSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : emptyProgress();
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(progress: LearningProgress): void {
  if (typeof window === "undefined") return;
  const parsed = learningProgressSchema.safeParse(progress);
  if (parsed.success) window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(parsed.data));
}

export function recordAttempt(progress: LearningProgress, input: Omit<LearningAttempt, "id" | "occurredAt">, now = new Date()): LearningProgress {
  const attempt: LearningAttempt = { ...input, id: input.mode + "-" + input.itemId + "-" + now.getTime(), occurredAt: now.toISOString() };
  return { ...progress, attempts: [...progress.attempts, attempt].slice(-MAX_STORED_ATTEMPTS) };
}

export function getModeStats(progress: LearningProgress, mode: LearningMode) {
  const attempts = progress.attempts.filter((attempt) => attempt.mode === mode);
  const scored = attempts.filter((attempt) => attempt.outcome === "correct" || attempt.outcome === "incorrect");
  const correct = scored.filter((attempt) => attempt.outcome === "correct").length;
  return { attempts: attempts.length, scored: scored.length, correct, accuracy: scored.length ? Math.round((correct / scored.length) * 100) : 0 };
}

export function getPlantStats(progress: LearningProgress, plantId: string) {
  const attempts = progress.attempts.filter((attempt) => attempt.plantId === plantId);
  return { attempts: attempts.length, correct: attempts.filter((a) => a.outcome === "correct").length };
}
