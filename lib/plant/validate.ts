import type {Plant} from "./types";
const allowed=["draft","review","verified","deprecated"];
export function validatePlantRecord(p:Plant):string[]{
 const e:string[]=[];
 if(!p.id||!p.id.startsWith("plant-"))e.push("Invalid plant id");
 if(!p.slug)e.push("Missing slug");
 if(!p.identity?.botanicalName)e.push("Missing botanical name");
 if(!allowed.includes(p.status))e.push("Invalid status");
 for(const image of p.images??[]){if(!image.part)e.push("Image missing plant part: "+image.id);if(!image.alt||image.alt.length<5)e.push("Image missing useful alt text: "+image.id);}
 for(const source of p.sources??[]){if(!source.id||!source.title)e.push("Source missing id/title");}
 return e;
}