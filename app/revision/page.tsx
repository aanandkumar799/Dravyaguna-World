"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { plantCatalog } from "../../lib/plant/catalog";
import { readBookmarks } from "../../lib/bookmarks";
import { getPlantStats, getModeStats, emptyProgress, PROGRESS_STORAGE_KEY } from "../../lib/learning/progress";
import type { LearningProgress } from "../../lib/learning/types";

export default function RevisionDashboard() {
  const [progress,setProgress]=useState<LearningProgress>(emptyProgress());
  const [savedIds,setSavedIds]=useState<string[]>([]);
  useEffect(()=>{
    const sync=()=>{
      const raw=window.localStorage.getItem(PROGRESS_STORAGE_KEY);
      if(raw){try{setProgress(JSON.parse(raw));}catch{}}
      setSavedIds(readBookmarks());
    };
    sync();
    window.addEventListener("storage",sync);
    window.addEventListener("dravyaguna-bookmarks-changed",sync);
    return ()=>{window.removeEventListener("storage",sync);window.removeEventListener("dravyaguna-bookmarks-changed",sync)};
  },[]);

  const saved=useMemo(()=>savedIds.map(id=>plantCatalog.find(p=>p.id===id)).filter(Boolean),[savedIds]);
  const mcq=getModeStats(progress,"mcq"), flash=getModeStats(progress,"flashcard"), viva=getModeStats(progress,"viva");
  const activeSaved=saved.filter(Boolean).map(plant=>({plant:plant!,stats:getPlantStats(progress,plant!.id)}));
  const untouched=activeSaved.filter(x=>x.stats.attempts===0);

  return <main className="shell page">
    <header className="page-heading"><span className="eyebrow">PERSONAL REVISION</span><h1>Revision Dashboard</h1><p>Bring your saved plants and learning activity together in one place. Your study data stays on this device.</p></header>
    <section className="stats">
      <article><strong>{saved.length}</strong><span>Saved plants</span></article>
      <article><strong>{mcq.attempts}</strong><span>MCQ attempts</span></article>
      <article><strong>{mcq.accuracy}%</strong><span>MCQ accuracy</span></article>
      <article><strong>{flash.attempts+viva.attempts}</strong><span>Other reviews</span></article>
    </section>
    <section><h2>Saved plants to revise</h2>
      {activeSaved.length ? <div className="grid">{activeSaved.map(({plant,stats})=><article className="feature-card" key={plant.id}><span className="eyebrow">{stats.attempts===0?"NOT STARTED":"IN PROGRESS"}</span><h2><i>{plant.identity.botanicalName}</i></h2><p>{plant.names.sanskrit?.join(" · ")}</p><p>{stats.attempts} interactions · {stats.correct} correct MCQs</p><div className="actions"><Link className="button" href={"/plants/"+plant.slug}>Dossier</Link><Link className="button secondary" href={"/learn/mcq?plant="+plant.slug}>Practice MCQ</Link></div></article>)}</div> : <div className="notice"><h3>No saved plants</h3><p>Save plants from the catalog to create a focused revision list.</p><Link className="button" href="/plants">Browse plants →</Link></div>}
    </section>
    <section><h2>What needs attention?</h2>{untouched.length ? <div className="notice"><strong>{untouched.length} saved plant{untouched.length===1?"":"s"} have no recorded study activity.</strong><p>Start with a focused MCQ session or open the dossier.</p></div> : <div className="notice"><strong>Your saved plants have recorded study activity.</strong><p>Keep rotating through MCQ, flashcards and viva practice for revision.</p></div>}</section>
  </main>;
}
