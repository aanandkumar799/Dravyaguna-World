"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { vivaBank } from "../../../lib/learning/viva-bank";
import { plantCatalog } from "../../../lib/plant/catalog";
import { useSearchParams } from "next/navigation";
import {
  emptyProgress,
  getModeStats,
  PROGRESS_STORAGE_KEY,
  recordAttempt,
} from "../../../lib/learning/progress";
import type { LearningProgress } from "../../../lib/learning/types";
import { logPlantActivity } from "../../../lib/activity-client";

function VivaContent() {
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState<LearningProgress>(emptyProgress());
  const searchParams = useSearchParams();
  const plantSlug = searchParams.get("plant");
  const plantFilter = plantSlug
    ? plantCatalog.find((item) => item.slug === plantSlug)
    : undefined;

  const prompts = useMemo(
    () =>
      plantFilter
        ? vivaBank.filter((item) => item.plantId === plantFilter.id)
        : vivaBank,
    [plantFilter],
  );

  const q = prompts.length > 0 ? prompts[i % prompts.length] : undefined;
  const plant = q
    ? plantCatalog.find((item) => item.id === q.plantId)
    : undefined;

  useEffect(() => {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (raw) {
      try {
        setProgress(JSON.parse(raw));
      } catch {
        // Ignore malformed local progress and keep the empty state.
      }
    }
  }, []);

  const next = () => {
    if (!q) return;

    logPlantActivity(q.plantId, "viva");
    const updated = recordAttempt(progress, {
      mode: "viva",
      itemId: q.id,
      plantId: q.plantId,
      outcome: revealed ? "revealed" : "skipped",
    });
    setProgress(updated);
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(updated));
    setI((current) => current + 1);
    setRevealed(false);
  };

  const stats = getModeStats(progress, "viva");

  if (!q) {
    return (
      <main className="shell page">
        <Link href="/learn">← Learn</Link>
        <header className="page-heading">
          <span className="eyebrow">ORAL PRACTICE · REVIEW</span>
          <h1>Viva Mode</h1>
          <p>No viva prompts are available for this plant yet.</p>
        </header>
        <Link href="/learn/viva">View all viva prompts →</Link>
      </main>
    );
  }

  return (
    <main className="shell page">
      <Link href="/learn">← Learn</Link>
      <header className="page-heading">
        <span className="eyebrow">ORAL PRACTICE · REVIEW</span>
        <h1>Viva Mode</h1>
        <p>
          {plantFilter ? (
            <>
              Focused practice: <i>{plantFilter.identity.botanicalName}</i> ·{" "}
            </>
          ) : null}
          {stats.attempts} prompts practiced
        </p>
      </header>

      <article className="quiz-card">
        <span className="muted">
          Prompt {i + 1} of {prompts.length}
        </span>
        <h2>{q.prompt}</h2>
        <ul>
          {q.clues.map((clue) => (
            <li key={clue}>{clue}</li>
          ))}
        </ul>

        <button onClick={() => setRevealed(true)}>Reveal answer</button>

        {revealed ? (
          <div className="result">
            <h3>
              {q.answer} — <i>{plant?.identity.botanicalName}</i>
            </h3>
            <p>{q.explanation}</p>
            <p>Source: {q.sourceIds.join(", ")}</p>
            {plant ? (
              <Link href={"/plants/" + plant.slug}>Open dossier →</Link>
            ) : null}
          </div>
        ) : null}

        <button onClick={next}>Next prompt →</button>
      </article>
    </main>
  );
}

export default function Viva() {
  return (
    <Suspense
      fallback={
        <main className="shell page">
          <Link href="/learn">← Learn</Link>
          <header className="page-heading">
            <span className="eyebrow">ORAL PRACTICE · REVIEW</span>
            <h1>Viva Mode</h1>
            <p>Loading viva prompts…</p>
          </header>
        </main>
      }
    >
      <VivaContent />
    </Suspense>
  );
}
