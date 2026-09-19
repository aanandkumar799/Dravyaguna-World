import Link from "next/link";
export default async function PlantPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 return <main style={{maxWidth:1000,margin:"0 auto",padding:"32px 24px",fontFamily:"system-ui"}}>
  <Link href="/plants">← Plant Catalog</Link>
  <header style={{marginTop:28}}><p>PLANT RECORD · {slug}</p><h1>Example plant</h1><p><i>Example plant</i></p><p>Academic verification status: Draft / Unverified</p></header>
  <section><h2>Identity</h2><p>This placeholder demonstrates the canonical plant dossier structure. Verified records will populate this section from the validated data layer.</p></section>
  <section><h2>Identification</h2><p>Morphology, distinguishing features, habitat and useful parts will appear here.</p></section>
  <section><h2>Dravyaguna profile</h2><p>Rasa · Guna · Virya · Vipaka · Karma · Dosha — shown only when supported by reviewed sources.</p></section>
  <section><h2>Images</h2><p>Only identity- and plant-part-verified media will be displayed in the production gallery.</p></section>
  <section><h2>References</h2><p>Source records will provide traceable classical, taxonomic and modern references.</p></section>
 </main>;
}