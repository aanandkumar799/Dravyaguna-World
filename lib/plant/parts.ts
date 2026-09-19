import type {PlantPart} from "./types";
export const PLANT_PART_LABELS:Record<PlantPart,string>={"whole-plant":"Whole plant",root:"Root",stem:"Stem",bark:"Bark",leaf:"Leaf",flower:"Flower",fruit:"Fruit",seed:"Seed",rhizome:"Rhizome",bulb:"Bulb",tuber:"Tuber",latex:"Latex",resin:"Resin",other:"Other"};
export function plantPartLabel(part:PlantPart){return PLANT_PART_LABELS[part]??"Other";}