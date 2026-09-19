"use client";

import { useEffect } from "react";
import { ACTIVITY_STORAGE_KEY, readActivity, recordActivity } from "../../../lib/activity";

export default function PlantActivityTracker({ plantId }: { plantId: string }) {
  useEffect(() => {
    const next = recordActivity(readActivity(), { plantId, type: "viewed" });
    window.localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("dravyaguna-activity-changed"));
  }, [plantId]);
  return null;
}
