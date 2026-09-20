import { describe, expect, it } from "vitest";
import { filterPlants } from "./filters";
import type { Plant } from "./types";

const plants: Plant[] = [
  { id:"a", slug:"a", identity:{botanicalName:"A",acceptedNameStatus:"accepted"}, names:{sanskrit:[],common:[],regional:[],synonyms:[]}, taxonomy:{family:"Lamiaceae"}, status:"verified", parts:["leaf"], images:[{id:"a1",part:"leaf",alt:"leaf",verification:"verified"}], sources:[] },
  { id:"b", slug:"b", identity:{botanicalName:"B",acceptedNameStatus:"review"}, names:{sanskrit:[],common:[],regional:[],synonyms:[]}, taxonomy:{family:"Fabaceae"}, status:"review", parts:["root"], images:[{id:"b1",part:"root",alt:"root",verification:"reviewed"}], sources:[] }
];

describe("plant filters", () => {
  it("filters by family", () => expect(filterPlants(plants,{family:"Lamiaceae"}).map(p=>p.id)).toEqual(["a"]));
  it("filters by plant part", () => expect(filterPlants(plants,{part:"root"}).map(p=>p.id)).toEqual(["b"]));
  it("filters by publication status", () => expect(filterPlants(plants,{status:"verified"}).map(p=>p.id)).toEqual(["a"]));
});
