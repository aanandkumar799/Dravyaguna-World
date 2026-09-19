"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getModeStats, emptyProgress, PROGRESS_STORAGE_KEY } from "../../lib/learning/progress";
import type { LearningProgress } from "../../lib/learning/types";

const modules=[["MCQ Practice","Test plant identity, morphology and Dravyaguna knowledge.","/learn/mcq"],["Viva Mode","Practice concise plant-identification and oral-exam prompts.","/learn/viva"],["Flashcards","Rapid revision of names, parts, properties and key features.","/learn/flashcards"],["Plant Comparison","Open the catalog and compare plant dossiers side by side.","/plants"]];

export default function Learn(){
  const [progress,setProgress]=useState<LearningProgress>(emptyProgress());
  useEffect(()=>{const raw=window.localStorage.getItem(PROGRESS_STORAGE_KEY);if(raw){try{setProgress(JSON.parse(raw));}catch{}}},[]);
  const mcq=getModeStats(progress,"mcq");
  const flashcards=getModeStats(progress,"flashcard");
  const viva=getModeStats(progress,"viva");
  return <main className="shell page"><Link href="/plants">← Plant Catalog</Link>
    <header className="page-heading"><span className="eyebrow">ACTIVE LEARNING</span><h1>Learn</h1><p>Revision tools designed around structured plant records. Authoritative learning content is only published after review.</p></header>
    <section className="stats"><article><strong>{mcq.attempts}</strong><span>MCQ attempts</span></article><article><strong>{mcq.accuracy}%</strong><span>MCQ accuracy</span></article><article><strong>{flashcards.attempts}</strong><span>Flashcards reviewed</span></article><article><strong>{viva.attempts}</strong><span>Viva prompts</span></article></section>
    <section className="grid">{modules.map(([title,text,url])=><article className="feature-card" key={title}><h2>{title}</h2><p>{text}</p><Link href={url}>Open module →</Link></article>)}</section>
    <section className="notice"><strong>Review policy:</strong> question and flashcard content must have source provenance before being marked verified.</section>
  </main>;
}