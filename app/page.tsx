import Link from "next/link";
import { plantCatalog } from "../lib/plant/catalog";

const features = [
  ["Plant Catalog","Search plants by botanical, Sanskrit and common names, with taxonomy and plant-part filters.","/plants"],
  ["Plant Dossiers","Study identity, taxonomy, morphology, habitat, Dravyaguna properties, sources and media.","/plants"],
  ["Active Learning","MCQs, viva practice and flashcards built around plant records.","/learn"],
  ["Source & Quality","Academic provenance, verification states and structured content quality controls.","/about"],
];

export default function Home() {
  const reviewCount = plantCatalog.filter(p => p.status === "review").length;
  return <main className="shell">
    <section className="hero hero-home">
      <span className="eyebrow">BAMS · DRAVYAGUNA · PLANT KNOWLEDGE</span>
      <h1>Study medicinal plants with clarity and confidence.</h1>
      <p>A dedicated plant-first platform for identification, Dravyaguna study, revision and source-aware exploration.</p>
      <div className="actions"><Link className="button" href="/plants">Explore plants</Link><Link className="button secondary" href="/learn">Start learning</Link></div>
      <div className="stats"><div><strong>{plantCatalog.length}</strong><span>seed plant records</span></div><div><strong>{reviewCount}</strong><span>currently in review</span></div><div><strong>Plant-only</strong><span>focused scope</span></div></div>
    </section>
    <section className="section"><div className="section-heading"><span className="eyebrow">CORE EXPERIENCE</span><h2>Everything organized around the plant.</h2></div><div className="grid">{features.map(([title,text,href])=><article className="feature-card" key={title}><span className="card-number">0{features.indexOf([title,text,href])+1}</span><h3>{title}</h3><p>{text}</p><Link href={href}>Explore →</Link></article>)}</div></section>
    <section className="split-card"><div><span className="eyebrow">ACADEMIC FIRST</span><h2>Evidence is part of the record.</h2><p>Classical sources, modern evidence, taxonomy and image provenance are kept distinguishable. Records can remain in review rather than being presented as verified facts.</p></div><Link className="button" href="/about">How quality works</Link></section>
  </main>;
}