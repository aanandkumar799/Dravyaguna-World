"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { globalSearch } from "../../lib/search/global-search";

export default function SearchPage() {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get("q") ?? "";
  const results = useMemo(() => globalSearch(query), [query]);

  return <main className="shell page">
    <div className="page-heading">
      <span className="eyebrow">DISCOVER</span>
      <h1>Search Dravyaguna World</h1>
      <p>Find plants, botanical names, families, Sanskrit names, plant parts and learning items from one place.</p>
    </div>
    <form className="search-form" onSubmit={(e) => { e.preventDefault(); const value = new FormData(e.currentTarget).get("q")?.toString().trim() ?? ""; router.replace(value ? "/search?q=" + encodeURIComponent(value) : "/search"); }}>
      <label htmlFor="global-search">Search</label>
      <input id="global-search" name="q" defaultValue={query} autoComplete="off" placeholder="Try Tulasi, Ocimum, Lamiaceae, leaf, MCQ..." />
      <button type="submit">Search</button>
    </form>
    {query && <p className="muted" aria-live="polite">{results.length} result{results.length === 1 ? "" : "s"} for “{query}”</p>}
    {!query && <div className="notice"><strong>Search examples</strong><p>Try a Sanskrit name, botanical name, family, synonym, useful plant part or a learning topic.</p></div>}
    {query && results.length === 0 && <div className="notice"><strong>No matching results.</strong><p>Try a broader botanical, Sanskrit or family term.</p></div>}
    <div className="search-results">
      {results.map((result) => <article className="search-result" key={result.kind + result.plantId + result.title}><span className="eyebrow">{result.kind.toUpperCase()}</span><h2>{result.title}</h2><p>{result.subtitle}</p><Link className="button secondary" href={result.href}>Open →</Link></article>)}
    </div>
  </main>;
}
