import type {Plant} from "../plant/types";
import {normalize} from "./normalize";
function fields(p:Plant){return [p.identity.botanicalName,p.identity.authority??"",p.taxonomy.family??"",p.taxonomy.genus??"",p.taxonomy.species??"",...(p.names.sanskrit??[]),...(p.names.common??[]),...(p.names.regional??[]),...(p.names.synonyms??[])].map(normalize);}
export function scorePlant(p:Plant,q:string){const query=normalize(q);if(!query)return 0;const fs=fields(p);if(fs.includes(query))return 100;if(fs.some(x=>x.startsWith(query)))return 90;if(fs.some(x=>x.includes(query)))return 70;const qt=query.split(" ").filter(Boolean);const hits=qt.filter(t=>fs.some(x=>x.includes(t))).length;return hits?40*hits/qt.length:0;}
export function searchPlants(plants:Plant[],query:string){return plants.map(p=>({plant:p,score:scorePlant(p,query)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);}
