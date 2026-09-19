"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { vivaBank } from "../../../lib/learning/viva-bank";
import { plantCatalog } from "../../../lib/plant/catalog";
import { useSearchParams } from "next/navigation";
import { emptyProgress, getModeStats, PROGRESS_STORAGE_KEY, recordAttempt } from "../../../lib/learning/progress";
import type { LearningProgress } from "../../../lib/learning/types";

export default function Viva() {
  const [i,setI]=useState(0); const [revealed,setRevealed]=useState(false);
  const [progress,setProgress]=useState<LearningProgress>(emptyProgress());
  const searchParams = useSearchParams();
  const plantSlug = searchParams.get("plant");
  const plantFilter = plantSlug ? plantCatalog.find((item) => item.slug === plantSlug) : undefined;
  const prompts = useMemo(() => plantFilter ? vivaBank.filter((item) => item.plantId === plantFilter.id) : vivaBank, [plantFilter]);
  const q=prompts[i%prompts.length]; const p=plantCatalog.find(x=>x.id===q.plantId);
  useEffect(()=>{const raw=window.localStorage.getItem(PROGRESS_STORAGE_KEY);if(raw){try{setProgress(JSON.parse(raw));}catch{}}},[]);
  const next=()=>{const updated=recordAttempt(progress,{mode:"viva",itemId:q.id,plantId:q.plantId,outcome:revealed?"revealed":"skipped"});setProgress(updated);window.localStorage.setItem(PROGRESS_STORAGE_KEY,JSON.stringify(updated));setI(i+1);setRevealed(false);};
  const stats=getModeStats(progress,"viva");
  return <main className="shell page"><Link href="/learn">← Learn</Link><header className="page-heading"><span className="eyebrow">ORAL PRACTICE · REVIEW</span><h1>Viva Mode</h1><p>{plantFilter ? <>Focused practice: <i>{plantFilter.identity.botanicalName}</i> · </> : null}{stats.attempts} prompts practiced</p></header>
    <article className="quiz-card"><span className="muted">Prompt {i+1} of {vivaBank.length}</span><h2>{q.prompt}</h2><ul>{q.clues.map(clue=><li key={clue}>{clue}</li>)}</ul>
    <button onClick={()=>setRevealed(true)}>Reveal answer</button>{revealed&&<div className="result"><h3>{q.answer} — <i>{p?.identity.botanicalName}</i></h3><p>{q.explanation}</p><p>Source: {q.sourceIds.join(", ")}</p>{p&&<Link href={"/plants/"+p.slug}>Open dossier →</Link>}</div>}
    <button onClick={next}>Next prompt →</button></article></main>;
}