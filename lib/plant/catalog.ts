import type {Plant} from "./types";

export const plantCatalog: Plant[] = [
  {
    id: "plant-demo",
    slug: "demo-plant",
    identity: { botanicalName: "Example plant", acceptedNameStatus: "unverified" },
    names: { sanskrit: [], common: [], regional: [], synonyms: [] },
    taxonomy: {},
    status: "draft",
    sources: [],
    images: []
  }
];

export function getPlantBySlug(slug: string) {
  return plantCatalog.find((plant) => plant.slug === slug);
}
