import demo from "../../data/plants/plant-demo.yml";
import type {Plant} from "./types";
export const plantCatalog: Plant[] = [{
 id:"plant-demo",slug:"demo-plant",identity:{botanicalName:"Example plant"},names:{sanskrit:[],common:[],regional:[],synonyms:[]},taxonomy:{},status:"draft",sources:[],images:[]
}];
export function getPlantBySlug(slug:string){return plantCatalog.find(p=>p.slug===slug);}
