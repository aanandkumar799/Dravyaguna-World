import fs from "node:fs";
import path from "node:path";
const dir=path.resolve("data/evidence");
const files=fs.existsSync(dir)?fs.readdirSync(dir).filter(f=>f.endsWith(".json")):[];
const allowedTargets=new Set(["identity","taxonomy","morphology","dravyaguna","usefulParts","therapeuticUses","formulations"]);
const allowedVerification=new Set(["unverified","reviewed","verified"]);
const errors=[];
for(const file of files){let value;try{value=JSON.parse(fs.readFileSync(path.join(dir,file),"utf8"));}catch(e){errors.push(file+": invalid JSON");continue;}if(!Array.isArray(value)){errors.push(file+": evidence file must contain an array");continue;}value.forEach((x,i)=>{const p=file+"["+i+"]";for(const k of ["plantSlug","target","sourceId","verification"])if(typeof x?.[k]!=="string"||!x[k].trim())errors.push(p+": missing "+k);if(x?.target&&!allowedTargets.has(x.target))errors.push(p+": invalid target");if(x?.verification&&!allowedVerification.has(x.verification))errors.push(p+": invalid verification");if(x?.verification==="verified"&&!x?.claim)errors.push(p+": verified evidence requires a claim");});}
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log("Evidence validation passed:",files.length,"file(s)");
