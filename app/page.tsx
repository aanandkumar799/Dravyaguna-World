const pillars = [
  ["Explore plants","Search and discover plants by verified identity, names, family, parts and academic attributes."],
  ["Study deeply","Open a structured plant dossier covering morphology, useful parts, classical properties, uses and references."],
  ["Learn actively","Revise with plant-focused MCQs, viva prompts, flashcards and comparisons."],
  ["Trust the data","Use source-grounded content and image records with explicit verification status."]
];

export default function Home() {
  return (
    <main style={{maxWidth:1100,margin:"0 auto",padding:"48px 24px",fontFamily:"system-ui"}}>
      <header>
        <p>DRAVYAGUNA WORLD</p>
        <h1>Plant knowledge, built for BAMS students.</h1>
        <p>Independent plant-first platform for identification, Dravyaguna study, revision and exploration.</p>
      </header>
      <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16,marginTop:32}}>
        {pillars.map(([title,body])=><article key={title} style={{border:"1px solid #ddd",borderRadius:16,padding:20}}><h2>{title}</h2><p>{body}</p></article>)}
      </section>
    </main>
  );
}
