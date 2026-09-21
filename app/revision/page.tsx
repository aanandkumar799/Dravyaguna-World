"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { plantCatalog } from "../../lib/plant/catalog";
import { readBookmarks } from "../../lib/bookmarks";
import { getPlantStats, getModeStats, emptyProgress, readProgress } from "../../lib/learning/progress";
import { readActivity, type PlantActivity } from "../../lib/activity";
import type { LearningProgress } from "../../lib/learning/types";

const labels: Record<PlantActivity["type"],string>={viewed:"Viewed",mcq:"MCQ",flashcard:"Flashcard",viva:"Viva",bookmarked:"Saved",noted:"Note updated"};

export default function RevisionDashboard(){
 const [progress,setProgress]=useState<LearningProgress>(emptyProgress()),[savedIds,setSavedIds]=useState<string[]>([]),[activity,setActivity]=useState<PlantActivity[]>([]);
 useEffect(()=>{const sync=()=>{setProgress(readProgress());setSavedIds(readBookmarks());setActivity(readActivity())};sync();window.addEventListener("storage",sync);window.addEventListener("dravyaguna-bookmarks-changed",sync);window.addEventListener("dravyaguna-activity-changed",sync);return()=>{window.removeEventListener("storage",sync);window.removeEventListener("dravyaguna-bookmarks-changed",sync);window.removeEventListener("dravyaguna-activity-changed",sync)}},[]);
 const saved=useMemo(()=>savedIds.map(id=>plantCatalog.find(p=>p.id===id)).filter(Boolean),[savedIds]);
 const mcq=getModeStats(progress,"mcq"),flash=getModeStats(progress,"flashcard"),viva=getModeStats(progress,"viva");
 const activeSaved=saved.map(plant=>({plant:plant!,stats:getPlantStats(progress,plant!.id)})),untouched=activeSaved.filter(x=>x.stats.attempts===0);
 const recent=activity.slice(0,8).map(a=>({...a,plant:plantCatalog.find(p=>p.id===a.plantId)})).filter(x=>x.plant);
 return <main className="shell page"><header className="page-heading"><span className="eyebrow">PERSONAL REVISION</span><h1>Revision Dashboard</h1><p>Bring your saved plants and learning activity together in one place. Your study data stays on this device.</p></header>
 <section className="stats"><article><strong>{saved.length}</strong><span>Saved plants</span></article><article><strong>{mcq.attempts}</strong><span>MCQ attempts</span></article><article><strong>{mcq.accuracy}%</strong><span>MCQ accuracy</span></article><article><strong>{flash.attempts+viva.attempts}</strong><span>Other reviews</span></article></section>
 <section><h2>Recent activity</h2>{recent.length?<div className="grid">{recent.map(a=><article className="feature-card" key={a.id}><span className="eyebrow">{labels[a.type]} · {new Date(a.occurredAt).toLocaleString()}</span><h3><i>{a.plant!.identity.botanicalName}</i></h3><p>{a.plant!.names.sanskrit?.join(" · ")}</p><Link className="button secondary" href={"/plants/"+a.plant!.slug}>Open dossier →</Link></article>)}</div>:<div className="notice"><p>No recent activity yet. Open a plant dossier to start building your local study history.</p><Link className="button" href="/plants">Browse plants →</Link></div>}</section>
 <section><h2>Saved plants to revise</h2>{activeSaved.length?<div className="grid">{activeSaved.map(({plant,stats})=><article className="feature-card" key={plant.id}><span className="eyebrow">{stats.attempts===0?"NOT STARTED":"IN PROGRESS"}</span><h2><i>{plant.identity.botanicalName}</i></h2><p>{plant.names.sanskrit?.join(" · ")}</p><p>{stats.attempts} interactions · {stats.correct} correct MCQs</p><div className="actions"><Link className="button" href={"/plants/"+plant.slug}>Dossier</Link><Link className="button secondary" href={"/learn/mcq?plant="+plant.slug}>Practice MCQ</Link></div></article>)}</div>:<div className="notice"><h3>No saved plants</h3><p>Save plants from the catalog to create a focused revision list.</p><Link className="button" href="/plants">Browse plants →</Link></div>}</section>
 <section><h2>What needs attention?</h2>{untouched.length?<div className="notice"><strong>{untouched.length} saved plant{untouched.length===1?"":"s"} have no recorded study activity.</strong><p>Start with a focused MCQ session or open the dossier.</p></div>:<div className="notice"><strong>Your saved plants have recorded study activity.</strong><p>Keep rotating through MCQ, flashcards and viva practice for revision.</p></div>}</section></main>
}
