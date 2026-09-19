"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { globalSearch } from "../../lib/search/global-search";

function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get("q") ?? "";
  const results = useMemo(() => globalSearch(query), [query]);
  return <main className="shell page"><div className="page-heading"><span className="eyebrow">DISCOVER</span><h1>Search Dravyaguna World</h1><p>Find plants, botanical names, families, Sanskrit names, plant parts and learning items from one place.</p></div><form className="search-form" onSubmit={(event)=>{event.preventDefault();const value=new FormData(event.currentTarget).get("q")?.toString().trim()??"";router.replace(value?"/search?q="+encodeURIComponent(value):"/search");}}><label htmlFor="global-search">Search</label><input id="global-search" name="q" defaultValue={query} autoComplete="off" placeholder="Try Tulasi, Ocimum, Lamiaceae, leaf, MCQ..."/><button type="submit">Search</button></form>{query?<p className="muted" aria-live="polite">{results.length} result{results.length===1?"":"s"} for “{query}”</p>:null}<div className="search-results">{results.map((result)=><article className="search-result" key={result.kind+result.plantId+result.title}><span className="eyebrow">{result.kind.toUpperCase()}</span><h2>{result.title}</h2><p>{result.subtitle}</p><Link className="button secondary" href={result.href}>Open →</Link></article>)}</div></main>;
}
export default function SearchContent(){return <Suspense fallback={<main className="shell page"><h1>Search Dravyaguna World</h1><p>Loading search…</p></main>}><SearchResults/></Suspense>;}
