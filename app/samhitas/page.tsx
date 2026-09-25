import Link from "next/link";

const major = [
  {name:"Ashtanga Hridaya", slug:"ashtanga-hridaya", status:"Available"},
  {name:"Charaka Samhita", slug:"charaka-samhita", status:"Planned"},
  {name:"Sushruta Samhita", slug:"sushruta-samhita", status:"Planned"},
  {name:"Ashtanga Sangraha", slug:"ashtanga-sangraha", status:"Planned"},
];

const minor = [
  "Kashyapa Samhita","Bhela Samhita","Harita Samhita","Madhava Nidana",
  "Sharngadhara Samhita","Bhavaprakasha","Yogaratnakara","Other Samhitas"
];

export default function SamhitasPage(){
  return <main className="shell page">
    <Link href="/">← Home</Link>
    <header className="page-heading">
      <span className="eyebrow">CLASSICAL TEXT LIBRARY</span>
      <h1>All Samhitas</h1>
      <p>A structured library for major and minor Ayurvedic Samhitas. Texts are organized as Samhita → Sthana → Adhyaya → Shloka.</p>
    </header>
    <section className="section">
      <div className="section-heading"><span className="eyebrow">MAJOR SAMHITAS</span><h2>Primary classical texts</h2></div>
      <div className="grid">
        {major.map(book => <article className="feature-card" key={book.slug}>
          <span className="status">{book.status}</span><h2>{book.name}</h2>
          <p>{book.slug==="ashtanga-hridaya" ? "Six Sthanas · 120 Adhyayas · starting with Sutra Sthana." : "Planned for the Samhita library."}</p>
          {book.status==="Available" ? <Link href="/samhitas/ashtanga-hridaya">Open Samhita →</Link> : <span className="muted">Coming later</span>}
        </article>)}
      </div>
    </section>
    <section className="section">
      <div className="section-heading"><span className="eyebrow">MINOR / OTHER SAMHITAS</span><h2>Expandable classical library</h2></div>
      <div className="grid">
        {minor.map(name => <article className="feature-card" key={name}><h3>{name}</h3><p>Reserved for structured text, Sthana, Adhyaya and source-aware commentary.</p><span className="muted">Planned</span></article>)}
      </div>
    </section>
  </main>;
}
