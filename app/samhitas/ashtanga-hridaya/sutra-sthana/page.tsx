import Link from "next/link";

export default function SutraSthana(){
  return <main className="shell page">
    <Link href="/samhitas/ashtanga-hridaya">← Ashtanga Hridaya</Link>
    <header className="page-heading">
      <span className="eyebrow">ASHTANGA HRIDAYA · SUTRA STHANA</span>
      <h1>सूत्रस्थान</h1>
      <p>Thirty chapters of foundational Ayurveda. The first chapter is available now.</p>
    </header>
    <section className="grid">
      <article className="feature-card">
        <span className="status">Available</span>
        <h2>1. आयुष्कामीय अध्याय</h2>
        <p>दीर्घायु की इच्छा, आयुर्वेद का उद्देश्य, त्रिदोष, धातु-मल, रस, द्रव्यगुण, रोग, चिकित्सा और चिकित्साचतुष्पाद.</p>
        <Link href="/samhitas/ashtanga-hridaya/sutra-sthana/ayushkamiya">Open Chapter →</Link>
      </article>
      {["2. दिनचर्या","3. ऋतुचर्या","4. रोगानुत्पादनीय","5. द्रवद्रव्यविज्ञानीय","6. अन्नस्वरूपविज्ञानीय","7. अन्नरक्षा","8. मात्राशितीय","9. द्रव्यादिविज्ञानीय","10. रसभेदीय"].map(ch => <article className="feature-card" key={ch}><h3>{ch} अध्याय</h3><span className="muted">Planned</span></article>)}
    </section>
  </main>;
}
