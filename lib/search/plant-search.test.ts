import {describe,it,expect} from "vitest";
import {searchPlants} from "./plant-search";
const plants:any[]=[{identity:{botanicalName:"Ocimum tenuiflorum"},names:{sanskrit:["Tulasi"],common:["Holy basil"]},taxonomy:{family:"Lamiaceae"},sources:[],images:[],id:"plant-tulasi",slug:"tulasi",status:"verified"}];
describe("plant search",()=>{it("matches botanical names",()=>expect(searchPlants(plants,"Ocimum").length).toBe(1));it("matches Sanskrit names",()=>expect(searchPlants(plants,"Tulasi")[0].id).toBe("plant-tulasi"));});
