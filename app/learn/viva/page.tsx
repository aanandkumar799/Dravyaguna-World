"use client";
import { useState } from "react";
import Link from "next/link";
import { vivaBank } from "../../../lib/learning/viva-bank";
import { plantCatalog } from "../../../lib/plant/catalog";

export default function Viva() {
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const q = vivaBank[i % vivaBank.length];
  const p = plantCatalog.find((x) => x.id === q.plantId);

  return (
    <main className="shell page">
      <Link href="/learn">← Learn</Link>
      <header className="page-heading">
        <span className="eyebrow">ORAL PRACTICE · REVIEW</span>
        <h1>Viva Mode</h1>
        <p>Identify the plant from source-linked clues, then reveal the record.</p>
      </header>
      <article className="quiz-card">
        <span className="muted">Prompt {i + 1} of {vivaBank.length}</span>
        <h2>{q.prompt}</h2>
        <ul>{q.clues.map((clue) => <li key={clue}>{clue}</li>)}</ul>
        <button onClick={() => setRevealed(true)}>Reveal answer</button>
        {revealed && (
          <div className="result">
            <h3>{q.answer} — <i>{p?.identity.botanicalName}</i></h3>
            <p>{q.explanation}</p>
            <p>Source: {q.sourceIds.join(", ")}</p>
            {p && <Link href={"/plants/" + p.slug}>Open dossier →</Link>}
          </div>
        )}
        <button onClick={() => { setI(i + 1); setRevealed(false); }}>Next prompt →</button>
      </article>
    </main>
  );
}