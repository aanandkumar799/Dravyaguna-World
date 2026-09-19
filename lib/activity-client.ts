import { ACTIVITY_STORAGE_KEY, readActivity, recordActivity, type PlantActivity } from "./activity";

export function logPlantActivity(plantId: string, type: PlantActivity["type"]) {
  if (typeof window === "undefined") return;
  const next = recordActivity(readActivity(), { plantId, type });
  window.localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("dravyaguna-activity-changed"));
}
