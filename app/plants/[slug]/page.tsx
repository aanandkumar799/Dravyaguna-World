import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlantBySlug } from "../../../lib/plant/catalog";
import { plantPartLabel } from "../../../lib/plant/parts";

export default async function PlantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plant = getPlantBySlug(slug);
  if (!plant) notFound();

  const { identity, names, taxonomy, study, sources, images } = plant;

  return (
    <main className="shell">
      <Link href="/plants">← Plant Catalog</Link>
      <header className="hero">
        <span className="eyebrow">PLANT RECORD · {plant.status.toUpperCase()}</span>
        <h1>{identity.botanicalName}</h1>
        {identity.authority && <p><i>{identity.botanicalName}</i> {identity.authority}</p>}
        <p>Academic verification status: <strong>{plant.status}</strong></p>
      </header>

      <section className="grid">
        <article><h2>Names</h2><p>{names.sanskrit?.length ? names.sanskrit.join(" · ") : "Sanskrit names pending review."}</p><p>{names.common?.length ? names.common.join(" · ") : "Common names pending review."}</p></article>
        <article><h2>Taxonomy</h2><p>Family: {taxonomy.family || "Pending review"}</p><p>Genus: {taxonomy.genus || "Pending review"}</p><p>Species: {taxonomy.species || "Pending review"}</p></article>
      </section>

      <section>
        <h2>Identification</h2>
        <p>{study?.morphology || "Morphology will appear after academic review."}</p>
        {study?.identificationFeatures?.length ? <ul>{study.identificationFeatures.map((item) => <li key={item}>{item}</li>)}</ul> : <p>Distinguishing features pending review.</p>}
        <p>Habitat: {study?.habitat || "Pending review"}</p>
        <p>Distribution: {study?.distribution || "Pending review"}</p>
      </section>

      <section>
        <h2>Dravyaguna profile</h2>
        <p>Rasa: {study?.rasa?.join(" · ") || "Pending reviewed source"}</p>
        <p>Guna: {study?.guna?.join(" · ") || "Pending reviewed source"}</p>
        <p>Virya: {study?.virya || "Pending reviewed source"}</p>
        <p>Vipaka: {study?.vipaka || "Pending reviewed source"}</p>
        <p>Karma: {study?.karma?.join(" · ") || "Pending reviewed source"}</p>
        <p>Dosha: {study?.dosha?.join(" · ") || "Pending reviewed source"}</p>
      </section>

      <section>
        <h2>Plant parts</h2>
        {plant.parts?.length ? <ul>{plant.parts.map((part) => <li key={part}>{plantPartLabel(part)}</li>)}</ul> : <p>Plant-part data pending verification.</p>}
      </section>

      <section>
        <h2>Image gallery</h2>
        {images.length ? (
          <div className="grid">
            {images.map((image) => (
              <article key={image.id}>
                <strong>{plantPartLabel(image.part)}</strong>
                {image.url ? <img src={image.url} alt={image.alt} loading="lazy" style={{ width: "100%", height: "auto", borderRadius: 12 }} /> : null}
                <p>{image.alt}</p>
                <small>Verification: {image.verification}{image.license ? ` · License: ${image.license}` : ""}</small>
              </article>
            ))}
          </div>
        ) : <p>No verified gallery assets are published yet.</p>}
      </section>

      <section>
        <h2>References</h2>
        {sources.length ? <ul>{sources.map((source) => <li key={source.id}>{source.url ? <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a> : source.title} — {source.verification}</li>)}</ul> : <p>No reviewed references are attached to this draft record.</p>}
      </section>
    </main>
  );
}
