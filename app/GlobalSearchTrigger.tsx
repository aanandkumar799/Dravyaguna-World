"use client";

import Link from "next/link";
import { useState } from "react";

export default function GlobalSearchTrigger() {
  const [query,setQuery]=useState("");
  return <form className="header-search" onSubmit={(e)=>{e.preventDefault();const q=query.trim();if(q) window.location.href="/search?q="+encodeURIComponent(q);}} role="search">
    <label className="sr-only" htmlFor="header-search">Search plants and learning</label>
    <input id="header-search" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search plants…" />
    <button type="submit">⌕</button>
    <Link href="/search" className="search-link">Search</Link>
  </form>;
}
