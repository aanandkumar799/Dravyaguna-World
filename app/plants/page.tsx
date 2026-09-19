import Link from "next/link";
const demo=[{slug:"demo-plant",name:"Example plant",botanical:"Example plant",family:"Unverified"}];
export default function PlantsPage(){
 return <main style={{maxWidth:1100,margin:"0 auto",padding:"32px 24px",fontFamily:"system-ui"}}>
  <nav><Link href="/">← Home</Link></nav>
  <h1>Plant Catalog</h1><p>Search and explore verified plant records. The catalog is intentionally conservative until records pass academic and botanical review.</p>
  <input aria-label="Search plants" placeholder="Search botanical, Sanskrit, common name..." style={{width:"100%",padding:14,border:"1px solid #ccc",borderRadius:10}} />
  <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:16,marginTop:24}}>
   {demo.map(p=><article key={p.slug} style={{border:"1px solid #ddd",borderRadius:14,padding:18}}><p>{p.family}</p><h2>{p.name}</h2><p><i>{p.botanical}</i></p><Link href={"/plants/"+p.slug}>Open plant →</Link></article>)}
  </section>
 </main>;
}