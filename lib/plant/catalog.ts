import type { Plant } from "./types";
import shatavari from "../../data/plants/shatavari.json";
import brahmi from "../../data/plants/brahmi.json";
import arjuna from "../../data/plants/arjuna.json";
import ashoka from "../../data/plants/ashoka.json";
import yashtimadhu from "../../data/plants/yashtimadhu.json";
import pippali from "../../data/plants/pippali.json";
import shunthi from "../../data/plants/shunthi.json";
import maricha from "../../data/plants/maricha.json";
import tulasi from "../../data/plants/tulasi.json";
import ashwagandha from "../../data/plants/ashwagandha.json";
import guduchi from "../../data/plants/guduchi.json";
import amalaki from "../../data/plants/amalaki.json";
import haritaki from "../../data/plants/haritaki.json";
import nimba from "../../data/plants/nimba.json";

export const plantCatalog: Plant[] = [
  shatavari, brahmi, arjuna, ashoka, yashtimadhu, pippali, shunthi,
  maricha, tulasi, ashwagandha, guduchi, amalaki, haritaki, nimba
];

export function getPlantBySlug(slug: string) {
  return plantCatalog.find((plant) => plant.slug === slug);
}
