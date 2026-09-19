"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { plantCatalog } from "../../lib/plant/catalog";
import { filterPlants } from "../../lib/plant/filters";
import { plantPartLabel } from "../../lib/plant/parts";
import type { PlantPart } from "../../lib/plant/types";
import { searchPlants } from "../../lib/search/plant-search";
import BookmarkButton from "./BookmarkButton";

const parts: PlantPart[] = ["whole-plant","root","stem","bark","leaf","flower","fruit","seed","rhizome","bulb","tuber","latex","resin","other"];

export default function PlantsPage() {
  const [q, setQ] = useState("");
  const [family, setFamily] = useState("");
  const [part, setPart] = useState("");
  const [status, setStatus] = useState("");

  const families = useMemo(() => [...new Set(plantCatalog.map((p) => p.taxonomy.family).filter(Boolean))] as string[], []);
  const results = useMemo(() => {
    const searched = q ? searchPlants(plantCatalog, q).map((item) => item.plant) : plantCatalog;
    return filterPlants(searched, {
      family: family || undefined,
      part: part || undefined,
      status: (status || undefined) as undefined | "draft" | "review" | "verified" | "deprecated"
    });
  }, [q, family, part, status]);

  return (
    <main className="shell">
      <Link href="/">← Home</Link>
      <h1>Plant Catalog</h1>
      <p>Explore plant records by botanical, Sanskrit, common and taxonomy terms.</p><div className="actions"><Link className="button secondary" href="/plants/compare">Compare plants →</Link></div>
      <div className="filters" role="search">
        <input aria-label="Search plants" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search botanical, Sanskrit, common name..." />
        <select aria-label="Filter by family" value={family} onChange={(e) => setFamily(e.target.value)}><option value="">All families</option>{families.map((item) => <option key={item} value={item}>{item}</option>)}</select>
        <select aria-label="Filter by plant part" value={part} onChange={(e) => setPart(e.target.value)}><option value="">All plant parts</option>{parts.map((item) => <option key={item} value={item}>{plantPartLabel(item)}</option>)}</select>
        <select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All statuses</option><option value="verified">Verified</option><option value="review">In review</option><option value="draft">Draft</option></select>
      </div>
      {results.length ? <section className="grid">{results.map((p) => <article key={p.id}><span className="eyebrow">{p.status}</span><h2>{p.identity.botanicalName}</h2><p>{p.names.sanskrit?.join(" · ") || "Sanskrit names pending review"}</p><p>{p.taxonomy.family || "Family pending"}</p><div className="actions"><Link className="button secondary" href={"/plants/" + p.slug}>Open plant →</Link><BookmarkButton plantId={p.id} /></div></article>)}</section> : <p>No matching record found.</p>}
    </main>
  );
}
