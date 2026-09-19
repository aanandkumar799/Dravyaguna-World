"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { flashcardBank } from "../../../lib/learning/flashcard-bank";
import { plantCatalog } from "../../../lib/plant/catalog";
import {
  emptyProgress,
  getModeStats,
  readProgress,
  saveProgress,
  recordAttempt,
} from "../../../lib/learning/progress";
import type { LearningProgress } from "../../../lib/learning/types";
import { logPlantActivity } from "../../../lib/activity-client";

function FlashcardsContent() {
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const [progress, setProgress] = useState<LearningProgress>(emptyProgress());
  const searchParams = useSearchParams();
  const plantSlug = searchParams.get("plant");
  const plantFilter = plantSlug
    ? plantCatalog.find((item) => item.slug === plantSlug)
    : undefined;

  const cards = useMemo(
    () =>
      plantFilter
        ? flashcardBank.filter((item) => item.plantId === plantFilter.id)
        : flashcardBank,
    [plantFilter],
  );

  const card = cards.length > 0 ? cards[i % cards.length] : undefined;
  const plant = card
    ? plantCatalog.find((item) => item.id === card.plantId)
    : undefined;

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  const next = () => {
    if (!card) return;

    logPlantActivity(card.plantId, "flashcard");
    const updated = recordAttempt(progress, {
      mode: "flashcard",
      itemId: card.id,
      plantId: card.plantId,
      outcome: flip ? "revealed" : "skipped",
    });
    setProgress(updated);
    saveProgress(updated);
    setI((current) => current + 1);
    setFlip(false);
  };

  const stats = getModeStats(progress, "flashcard");

  if (!card) {
    return (
      <main className="shell page">
        <Link href="/learn">← Learn</Link>
        <header className="page-heading">
          <span className="eyebrow">RAPID REVISION · REVIEW</span>
          <h1>Flashcards</h1>
          <p>No flashcards are available for this plant yet.</p>
        </header>
        <Link href="/learn/flashcards">View all flashcards →</Link>
      </main>
    );
  }

  return (
    <main className="shell page">
      <Link href="/learn">← Learn</Link>
      <header className="page-heading">
        <span className="eyebrow">RAPID REVISION · REVIEW</span>
        <h1>Flashcards</h1>
        <p>
          {plantFilter ? (
            <>
              Focused practice: <i>{plantFilter.identity.botanicalName}</i> ·{" "}
            </>
          ) : null}
          {stats.attempts} cards reviewed
        </p>
      </header>

      <button
        className="flashcard"
        onClick={() => setFlip((current) => !current)}
        aria-label="Flip flashcard"
      >
        {!flip ? (
          <>
            <span className="muted">PLANT</span>
            <strong>{card.front}</strong>
            <small>Tap to reveal</small>
          </>
        ) : (
          <>
            <span className="muted">BOTANICAL IDENTITY</span>
            <strong>{card.back}</strong>
            <small>Source: {card.sourceIds.join(", ")}</small>
          </>
        )}
      </button>

      {plant ? (
        <Link href={"/plants/" + plant.slug}>Open plant dossier →</Link>
      ) : null}
      <button onClick={next}>Next card →</button>
    </main>
  );
}

export default function Flashcards() {
  return (
    <Suspense
      fallback={
        <main className="shell page">
          <Link href="/learn">← Learn</Link>
          <header className="page-heading">
            <span className="eyebrow">RAPID REVISION · REVIEW</span>
            <h1>Flashcards</h1>
            <p>Loading flashcards…</p>
          </header>
        </main>
      }
    >
      <FlashcardsContent />
    </Suspense>
  );
}
