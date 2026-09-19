import type { Plant } from "./types";

export const plantCatalog: Plant[] = [
  {
    id: "plant-shatavari",
    slug: "shatavari",
    identity: { botanicalName: "Asparagus racemosus Willd.", acceptedNameStatus: "review" },
    names: { sanskrit: ["Shatavari", "Atirasa", "Shatavirya"], common: ["Wild asparagus"], regional: [], synonyms: ["Protasparagus racemosus (Willd.) Oberm."] },
    taxonomy: { family: "Asparagaceae", genus: "Asparagus", species: "Asparagus racemosus" },
    status: "review",
    parts: ["root", "stem", "leaf", "flower", "fruit", "seed"],
    study: {
      usefulParts: ["Root"],
      rasa: ["Madhura", "Tikta"],
      guna: ["Guru", "Snigdha"],
      virya: "Sheeta",
      vipaka: "Madhura"
    },
    sources: [
      { id: "src-shatavari-carak", title: "Shatavari — Charak Samhita herb database", type: "classical", year: 2026, url: "https://www.carakasamhitaonline.com/index.php?title=Talk%3AShatavari", verification: "reviewed" }
    ],
    images: []
  },
  {
    id: "plant-brahmi",
    slug: "brahmi",
    identity: { botanicalName: "Bacopa monnieri (L.) Wettst.", acceptedNameStatus: "review" },
    names: { sanskrit: ["Brahmi", "Saraswati", "Medhya"], common: ["Brahmi", "Water hyssop"], regional: [], synonyms: ["Bacopa monniera", "Herpestis monnieria"] },
    taxonomy: { family: "Plantaginaceae", genus: "Bacopa", species: "Bacopa monnieri" },
    status: "review",
    parts: ["whole-plant", "root", "stem", "leaf", "flower", "seed"],
    study: {
      habit: "Perennial creeping succulent herb.",
      morphology: "Small oblong sessile leaves and white-to-pale-blue flowers with five petals.",
      habitat: "Wetlands, marshes and warm damp regions.",
      usefulParts: ["Whole plant"],
      identificationFeatures: ["Creeping succulent habit", "Small oblong leaves", "Five-petalled pale flowers"]
    },
    sources: [
      { id: "src-brahmi-carak", title: "Brahmi — Charak Samhita herb database", type: "classical", year: 2026, url: "https://carakasamhitaonline.com/index.php?title=Brahmi", verification: "reviewed" },\n      { id: "src-brahmi-kew", title: "Bacopa monnieri — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/1072674-2", verification: "reviewed" }
    ],
    images: []
  },
  {
    id: "plant-arjuna",
    slug: "arjuna",
    identity: { botanicalName: "Terminalia arjuna (Roxb. ex DC.) Wight & Arn.", acceptedNameStatus: "review" },
    names: { sanskrit: ["Arjuna", "Dhava", "Kakubha", "Nadisarja"], common: ["Arjuna"], regional: [], synonyms: [] },
    taxonomy: { family: "Combretaceae", genus: "Terminalia", species: "Terminalia arjuna" },
    status: "review",
    parts: ["bark", "leaf", "flower", "fruit", "seed"],
    study: {
      morphology: "Large tree characterized classically by pale/white bark and broad spreading growth.",
      habitat: "Commonly associated with river banks.",
      usefulParts: ["Bark"],
      identificationFeatures: ["Whitish bark", "Large spreading tree", "River-bank association"]
    },
    sources: [
      { id: "src-arjuna-carak", title: "Arjuna — Charak Samhita herb database", type: "classical", year: 2026, url: "https://carakasamhitaonline.com/index.php?title=Arjuna", verification: "reviewed" },\n      { id: "src-arjuna-kew", title: "Terminalia arjuna — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/170962-1", verification: "reviewed" }
    ],
    images: []
  },
  {
    id: "plant-ashoka",
    slug: "ashoka",
    identity: { botanicalName: "Saraca asoca (Roxb.) W.J.de Wilde", acceptedNameStatus: "review" },
    names: { sanskrit: ["Ashoka", "Madhupushpa", "Raktapallavaka", "Hemapushpa"], common: ["Ashoka", "Asok tree"], regional: [], synonyms: ["Jonesia asoca Roxb.", "Jonesia confusa Hassk."] },
    taxonomy: { family: "Fabaceae", genus: "Saraca", species: "Saraca indica" },
    status: "review",
    parts: ["bark", "leaf", "flower", "seed"],
    study: {
      usefulParts: ["Bark", "Flower"],
      rasa: ["Tikta", "Kashaya"],
      guna: ["Laghu", "Ruksha"],
      virya: "Sheeta",
      vipaka: "Katu"
    },
    sources: [
      { id: "src-ashoka-carak", title: "Ashoka — Charak Samhita herb database", type: "classical", year: 2026, url: "https://www.carakasamhitaonline.com/index.php?title=Ashoka", verification: "reviewed" },\n      { id: "src-ashoka-kew", title: "Saraca asoca — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/517883-1", verification: "reviewed" }
    ],
    images: []
  },
  {
    id: "plant-yashtimadhu",
    slug: "yashtimadhu",
    identity: { botanicalName: "Glycyrrhiza glabra L.", acceptedNameStatus: "review" },
    names: { sanskrit: ["Yashtimadhu", "Madhuka", "Klitaka"], common: ["Licorice", "Liquorice"], regional: [], synonyms: [] },
    taxonomy: { family: "Fabaceae", genus: "Glycyrrhiza", species: "Glycyrrhiza glabra" },
    status: "review",
    parts: ["root", "stem", "leaf", "flower", "seed"],
    study: {
      usefulParts: ["Root"],
      rasa: ["Madhura"],
      guna: ["Guru", "Snigdha"],
      virya: "Sheeta",
      vipaka: "Madhura"
    },
    sources: [
      { id: "src-yashtimadhu-carak", title: "Yashtimadhu — Charak Samhita herb database", type: "classical", year: 2026, url: "https://www.carakasamhitaonline.com/index.php?title=Yashtimadhu", verification: "reviewed" },\n      { id: "src-yashtimadhu-kew", title: "Glycyrrhiza glabra — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/496941-1", verification: "reviewed" }
    ],
    images: []
  },
  {
    id: "plant-pippali",
    slug: "pippali",
    identity: { botanicalName: "Piper longum L.", acceptedNameStatus: "review" },
    names: { sanskrit: ["Pippali", "Shaundi"], common: ["Long pepper"], regional: [], synonyms: [] },
    taxonomy: { family: "Piperaceae", genus: "Piper", species: "Piper longum" },
    status: "review",
    parts: ["root", "stem", "leaf", "fruit", "seed"],
    study: {
      habit: "Slender aromatic perennial climber.",
      morphology: "Creeping jointed stems that can root at nodes, with woody roots and characteristic fruit spikes.",
      usefulParts: ["Fruit", "Root"],
      identificationFeatures: ["Perennial climber", "Jointed creeping stems", "Characteristic fruit spikes"],
      rasa: ["Katu"],
      guna: ["Laghu", "Snigdha", "Tikshna"],
      virya: "Ushna",
      vipaka: "Madhura"
    },
    sources: [
      { id: "src-pippali-carak", title: "Pippali — Charak Samhita herb database", type: "classical", year: 2026, url: "https://carakasamhitaonline.com/index.php?title=Pippali", verification: "reviewed" }
    ],
    images: []
  },
  {
    id: "plant-shunthi",
    slug: "shunthi",
    identity: { botanicalName: "Zingiber officinale Roscoe", acceptedNameStatus: "review" },
    names: { sanskrit: ["Shunthi", "Nagara", "Vishwa", "Shrungavera"], common: ["Dry ginger"], regional: [], synonyms: [] },
    taxonomy: { family: "Zingiberaceae", genus: "Zingiber", species: "Zingiber officinale" },
    status: "review",
    parts: ["rhizome", "leaf", "flower", "seed"],
    study: {
      usefulParts: ["Dried rhizome"],
      rasa: ["Katu"],
      guna: ["Laghu", "Snigdha"],
      virya: "Ushna",
      vipaka: "Madhura"
    },
    sources: [
      { id: "src-shunthi-carak", title: "Shunthi — Charak Samhita herb database", type: "classical", year: 2026, url: "https://www.carakasamhitaonline.com/index.php?title=Shunthi", verification: "reviewed" }
    ],
    images: []
  },
  {
    id: "plant-maricha",
    slug: "maricha",
    identity: { botanicalName: "Piper nigrum L.", acceptedNameStatus: "review" },
    names: { sanskrit: ["Maricha"], common: ["Black pepper"], regional: [], synonyms: [] },
    taxonomy: { family: "Piperaceae", genus: "Piper", species: "Piper nigrum" },
    status: "review",
    parts: ["root", "stem", "leaf", "flower", "fruit", "seed"],
    study: {
      usefulParts: ["Fruit"],
      rasa: ["Katu"],
      guna: ["Laghu", "Tikshna", "Ruksha"],
      virya: "Ushna",
      vipaka: "Katu"
    },
    sources: [
      { id: "src-maricha-carak", title: "Maricha — Charak Samhita herb database", type: "classical", year: 2026, url: "https://www.carakasamhitaonline.com/index.php?title=Maricha", verification: "reviewed" }
    ],
    images: []
  },

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
    identity: { botanicalName: "Tinospora cordifolia (Willd.) Hook.f. & Thomson", acceptedNameStatus: "review" },
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
      { id: "src-guduchi-review", title: "Tinospora cordifolia (Guduchi) — validation of Ayurvedic pharmacology", type: "modern", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2924974/", verification: "reviewed" },\n      { id: "src-guduchi-kew", title: "Tinospora cordifolia — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/907828-1", verification: "reviewed" },
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
      { id: "src-amalaki-review", title: "Phytochemistry and ethnomedicinal qualities of metabolites from Phyllanthus emblica L.: A review", type: "modern", url: "https://www.sciencedirect.com/org/science/article/pii/S0327954523001421", verification: "reviewed" },\n      { id: "src-amalaki-kew", title: "Phyllanthus emblica — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/353838-1", verification: "reviewed" },
      { id: "src-amalaki-classical-review", title: "A Critical Review of Amalaki in Classical Texts", type: "classical", url: "https://ijapr.in/index.php/ijapr/article/view/2412", verification: "reviewed" }
    ],
    images: []
  },
  {
    id: "plant-haritaki",
    slug: "haritaki",
    identity: { botanicalName: "Terminalia chebula Retz.", acceptedNameStatus: "review" },
    names: { sanskrit: ["Haritaki", "Abhaya", "Pathya"], common: ["Chebulic myrobalan", "Harad"], regional: [], synonyms: [] },
    taxonomy: { family: "Combretaceae", genus: "Terminalia", species: "Terminalia chebula" },
    status: "review",
    parts: ["fruit", "seed", "bark", "leaf"],
    study: {
      usefulParts: ["Fruit"],
      rasa: ["Madhura", "Amla", "Katu", "Tikta", "Kashaya"],
      guna: ["Laghu", "Ruksha"],
      virya: "Ushna",
      vipaka: "Madhura"
    },
    sources: [
      { id: "src-haritaki-review", title: "A Classical Review on Different Varieties of Fruit — Terminalia Chebula", type: "classical", url: "https://jaims.in/jaims/article/download/4977/8924/16439", verification: "reviewed" },
      { id: "src-haritaki-history", title: "Terminalia Chebula in Ayurveda and Tibetan Medical Literature", type: "modern", url: "https://www.wisdomlib.org/history/compilation/kailash-journal-of-himalayan-studies/d/doc1602060.html", verification: "reviewed" }
    ],
    images: []
  },
  {
    id: "plant-nimba",
    slug: "nimba",
    identity: { botanicalName: "Azadirachta indica A. Juss.", acceptedNameStatus: "review" },
    names: { sanskrit: ["Nimba", "Arishta", "Pichumarda"], common: ["Neem", "Margosa"], regional: [], synonyms: [] },
    taxonomy: { family: "Meliaceae", genus: "Azadirachta", species: "Azadirachta indica" },
    status: "review",
    parts: ["leaf", "bark", "seed", "flower", "fruit"],
    study: {
      habit: "Evergreen tree.",
      morphology: "Medium-to-large tree with pinnate leaves, white flowers in panicles and olive-like drupes.",
      habitat: "Tropical and subtropical regions.",
      usefulParts: ["Leaf", "Bark", "Seed", "Flower", "Fruit"],
      rasa: ["Tikta", "Kashaya"],
      guna: ["Laghu"],
      virya: "Sheeta",
      vipaka: "Katu"
    },
    sources: [
      { id: "src-nimba-carak", title: "Nimba — Charak Samhita herb database", type: "classical", year: 2026, url: "https://carakasamhitaonline.com/index.php?title=Nimba", verification: "reviewed" },
      { id: "src-nimba-review", title: "Nimb (Azadirachta Indica): Validation of Classical Pharmacological Properties Through Reverse Pharmacology", type: "modern", url: "https://ijapr.in/index.php/ijapr/article/view/2485", verification: "reviewed" }
    ],
    images: []
  }
];

export function getPlantBySlug(slug: string) {
  return plantCatalog.find((plant) => plant.slug === slug);
}
