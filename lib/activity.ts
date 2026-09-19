import { z } from "zod";

export const ACTIVITY_STORAGE_KEY = "dravyaguna-world-activity-v1";

export const plantActivitySchema = z.object({
  id: z.string().min(1),
  plantId: z.string().min(1),
  type: z.enum(["viewed", "mcq", "flashcard", "viva", "bookmarked", "noted"]),
  occurredAt: z.string().datetime(),
}).strict();

export type PlantActivity = z.infer<typeof plantActivitySchema>;

export function readActivity(): PlantActivity[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(ACTIVITY_STORAGE_KEY) || "[]");
    const parsed = z.array(plantActivitySchema).safeParse(value);
    return parsed.success ? parsed.data.slice(0, 100) : [];
  } catch { return []; }
}

export function recordActivity(items: PlantActivity[], input: Omit<PlantActivity, "id" | "occurredAt">, now = new Date()): PlantActivity[] {
  const item: PlantActivity = { ...input, id: `activity-${input.plantId}-${input.type}-${now.getTime()}`, occurredAt: now.toISOString() };
  return [item, ...items].slice(0, 100);
}
