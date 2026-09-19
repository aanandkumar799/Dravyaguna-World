"use client";
import { useEffect, useState } from "react";
import { emptyProgress, getPlantStats, getModeStats, PROGRESS_STORAGE_KEY } from "../../../lib/learning/progress";
import type { LearningProgress } from "../../../lib/learning/types";

export default function PlantStudyProgress({ plantId }: { plantId: string }) {
  const [progress,setProgress]=useState<LearningProgress>(emptyProgress());
  useEffect(()=>{const raw=window.localStorage.getItem(PROGRESS_STORAGE_KEY);if(raw){try{setProgress(JSON.parse(raw));}catch{}}},[]);
  const plant=getPlantStats(progress,plantId);
  const modes=(["mcq","flashcard","viva"] as const).map(mode=>[mode,getModeStats(progress,mode)] as const);
  return <section className="notice" aria-label="Study progress"><h2>Your study progress</h2><p>{plant.attempts} learning interactions recorded for this plant · {plant.correct} correct MCQ answers.</p><div className="chip-list">{modes.map(([mode,stats])=><span className="chip" key={mode}>{mode.toUpperCase()}: {stats.attempts}</span>)}</div></section>;
}