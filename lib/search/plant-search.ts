import type {Plant} from "../plant/types";
import {normalizeSearchText,tokenize} from "./normalize";

function searchableText(p:Plant):string {
 return normalizeSearchText([
  p.identity.botanicalName,p.taxonomy.family,p.taxonomy.genus,p.taxonomy.species,
  ...(p.names.sanskrit??[]),...(p.names.common??[]),...(p.names.regional??[]),...(p.names.synonyms??[])
 ].join(" "));
}

export function scorePlant(p:Plant,query:string):number {
 const q=normalizeSearchText(query);
 if(!q) return 0;
 const text=searchableText(p);
 if(text===q) return 100;
 if(text.startsWith(q)) return 90;
 if(text.includes(q)) return 70;
 const qTokens=tokenize(q);
 const hits=qTokens.filter(t=>text.includes(t)).length;
 return hits ? Math.round(40*(hits/qTokens.length)) : 0;
}

export function searchPlants(plants:Plant[],query:string):Plant[] {
 return plants.map(p=>({p,s:scorePlant(p,query)})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s).map(x=>x.p);
}
