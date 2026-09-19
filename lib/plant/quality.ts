import type { Plant } from "./types";
export type QualityIssue = { severity:"error"|"warning"; field:string; message:string };
export function auditPlant(p:Plant): QualityIssue[] {
  const issues:QualityIssue[]=[];
  if(!p.identity.botanicalName) issues.push({severity:"error",field:"identity.botanicalName",message:"Missing botanical identity"});
  if(p.status==="verified"&&!p.sources.length) issues.push({severity:"error",field:"sources",message:"Verified record requires source provenance"});
  const sourceIds=new Set(p.sources.map((s)=>s.id));
  for(const image of p.images??[]){
    if(!image.alt||!image.part) issues.push({severity:"error",field:"images."+image.id,message:"Every image requires plant-part metadata and alt text"});
    if(image.sourceId&&!sourceIds.has(image.sourceId)) issues.push({severity:"error",field:"images."+image.id+".sourceId",message:"Image source reference does not exist"});
    if(image.verification==="verified"&&!image.url) issues.push({severity:"error",field:"images."+image.id+".url",message:"Verified image requires a delivered asset URL"});
    if(image.verification==="verified"&&!image.license) issues.push({severity:"warning",field:"images."+image.id+".license",message:"Verified image should declare a license or usage basis"});
    if(image.verification==="verified"&&!image.sourcePageUrl&&!image.sourceId) issues.push({severity:"warning",field:"images."+image.id+".provenance",message:"Verified image should retain provenance"});
  }
  if(!p.taxonomy.family) issues.push({severity:"warning",field:"taxonomy.family",message:"Family is not populated"});
  return issues;
}