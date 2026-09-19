"use client";
import { useState } from "react";
import Link from "next/link";
import { learningQuestionBank } from "../../../lib/learning/question-bank";

export default function MCQ() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const q = learningQuestionBank[index];
  const next = () => { setSelected(null); setIndex((index + 1) % learningQuestionBank.length); };
  return <main className="shell page"><Link href="/learn">← Learn</Link>
    <header className="page-heading"><span className="eyebrow">PRACTICE MODE</span><h1>Plant MCQ Practice</h1><p>Questions are linked to plant records and source provenance. Review-state questions are not presented as academically verified.</p></header>
    <article className="quiz-card"><span className="muted">Question {index + 1} of {learningQuestionBank.length}</span><h2>{q.question}</h2>
      <div className="options">{q.options.map((o,i)=><button className={selected===i ? (i===q.answerIndex ? "correct" : "wrong") : ""} disabled={selected!==null} onClick={()=>setSelected(i)} key={o}>{o}</button>)}</div>
      {selected!==null && <div className="result"><strong>{selected===q.answerIndex ? "Correct" : "Review this answer"}</strong><p>{q.explanation}</p><p>Source: {q.sourceIds.join(", ")}</p><button onClick={next}>Next question →</button></div>}
    </article>
  </main>;
}
