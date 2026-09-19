import type { Plant } from "./types";

export const plantCatalog: Plant[] = [
  {
    id: "plant-tulasi",
    slug: "tulasi",
    identity: { botanicalName: "Ocimum tenuiflorum L.", acceptedNameStatus: "review" },
    names: { sanskrit: ["Tulasi", "Surasa"], common: ["Holy basil", "Tulsi"], regional: [], synonyms: ["Ocimum sanctum L."] },
    taxonomy: { family: "Lamiaceae", genus: "Ocimum", species: "Ocimum tenuiflorum" },
    status: "review",
    parts: ["whole-plant", "leaf", "flower", "seed"],
    study: {
      habit: "Aromatic perennial herb/subshrub.",
      morphology: "Aromatic plant with opposite leaves and characteristic inflorescences.",
      identificationFeatures: ["Aromatic foliage", "Opposite leaves", "Terminal flowering spikes"],
      usefulParts: ["Leaf", "Whole plant"]
    },
    sources: [
      { id: "src-tulasi-carak", title: "Surasa — Charak Samhita herb database", type: "classical", year: 2026, url: "https://carakasamhitaonline.com/index.php?title=Surasa", verification: "reviewed" }
    ],
    images: []
  },
  {
    id: "plant-ashwagandha",
    slug: "ashwagandha",
    identity: { botanicalName: "Withania somnifera (L.) Dunal", acceptedNameStatus: "review" },
    names: { sanskrit: ["Ashwagandha", "Ashvagandha"], common: ["Indian ginseng", "Winter cherry"], regional: [], synonyms: [] },
    taxonomy: { family: "Solanaceae", genus: "Withania", species: "Withania somnifera" },
    status: "review",
    parts: ["root", "leaf", "flower", "fruit", "seed"],
    study: {
      habit: "Perennial shrub.",
      morphology: "Small shrub with oval leaves, small greenish-yellow flowers and red-orange berry-like fruits.",
      usefulParts: ["Root"],
      identificationFeatures: ["Oval leaves", "Small greenish-yellow flowers", "Red-orange berry-like fruits"]
    },
    sources: [
      { id: "src-ashwagandha-carak", title: "Ashwagandha — Charak Samhita herb database", type: "classical", year: 2026, url: "https://carakasamhitaonline.com/index.php?title=Withania_somnifera", verification: "reviewed" }
    ],
    images: []
  },
  {
    id: "plant-guduchi",
    slug: "guduchi",
    identity: { botanicalName: "Tinospora cordifolia (Willd.) Miers", acceptedNameStatus: "review" },
    names: { sanskrit: ["Guduchi", "Amrita"], common: ["Guduchi", "Giloy"], regional: [], synonyms: [] },
    taxonomy: { family: "Menispermaceae", genus: "Tinospora", species: "Tinospora cordifolia" },
    status: "review",
    parts: ["stem", "leaf", "root"],
    study: {
      habit: "Climbing shrub.",
      usefulParts: ["Stem"],
      rasa: ["Tikta", "Kashaya"],
      guna: ["Guru"],
      virya: "Ushna",
      vipaka: "Madhura"
    },
    sources: [
      { id: "src-guduchi-review", title: "Tinospora cordifolia (Guduchi) — validation of Ayurvedic pharmacology", type: "modern", author: "S. S. S. et al.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2924974/", verification: "reviewed" },
      { id: "src-guduchi-jres", title: "Therapeutic vistas of Tinospora cordifolia (Guduchi)", type: "modern", url: "https://www.bibliomed.org/mnsfulltext/82/82-1433920976.pdf", verification: "reviewed" }
    ],
    images: []
  },
  {
    id: "plant-amalaki",
    slug: "amalaki",
    identity: { botanicalName: "Phyllanthus emblica L.", acceptedNameStatus: "review" },
    names: { sanskrit: ["Amalaki", "Dhatri"], common: ["Indian gooseberry", "Amla"], regional: [], synonyms: ["Emblica officinalis Gaertn."] },
    taxonomy: { family: "Phyllanthaceae", genus: "Phyllanthus", species: "Phyllanthus emblica" },
    status: "review",
    parts: ["fruit", "seed", "bark", "leaf"],
    study: {
      rasa: ["Madhura", "Amla", "Tikta", "Kashaya", "Katu"],
      guna: ["Laghu", "Ruksha"],
      virya: "Sheeta",
      vipaka: "Madhura",
      usefulParts: ["Fruit"]
    },
    sources: [
      { id: "src-amalaki-review", title: "Phytochemistry and ethnomedicinal qualities of metabolites from Phyllanthus emblica L.: A review", type: "modern", url: "https://www.sciencedirect.com/org/science/article/pii/S0327954523001421", verification: "reviewed" },
      { id: "src-amalaki-classical-review", title: "A Critical Review of Amalaki in Classical Texts", type: "classical", url: "https://ijapr.in/index.php/ijapr/article/view/2412", verification: "reviewed" }
    ],
    images: []
  }
];

export function getPlantBySlug(slug: string) {
  return plantCatalog.find((plant) => plant.slug === slug);
}
