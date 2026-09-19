"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { learningQuestionBank } from "../../../lib/learning/question-bank";
import { emptyProgress, getModeStats, recordAttempt, PROGRESS_STORAGE_KEY } from "../../../lib/learning/progress";
import type { LearningProgress } from "../../../lib/learning/types";
import { plantCatalog } from "../../../lib/plant/catalog";
import { logPlantActivity } from "../../../lib/activity-client";

export default function MCQ() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [progress, setProgress] = useState<LearningProgress>(emptyProgress());
  const searchParams = useSearchParams();
  const plantSlug = searchParams.get("plant");
  const plant = plantSlug ? plantCatalog.find((item) => item.slug === plantSlug) : undefined;
  const questions = useMemo(() => plant ? learningQuestionBank.filter((item) => item.plantId === plant.id) : learningQuestionBank, [plant]);
  const q = questions[index % questions.length];
  useEffect(() => { const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY); if (raw) { try { setProgress(JSON.parse(raw)); } catch {} } }, []);
  const save = (next: LearningProgress) => { setProgress(next); window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next)); };
  const choose = (answer: number) => {
    if (selected !== null) return;
    setSelected(answer);
    logPlantActivity(q.plantId, "mcq");
    save(recordAttempt(progress, { mode: "mcq", itemId: q.id, plantId: q.plantId, outcome: answer === q.answerIndex ? "correct" : "incorrect" }));
  };
  const next = () => { setSelected(null); setIndex((index + 1) % questions.length); };
  const stats = getModeStats(progress, "mcq");
  return <main className="shell page"><Link href="/learn">← Learn</Link>
    <header className="page-heading"><span className="eyebrow">PRACTICE MODE</span><h1>Plant MCQ Practice</h1><p>{plant ? <>Focused practice: <i>{plant.identity.botanicalName}</i> · </> : null}{stats.attempts} attempts · {stats.accuracy}% accuracy</p></header>
    <article className="quiz-card"><span className="muted">Question {(index % questions.length) + 1} of {questions.length}</span><h2>{q.question}</h2>
      <div className="options">{q.options.map((o,i)=><button className={selected===i ? (i===q.answerIndex ? "correct" : "wrong") : ""} disabled={selected!==null} onClick={()=>choose(i)} key={o}>{o}</button>)}</div>
      {selected!==null && <div className="result"><strong>{selected===q.answerIndex ? "Correct" : "Review this answer"}</strong><p>{q.explanation}</p><p>Source: {q.sourceIds.join(", ")}</p><button onClick={next}>Next question →</button></div>}
    </article>
  </main>;
}