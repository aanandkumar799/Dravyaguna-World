"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { plantCatalog } from "../../lib/plant/catalog";
import { readBookmarks } from "../../lib/bookmarks";
import BookmarkButton from "../plants/BookmarkButton";

export default function BookmarksPage() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setIds(readBookmarks());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("dravyaguna-bookmarks-changed", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("dravyaguna-bookmarks-changed", sync);
    };
  }, []);

  const saved = useMemo(
    () => ids.map((id) => plantCatalog.find((plant) => plant.id === id)).filter(Boolean),
    [ids],
  );

  return (
    <main className="shell page">
      <Link href="/plants">← Plant Catalog</Link>
      <header className="page-heading">
        <span className="eyebrow">PERSONAL STUDY LIST</span>
        <h1>Saved plants</h1>
        <p>Keep plants you want to revise close at hand. Saved plants are stored locally on this device.</p>
      </header>

      {saved.length ? (
        <section className="grid" aria-label="Saved plants">
          {saved.map((plant) => plant && (
            <article className="feature-card" key={plant.id}>
              <span className="eyebrow">{plant.status}</span>
              <h2><i>{plant.identity.botanicalName}</i></h2>
              <p>{plant.names.sanskrit?.join(" · ") || "Sanskrit names pending review"}</p>
              <p>{plant.taxonomy.family || "Family pending"}</p>
              <div className="actions">
                <Link className="button" href={"/plants/" + plant.slug}>Open dossier →</Link>
                <BookmarkButton plantId={plant.id} />
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="notice">
          <h2>No saved plants yet</h2>
          <p>Open a plant dossier and select “Save plant” to build your personal revision list.</p>
          <Link className="button" href="/plants">Browse plant catalog →</Link>
        </section>
      )}
    </main>
  );
}
