"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { flashcardBank } from "../../../lib/learning/flashcard-bank";
import { plantCatalog } from "../../../lib/plant/catalog";
import { useSearchParams } from "next/navigation";
import { emptyProgress, getModeStats, PROGRESS_STORAGE_KEY, recordAttempt } from "../../../lib/learning/progress";
import type { LearningProgress } from "../../../lib/learning/types";

export default function Flashcards() {
  const [i,setI]=useState(0); const [flip,setFlip]=useState(false);
  const [progress,setProgress]=useState<LearningProgress>(emptyProgress());
  const searchParams = useSearchParams();
  const plantSlug = searchParams.get("plant");
  const plantFilter = plantSlug ? plantCatalog.find((item) => item.slug === plantSlug) : undefined;
  const cards = useMemo(() => plantFilter ? flashcardBank.filter((item) => item.plantId === plantFilter.id) : flashcardBank, [plantFilter]);
  const card=cards[i%cards.length]; const plant=plantCatalog.find(p=>p.id===card.plantId);
  useEffect(()=>{const raw=window.localStorage.getItem(PROGRESS_STORAGE_KEY);if(raw){try{setProgress(JSON.parse(raw));}catch{}}},[]);
  const next=()=>{const updated=recordAttempt(progress,{mode:"flashcard",itemId:card.id,plantId:card.plantId,outcome:flip?"revealed":"skipped"});setProgress(updated);window.localStorage.setItem(PROGRESS_STORAGE_KEY,JSON.stringify(updated));setI(i+1);setFlip(false);};
  const stats=getModeStats(progress,"flashcard");
  return <main className="shell page"><Link href="/learn">← Learn</Link><header className="page-heading"><span className="eyebrow">RAPID REVISION · REVIEW</span><h1>Flashcards</h1><p>{plantFilter ? <>Focused practice: <i>{plantFilter.identity.botanicalName}</i> · </> : null}{stats.attempts} cards reviewed</p></header>
    <button className="flashcard" onClick={()=>setFlip(!flip)} aria-label="Flip flashcard">{!flip?<><span className="muted">PLANT</span><strong>{card.front}</strong><small>Tap to reveal</small></>:<><span className="muted">BOTANICAL IDENTITY</span><strong>{card.back}</strong><small>Source: {card.sourceIds.join(", ")}</small></>}</button>
    {plant&&<Link href={"/plants/"+plant.slug}>Open plant dossier →</Link>}<button onClick={next}>Next card →</button></main>;
}