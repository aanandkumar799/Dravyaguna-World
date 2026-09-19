import type { LearningAttempt, LearningMode, LearningProgress } from "./types";

export const PROGRESS_STORAGE_KEY = "dravyaguna-world-learning-progress-v1";
export const MAX_STORED_ATTEMPTS = 2000;

export function emptyProgress(): LearningProgress {
  return { version: 1, attempts: [] };
}

export function recordAttempt(
  progress: LearningProgress,
  input: Omit<LearningAttempt, "id" | "occurredAt">,
  now = new Date(),
): LearningProgress {
  const attempt: LearningAttempt = {
    ...input,
    id: `${input.mode}-${input.itemId}-${now.getTime()}`,
    occurredAt: now.toISOString(),
  };
  return { ...progress, attempts: [...progress.attempts, attempt].slice(-MAX_STORED_ATTEMPTS) };
}

export function getModeStats(progress: LearningProgress, mode: LearningMode) {
  const attempts = progress.attempts.filter((attempt) => attempt.mode === mode);
  const scored = attempts.filter((attempt) => attempt.outcome === "correct" || attempt.outcome === "incorrect");
  const correct = scored.filter((attempt) => attempt.outcome === "correct").length;
  return {
    attempts: attempts.length,
    scored: scored.length,
    correct,
    accuracy: scored.length ? Math.round((correct / scored.length) * 100) : 0,
  };
}

export function getPlantStats(progress: LearningProgress, plantId: string) {
  const attempts = progress.attempts.filter((attempt) => attempt.plantId === plantId);
  return { attempts: attempts.length, correct: attempts.filter((a) => a.outcome === "correct").length };
}
