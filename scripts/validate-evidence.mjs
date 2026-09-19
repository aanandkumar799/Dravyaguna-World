import fs from "node:fs";
import path from "node:path";

const root=path.resolve(".");
const evidenceDir=path.join(root,"data/evidence");
const plantsDir=path.join(root,"data/plants");
const files=fs.existsSync(evidenceDir)?fs.readdirSync(evidenceDir).filter((file)=>file.endsWith(".json")&&file!=="source-registry.json"&&file!=="plant-evidence.json"):[];
const allowedTargets=new Set(["identity","taxonomy","morphology","dravyaguna","usefulParts","therapeuticUses","formulations"]);
const allowedVerification=new Set(["unverified","reviewed","verified"]);
const plantFiles=(fs.existsSync(plantsDir)?fs.readdirSync(plantsDir):[]).filter((file)=>file.endsWith(".json")&&file!=="plant-demo.json");
const plantSlugs=new Set(plantFiles.map((file)=>file.replace(/\.json$/,"")));
const plantsBySlug=new Map();
const plantSourceIds=new Set();
const plantSourceUrls=new Set();
const plantKewSourceIds=new Set();
for(const file of plantSlugs){
 const value=JSON.parse(fs.readFileSync(path.join(plantsDir,file+".json"),"utf8"));
 plantsBySlug.set(file,value);
 for(const source of value.sources??[]){
  if(typeof source?.id==="string") { plantSourceIds.add(source.id); if(source.type==="taxonomic" && source.url?.includes("powo.science.kew.org")) plantKewSourceIds.add("kew-powo-"+file); }
  if(typeof source?.url==="string") plantSourceUrls.add(source.url);
 }
}
const registryPath=path.join(evidenceDir,"source-registry.json");
let registryIds=new Set(); const registryUrls=new Set(); let registrySources=[];
if(fs.existsSync(registryPath)){
 const value=JSON.parse(fs.readFileSync(registryPath,"utf8"));
 if(!Array.isArray(value)) throw new Error("source-registry.json must contain an array");
 registrySources=value;
 for(const source of value){
  if(typeof source?.id==="string") registryIds.add(source.id);
  if(typeof source?.url==="string") registryUrls.add(source.url);
 }
}
const sourceIds=new Set([...plantSourceIds,...registryIds]);
const errors=[]; const seen=new Set();
for(const file of files){
 let value;
 try{value=JSON.parse(fs.readFileSync(path.join(evidenceDir,file),"utf8"));}catch{errors.push(file+": invalid JSON");continue;}
 if(!Array.isArray(value)){errors.push(file+": evidence file must contain an array");continue;}
 value.forEach((item,index)=>{
  const location=file+"["+index+"]";
  for(const key of ["plantSlug","target","sourceId","verification"]) if(typeof item?.[key]!=="string"||!item[key].trim()) errors.push(location+": missing "+key);
  if(item?.plantSlug&&!plantSlugs.has(item.plantSlug)) errors.push(location+": unknown plantSlug "+item.plantSlug);
  if(item?.target&&!allowedTargets.has(item.target)) errors.push(location+": invalid target");
  if(item?.verification&&!allowedVerification.has(item.verification)) errors.push(location+": invalid verification");
  if(item?.sourceId&&!sourceIds.has(item.sourceId)){
   const registered=registrySources.find((source)=>source?.id===item.sourceId);
   const plant=plantsBySlug.get(item.plantSlug);
   const hasKewTaxonomicSource=Boolean((plant?.sources??[]).some((source)=>source?.type==="taxonomic"&&typeof source?.url==="string"&&source.url.includes("powo.science.kew.org")));
   const isKewAlias=item.sourceId.startsWith("kew-powo-")&&hasKewTaxonomicSource;
   if(!registered?.url&&!isKewAlias) errors.push(location+": sourceId is not registered or attached to a plant: "+item.sourceId);
  }
  if(item?.verification==="verified"&&(!item?.claim||!item?.locator)) errors.push(location+": verified evidence requires claim and locator");
  const key=[item?.plantSlug,item?.target,item?.sourceId,item?.claim??"",item?.locator??""].join("|");
  if(seen.has(key)) errors.push(location+": duplicate evidence mapping");
  seen.add(key);
 });
}
if(errors.length){console.error(errors.join("\n"));process.exit(1);}
console.log("Evidence validation passed:",files.length,"file(s),",plantSlugs.size,"plant(s),",sourceIds.size,"source IDs.");