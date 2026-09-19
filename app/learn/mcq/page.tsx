"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { learningQuestionBank } from "../../../lib/learning/question-bank";
import {
  emptyProgress,
  getModeStats,
  recordAttempt,
  PROGRESS_STORAGE_KEY,
  readProgress,
  saveProgress,
} from "../../../lib/learning/progress";
import type { LearningProgress } from "../../../lib/learning/types";
import { plantCatalog } from "../../../lib/plant/catalog";
import { logPlantActivity } from "../../../lib/activity-client";

function MCQContent() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [progress, setProgress] = useState<LearningProgress>(emptyProgress());
  const searchParams = useSearchParams();
  const plantSlug = searchParams.get("plant");
  const plant = plantSlug
    ? plantCatalog.find((item) => item.slug === plantSlug)
    : undefined;

  const questions = useMemo(
    () =>
      plant
        ? learningQuestionBank.filter((item) => item.plantId === plant.id)
        : learningQuestionBank,
    [plant],
  );

  const q = questions.length > 0 ? questions[index % questions.length] : undefined;

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  const save = (next: LearningProgress) => {
    setProgress(next);
    saveProgress(next);
  };

  const choose = (answer: number) => {
    if (selected !== null || !q) return;
    setSelected(answer);
    logPlantActivity(q.plantId, "mcq");
    save(
      recordAttempt(progress, {
        mode: "mcq",
        itemId: q.id,
        plantId: q.plantId,
        outcome: answer === q.answerIndex ? "correct" : "incorrect",
      }),
    );
  };

  const next = () => {
    if (questions.length === 0) return;
    setSelected(null);
    setIndex((current) => (current + 1) % questions.length);
  };

  const stats = getModeStats(progress, "mcq");

  if (!q) {
    return (
      <main className="shell page">
        <Link href="/learn">← Learn</Link>
        <header className="page-heading">
          <span className="eyebrow">PRACTICE MODE</span>
          <h1>Plant MCQ Practice</h1>
          <p>No MCQs are available for this plant yet.</p>
        </header>
        <Link href="/learn/mcq">View all MCQs →</Link>
      </main>
    );
  }

  return (
    <main className="shell page">
      <Link href="/learn">← Learn</Link>
      <header className="page-heading">
        <span className="eyebrow">PRACTICE MODE</span>
        <h1>Plant MCQ Practice</h1>
        <p>
          {plant ? (
            <>
              Focused practice: <i>{plant.identity.botanicalName}</i> ·{" "}
            </>
          ) : null}
          {stats.attempts} attempts · {stats.accuracy}% accuracy
        </p>
      </header>

      <article className="quiz-card">
        <span className="muted">
          Question {index % questions.length + 1} of {questions.length}
        </span>
        <h2>{q.question}</h2>
        <div className="options">
          {q.options.map((option, optionIndex) => (
            <button
              className={
                selected === optionIndex
                  ? optionIndex === q.answerIndex
                    ? "correct"
                    : "wrong"
                  : ""
              }
              disabled={selected !== null}
              onClick={() => choose(optionIndex)}
              key={option}
            >
              {option}
            </button>
          ))}
        </div>
        {selected !== null ? (
          <div className="result">
            <strong>
              {selected === q.answerIndex ? "Correct" : "Review this answer"}
            </strong>
            <p>{q.explanation}</p>
            <p>Source: {q.sourceIds.join(", ")}</p>
            <button onClick={next}>Next question →</button>
          </div>
        ) : null}
      </article>
    </main>
  );
}

export default function MCQ() {
  return (
    <Suspense
      fallback={
        <main className="shell page">
          <Link href="/learn">← Learn</Link>
          <header className="page-heading">
            <span className="eyebrow">PRACTICE MODE</span>
            <h1>Plant MCQ Practice</h1>
            <p>Loading questions…</p>
          </header>
        </main>
      }
    >
      <MCQContent />
    </Suspense>
  );
}
