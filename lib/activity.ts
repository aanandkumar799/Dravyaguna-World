export const ACTIVITY_STORAGE_KEY = "dravyaguna-world-activity-v1";

export type PlantActivity = {
  id: string;
  plantId: string;
  type: "viewed" | "mcq" | "flashcard" | "viva" | "bookmarked" | "noted";
  occurredAt: string;
};

export function readActivity(): PlantActivity[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(ACTIVITY_STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value.filter((a): a is PlantActivity =>
      a && typeof a.id==="string" && typeof a.plantId==="string" && typeof a.type==="string" && typeof a.occurredAt==="string"
    ) : [];
  } catch { return []; }
}

export function recordActivity(items: PlantActivity[], input: Omit<PlantActivity,"id"|"occurredAt">, now=new Date()): PlantActivity[] {
  const item: PlantActivity = {...input,id:`activity-${input.plantId}-${input.type}-${now.getTime()}`,occurredAt:now.toISOString()};
  return [item,...items].slice(0,100);
}
