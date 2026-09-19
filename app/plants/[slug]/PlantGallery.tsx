"use client";

import { useMemo, useState } from "react";
import type { PlantImage } from "../../lib/plant/types";
import { plantPartLabel } from "../../lib/plant/parts";

export default function PlantGallery({ images }: { images: PlantImage[] }) {
  const parts = useMemo(() => Array.from(new Set(images.map((image) => image.part))), [images]);
  const [selected, setSelected] = useState<string>("all");
  const visible = selected === "all" ? images : images.filter((image) => image.part === selected);

  if (!images.length) {
    return <div className="notice"><strong>Gallery pending.</strong> No image assets are published for this record yet.</div>;
  }

  return (
    <div>
      <div className="chip-list" aria-label="Filter gallery by plant part">
        <button type="button" className={"chip" + (selected === "all" ? " active" : "")} aria-pressed={selected === "all"} onClick={() => setSelected("all")}>All parts</button>
        {parts.map((part) => (
          <button key={part} type="button" className={"chip" + (selected === part ? " active" : "")} aria-pressed={selected === part} onClick={() => setSelected(part)}>
            {plantPartLabel(part)}
          </button>
        ))}
      </div>
      <div className="grid" aria-live="polite">
        {visible.map((image) => (
          <article className="feature-card" key={image.id}>
            <strong>{plantPartLabel(image.part)}</strong>
            {image.url ? (
              <img src={image.url} alt={image.alt} loading="lazy" decoding="async" style={{ width: "100%", height: "auto", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: 12, marginTop: 12 }} />
            ) : (
              <div className="media-placeholder" role="img" aria-label={image.alt}>Image asset pending delivery</div>
            )}
            <p>{image.caption || image.alt}</p>
            <small>Image status: {image.verification}{image.license ? " · " + image.license : ""}</small>
            {image.sourcePageUrl ? <p><a href={image.sourcePageUrl} target="_blank" rel="noreferrer">View image source ↗</a></p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
