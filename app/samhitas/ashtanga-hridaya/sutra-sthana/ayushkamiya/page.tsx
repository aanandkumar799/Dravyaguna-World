"use client";

import Link from "next/link";
import { useState } from "react";
import { ayushkamiyaVerses } from "../../../../../data/samhitas/ashtanga-hridaya/sutra-sthana/ayushkamiya";

export default function AyushkamiyaPage(){
  const [showTika,setShowTika] = useState(true);
  return <main className="shell page">
    <Link href="/samhitas/ashtanga-hridaya/sutra-sthana">← Sutra Sthana</Link>
    <header className="page-heading">
      <span className="eyebrow">अष्टाङ्गहृदय · सूत्रस्थान · अध्याय १</span>
      <h1>आयुष्कामीय अध्याय</h1>
      <p>दीर्घायु की इच्छा रखने वाले के लिए आयुर्वेद के मूल सिद्धान्तों का प्रारम्भिक अध्याय.</p>
      <div className="actions">
        <button type="button" onClick={()=>setShowTika(v=>!v)} aria-pressed={showTika}>
          {showTika ? "Hide Tika" : "Show Tika"}
        </button>
      </div>
    </header>

    <div className="notice"><strong>Tika display:</strong> {showTika ? "Visible" : "Hidden"}. Tika is presented as a Hindi explanatory layer; the original Tika shlokas are intentionally not displayed.</div>

    <section className="samhita-verses" aria-label="Ayushkamiya Adhyaya verses">
      {ayushkamiyaVerses.map(v => <article className="samhita-verse" id={"verse-"+v.number} key={v.number}>
        <div className="verse-number">॥ {v.number} ॥</div>
        <div className="shloka" lang="sa">{v.shloka}</div>
        <div className="explanation"><h3>हिन्दी व्याख्या</h3><p>{v.hindi}</p></div>
        {showTika && <div className="tika"><h3>टीका-व्याख्या</h3><p>{v.tika}</p></div>}
      </article>)}
    </section>
  </main>;
}
