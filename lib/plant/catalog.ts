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
      habit: "Perennial climber or scrambling shrub with spiny stems.",
      morphology: "Numerous tuberous or fusiform roots; slender stems with cladodes in fascicles; small white flowers; red berries.",
      habitat: "Forest margins, scrub, woodland and seasonally dry tropical habitats.",
      distribution: "Widespread from tropical Africa through India and Asia to northern Australia.",
      identificationFeatures: ["Clusters of fleshy roots","Spiny climbing stems","Fine cladodes in fascicles"],
      usefulParts: ["Root"],
      rasa: ["Madhura","Tikta"],
      guna: ["Guru","Snigdha"],
      virya: "Sheeta",
      vipaka: "Madhura",
      karma: ["Balya","Brimhana","Stanyajanana","Rasayana"],
      therapeuticUses: ["Traditional female reproductive health use","Traditional galactagogue use","Traditional nourishing use"],
      formulations: ["Shatavari Kalpa","Shatavari Ghrita"]
    },
    sources: [
      { id: "src-shatavari-kew", title: "Asparagus racemosus — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A531271-1", verification: "reviewed" },
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
      morphology: "Small oblong sessile leaves; pale flowers; creeping stems often rooting at nodes.",
      habitat: "Wetlands, marshes, damp soils and aquatic margins.",
      distribution: "Tropical and subtropical regions; widely distributed and cultivated.",
      identificationFeatures: ["Creeping succulent habit","Small leaves","Pale five-lobed flowers"],
      usefulParts: ["Whole plant"],
      karma: ["Medhya","Rasayana"],
      therapeuticUses: ["Traditional medhya use","Traditional memory and cognitive support use"],
      formulations: ["Brahmi Ghrita","Brahmi Rasayana"]
    },
    sources: [
      { id: "src-brahmi-carak", title: "Brahmi — Charak Samhita herb database", type: "classical", year: 2026, url: "https://carakasamhitaonline.com/index.php?title=Brahmi", verification: "reviewed" },
      { id: "src-brahmi-kew", title: "Bacopa monnieri — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/1072674-2", verification: "reviewed" }
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
      habit: "Large deciduous tree.",
      morphology: "Straight trunk with characteristic pale bark; oblong leaves; terminal spikes; ovoid fruits with wings.",
      habitat: "Riverbanks, riparian forests and moist tropical woodland.",
      distribution: "Native to the Indian subcontinent.",
      identificationFeatures: ["Pale layered bark","Oblong leaves","Winged fruit"],
      usefulParts: ["Bark"],
      karma: ["Hridya","Balya","Kashaya"],
      therapeuticUses: ["Traditional cardiac-support use","Traditional use in bleeding disorders","Traditional tissue-support use"],
      formulations: ["Arjunarishta","Arjuna Ksheerapaka"]
    },
    sources: [
      { id: "src-arjuna-carak", title: "Arjuna — Charak Samhita herb database", type: "classical", year: 2026, url: "https://carakasamhitaonline.com/index.php?title=Arjuna", verification: "reviewed" },
      { id: "src-arjuna-kew", title: "Terminalia arjuna — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/170962-1", verification: "reviewed" }
    ],
    images: []
  },
  {
    id: "plant-ashoka",
    slug: "ashoka",
    identity: { botanicalName: "Saraca asoca (Roxb.) W.J.de Wilde", acceptedNameStatus: "review" },
    names: { sanskrit: ["Ashoka", "Madhupushpa", "Raktapallavaka", "Hemapushpa"], common: ["Ashoka", "Asok tree"], regional: [], synonyms: ["Jonesia asoca Roxb.", "Jonesia confusa Hassk."] },
    taxonomy: { family: "Fabaceae", genus: "Saraca", species: "Saraca asoca" },
    status: "review",
    parts: ["bark", "leaf", "flower", "seed"],
    study: {
      habit: "Evergreen tree.",
      morphology: "Compound paripinnate leaves; dense clusters of orange-red flowers; flat pods containing seeds.",
      habitat: "Moist tropical forests; cultivated as an ornamental tree.",
      distribution: "Native to the Indian subcontinent and adjacent regions; cultivated widely.",
      identificationFeatures: ["Paripinnate leaves","Dense orange-red flower clusters","Flat leguminous pods"],
      usefulParts: ["Bark","Flower"],
      rasa: ["Tikta","Kashaya"],
      guna: ["Laghu","Ruksha"],
      virya: "Sheeta",
      vipaka: "Katu",
      karma: ["Garbhashaya-balya","Raktasthambhana"],
      therapeuticUses: ["Traditional gynecological use","Traditional use in excessive uterine bleeding","Traditional use in painful menstruation"],
      formulations: ["Ashokarishta","Ashoka Ghrita"]
    },
    sources: [
      { id: "src-ashoka-carak", title: "Ashoka — Charak Samhita herb database", type: "classical", year: 2026, url: "https://www.carakasamhitaonline.com/index.php?title=Ashoka", verification: "reviewed" },
      { id: "src-ashoka-kew", title: "Saraca asoca — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/517883-1", verification: "reviewed" }
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
      habit: "Perennial non-climbing herb or subshrub with underground rhizomes.",
      morphology: "Erect hairy stems; pinnate leaves with 9–17 leaflets; pale blue-violet flowers; reddish-brown pods.",
      habitat: "Temperate and semi-arid regions; cultivated on suitable moist soils.",
      distribution: "Native from the Mediterranean through western and central Asia to Pakistan.",
      identificationFeatures: ["Pinnate leaves with many leaflets","Violet pea-like flowers","Sweet rhizomatous roots"],
      usefulParts: ["Root"],
      rasa: ["Madhura"],
      guna: ["Guru","Snigdha"],
      virya: "Sheeta",
      vipaka: "Madhura",
      karma: ["Kantya","Vranaropana","Rasayana"],
      therapeuticUses: ["Traditional throat-soothing use","Traditional gastric mucosal support use","Traditional demulcent use"],
      formulations: ["Yashtimadhu Churna","Yashtimadhvadi Taila"]
    },
    sources: [
      { id: "src-yashtimadhu-carak", title: "Yashtimadhu — Charak Samhita herb database", type: "classical", year: 2026, url: "https://www.carakasamhitaonline.com/index.php?title=Yashtimadhu", verification: "reviewed" },
      { id: "src-yashtimadhu-kew", title: "Glycyrrhiza glabra — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/496941-1", verification: "reviewed" }
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
      habit: "Climbing perennial or subshrub.",
      morphology: "Slender jointed stems; cordate leaves; distinctive elongated spikes bearing small fruits.",
      habitat: "Warm humid tropical forests and cultivated areas.",
      distribution: "Native from the eastern Himalaya through Indo-China; cultivated elsewhere including India.",
      identificationFeatures: ["Jointed climbing stem","Cordate leaves","Elongated fruit spikes"],
      usefulParts: ["Fruit","Root"],
      rasa: ["Katu"],
      guna: ["Laghu","Snigdha","Tikshna"],
      virya: "Ushna",
      vipaka: "Madhura",
      karma: ["Deepana","Pachana","Rasayana"],
      therapeuticUses: ["Traditional digestive and appetite use","Traditional respiratory use","Traditional role in compound formulations"],
      formulations: ["Trikatu","Pippalyasava"]
    },
    sources: [
      { id: "src-pippali-kew", title: "Piper longum — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A682031-1", verification: "reviewed" },
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
      habit: "Perennial rhizomatous herb.",
      morphology: "Aromatic branched rhizome; erect leafy pseudostems; narrow lanceolate leaves; separate flowering spikes.",
      habitat: "Warm humid tropical and subtropical cultivation environments.",
      distribution: "Cultivated widely in tropical regions.",
      identificationFeatures: ["Aromatic branched rhizome","Leaf-sheath pseudostem","Lanceolate leaves"],
      usefulParts: ["Dried rhizome"],
      rasa: ["Katu"],
      guna: ["Laghu","Snigdha"],
      virya: "Ushna",
      vipaka: "Madhura",
      karma: ["Deepana","Pachana","Amapachana"],
      therapeuticUses: ["Traditional digestive use","Traditional appetite and nausea support use","Traditional respiratory use"],
      formulations: ["Trikatu","Shunthi Paka"]
    },
    sources: [
      { id: "src-shunthi-kew", title: "Zingiber officinale — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A798372-1/", verification: "reviewed" },
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
      habit: "Climbing shrub.",
      morphology: "Perennial woody vine with alternate leaves; flowers in spikes; berries produced in dense fruit spikes.",
      habitat: "Humid tropical forests and cultivated plantations.",
      distribution: "Native to Sri Lanka; extensively cultivated and introduced across tropical regions including India.",
      identificationFeatures: ["Woody climbing habit","Alternate glossy leaves","Dense spikes of pepper berries"],
      usefulParts: ["Fruit"],
      rasa: ["Katu"],
      guna: ["Laghu","Tikshna","Ruksha"],
      virya: "Ushna",
      vipaka: "Katu",
      karma: ["Deepana","Pachana","Kaphahara"],
      therapeuticUses: ["Traditional digestive use","Traditional respiratory use","Traditional use in low appetite"],
      formulations: ["Trikatu","Marichadi preparations"]
    },
    sources: [
      { id: "src-maricha-kew", title: "Piper nigrum — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A682369-1", verification: "reviewed" },
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
      habit: "Short-lived perennial aromatic herb or subshrub; stems round-quadrangular and hairy.",
      morphology: "Opposite aromatic leaves; terminal racemose inflorescences; small flowers and brown nutlets.",
      habitat: "Seasonally dry tropical and subtropical environments; widely cultivated.",
      distribution: "Native across tropical and subtropical Asia to the western Pacific; widely cultivated and introduced elsewhere.",
      identificationFeatures: ["Aromatic foliage","Opposite serrated leaves","Terminal flowering spikes"],
      usefulParts: ["Leaf","Whole plant"],
      karma: ["Deepana","Pachana","Kaphahara"],
      therapeuticUses: ["Traditional use in respiratory complaints","Traditional use in digestive complaints","Traditional use in febrile conditions"],
      formulations: ["Tulasyadi preparations"]
    },
    sources: [
      { id: "src-tulasi-kew", title: "Ocimum tenuiflorum — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A453130-1", verification: "reviewed" },
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
      habit: "Perennial shrub or subshrub.",
      morphology: "Tomentose stems; ovate to oblong leaves; small axillary greenish flowers; red berry enclosed by enlarged calyx.",
      habitat: "Subtropical dry and seasonally dry regions.",
      distribution: "Native range extends from southern Europe through Asia to China and parts of Africa; cultivated widely.",
      identificationFeatures: ["Tomentose grey-green stems","Ovate leaves","Red berry enclosed by enlarged calyx"],
      usefulParts: ["Root"],
      karma: ["Balya","Brimhana","Rasayana"],
      therapeuticUses: ["Traditional tonic and restorative use","Traditional use in weakness and convalescence","Traditional use in reproductive health"],
      formulations: ["Ashwagandha Churna","Ashwagandharishta"]
    },
    sources: [
      { id: "src-ashwagandha-kew", title: "Withania somnifera — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A821709-1", verification: "reviewed" },
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
      habit: "Large perennial climbing liana.",
      morphology: "Succulent climbing stems with heart-shaped leaves and characteristic aerial roots; small flowers and drupaceous fruits.",
      habitat: "Tropical forests and woodland; commonly grown on trees and supports.",
      distribution: "Native to the Indian subcontinent and Indo-China.",
      identificationFeatures: ["Climbing succulent stem","Heart-shaped leaves","Aerial roots"],
      usefulParts: ["Stem"],
      rasa: ["Tikta","Kashaya"],
      guna: ["Guru"],
      virya: "Ushna",
      vipaka: "Madhura",
      karma: ["Rasayana","Deepana","Jvaraghna"],
      therapeuticUses: ["Traditional use in fever","Traditional use in digestive and metabolic disorders","Traditional rasayana use"],
      formulations: ["Guduchi Ghana","Guduchyadi preparations"]
    },
    sources: [
      { id: "src-guduchi-review", title: "Tinospora cordifolia (Guduchi) — validation of Ayurvedic pharmacology", type: "modern", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2924974/", verification: "reviewed" },
      { id: "src-guduchi-kew", title: "Tinospora cordifolia — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/907828-1", verification: "reviewed" },
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
      habit: "Small to medium-sized deciduous tree.",
      morphology: "Feathery appearance from numerous small linear leaves; greenish flowers; nearly spherical ribbed fruits.",
      habitat: "Tropical and subtropical forests, woodland and cultivated areas.",
      distribution: "Native across tropical and subtropical Asia including India.",
      identificationFeatures: ["Small closely set leaves","Greenish flowers","Ribbed globose fruit"],
      usefulParts: ["Fruit"],
      rasa: ["Madhura","Amla","Tikta","Kashaya","Katu"],
      guna: ["Laghu","Ruksha"],
      virya: "Sheeta",
      vipaka: "Madhura",
      karma: ["Rasayana","Tridoshahara","Vrishya"],
      therapeuticUses: ["Traditional rasayana use","Traditional digestive use","Traditional nourishing use"],
      formulations: ["Triphala","Chyavanaprasha"]
    },
    sources: [
      { id: "src-amalaki-review", title: "Phytochemistry and ethnomedicinal qualities of metabolites from Phyllanthus emblica L.: A review", type: "modern", url: "https://www.sciencedirect.com/org/science/article/pii/S0327954523001421", verification: "reviewed" },
      { id: "src-amalaki-kew", title: "Phyllanthus emblica — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/353838-1", verification: "reviewed" },
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
      habit: "Medium to large deciduous tree.",
      morphology: "Elliptic leaves; terminal spikes or racemes of small flowers; ovoid to ellipsoid fruit with longitudinal ridges.",
      habitat: "Tropical and subtropical forests and woodland.",
      distribution: "Native from the Indian subcontinent through Indo-China to southern China.",
      identificationFeatures: ["Elliptic leaves","Terminal flower spikes","Ribbed ovoid fruits"],
      usefulParts: ["Fruit"],
      rasa: ["Madhura","Amla","Katu","Tikta","Kashaya"],
      guna: ["Laghu","Ruksha"],
      virya: "Ushna",
      vipaka: "Madhura",
      karma: ["Anulomana","Rechana","Rasayana"],
      therapeuticUses: ["Traditional bowel-regulating use","Traditional digestive use","Traditional rasayana use"],
      formulations: ["Triphala","Abhayarishta"]
    },
    sources: [
      { id: "src-haritaki-kew", title: "Terminalia chebula — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/171037-1", verification: "reviewed" },
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
      habit: "Evergreen tree, commonly up to medium-large size.",
      morphology: "Rounded spreading crown; pinnate leaves with serrated leaflets; white flowers in axillary panicles; yellow ellipsoid drupes.",
      habitat: "Dry and seasonally dry tropical regions; commonly planted.",
      distribution: "Native to India and Myanmar and widely planted across tropical and subtropical regions.",
      identificationFeatures: ["Pinnate leaves with serrated leaflets","White flowers","Yellow ellipsoid drupes"],
      usefulParts: ["Leaf","Bark","Seed","Flower","Fruit"],
      rasa: ["Tikta","Kashaya"],
      guna: ["Laghu"],
      virya: "Sheeta",
      vipaka: "Katu",
      karma: ["Kandughna","Krimighna","Kushtaghna"],
      therapeuticUses: ["Traditional external use in skin disorders","Traditional use in fever and inflammatory conditions","Traditional use as a bitter drug"],
      formulations: ["Nimbadi Taila","Panchatikta Ghrita"]
    },
    sources: [
      { id: "src-nimba-kew", title: "Azadirachta indica — Plants of the World Online", type: "taxonomic", year: 2026, url: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A1213180-2", verification: "reviewed" },
      { id: "src-nimba-carak", title: "Nimba — Charak Samhita herb database", type: "classical", year: 2026, url: "https://carakasamhitaonline.com/index.php?title=Nimba", verification: "reviewed" },
      { id: "src-nimba-review", title: "Nimb (Azadirachta Indica): Validation of Classical Pharmacological Properties Through Reverse Pharmacology", type: "modern", url: "https://ijapr.in/index.php/ijapr/article/view/2485", verification: "reviewed" }
    ],
    images: []
  }
];

export function getPlantBySlug(slug: string) {
  return plantCatalog.find((plant) => plant.slug === slug);
}
