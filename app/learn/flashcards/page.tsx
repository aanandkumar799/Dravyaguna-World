"use client";
import { useState } from "react";
import Link from "next/link";
import { flashcardBank } from "../../../lib/learning/flashcard-bank";
import { plantCatalog } from "../../../lib/plant/catalog";

export default function Flashcards(){const [i,setI]=useState(0);const [flip,setFlip]=useState(false);const card=flashcardBank[i%flashcardBank.length];const plant=plantCatalog.find(p=>p.id===card.plantId);
return <main className="shell page"><Link href="/learn">← Learn</Link><header className="page-heading"><span className="eyebrow">RAPID REVISION · REVIEW</span><h1>Flashcards</h1><p>Source-linked revision cards built from the canonical plant corpus.</p></header><button className="flashcard" onClick={()=>setFlip(!flip)} aria-label="Flip flashcard">{!flip?<><span className="muted">PLANT</span><strong>{card.front}</strong><small>Tap to reveal</small></>:<><span className="muted">BOTANICAL IDENTITY</span><strong>{card.back}</strong><small>Source: {card.sourceIds.join(", ")}</small></>}</button>{plant&&<Link href={"/plants/"+plant.slug}>Open plant dossier →</Link>}<button onClick={()=>{setI(i+1);setFlip(false)}}>Next card →</button></main>}
