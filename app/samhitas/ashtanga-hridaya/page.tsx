import Link from "next/link";

const sthanas = [
  ["Sutra Sthana","30 chapters","/samhitas/ashtanga-hridaya/sutra-sthana"],
  ["Sharira Sthana","6 chapters","#"],
  ["Nidana Sthana","16 chapters","#"],
  ["Chikitsa Sthana","22 chapters","#"],
  ["Kalpa Sthana","6 chapters","#"],
  ["Uttara Tantra","40 chapters","#"],
];

export default function AshtangaHridaya(){
  return <main className="shell page">
    <Link href="/samhitas">← All Samhitas</Link>
    <header className="page-heading">
      <span className="eyebrow">ASHTANGA HRIDAYA · VAGBHATA</span>
      <h1>अष्टाङ्गहृदय</h1>
      <p>Structured reading of the classical text, beginning with Sutra Sthana and Ayushkamiya Adhyaya.</p>
    </header>
    <section className="grid">
      {sthanas.map(([name,count,href]) => <article className="feature-card" key={name}>
        <span className="eyebrow">STHANA</span><h2>{name}</h2><p>{count}</p>
        {href!=="#" ? <Link href={href}>Open Sthana →</Link> : <span className="muted">Planned</span>}
      </article>)}
    </section>
    <section className="notice"><strong>Text policy:</strong> Sanskrit shlokas are maintained as a distinct primary-text layer. Hindi explanation and Tika explanation are separate layers; Tika shlokas are not displayed.</section>
  </main>;
}
