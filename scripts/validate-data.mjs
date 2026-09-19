import fs from "node:fs";
import path from "node:path";

const dir = "data/plants";
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((name) => /\.json$/.test(name) && name !== "plant-demo.json") : [];
let errors = 0;
const ids = new Set();
const slugs = new Set();
const parts = new Set(["whole-plant","root","stem","bark","leaf","flower","fruit","seed","rhizome","bulb","tuber","latex","resin","other"]);
const statuses = new Set(["draft","review","verified","deprecated"]);

for (const file of files) {
  const fullPath = path.join(dir, file);
  let plant;
  try { plant = JSON.parse(fs.readFileSync(fullPath, "utf8")); }
  catch (error) { console.error("INVALID JSON", file, error.message); errors++; continue; }

  const required = ["id","slug","identity","names","taxonomy","status","sources","images"];
  for (const key of required) if (!(key in plant)) { console.error("MISSING FIELD", key, file); errors++; }

  if (plant.id && ids.has(plant.id)) { console.error("DUPLICATE ID", plant.id, file); errors++; }
  if (plant.slug && slugs.has(plant.slug)) { console.error("DUPLICATE SLUG", plant.slug, file); errors++; }
  if (plant.id) ids.add(plant.id);
  if (plant.slug) slugs.add(plant.slug);

  if (plant.id && !/^plant-[a-z0-9-]+$/.test(plant.id)) { console.error("INVALID ID", plant.id, file); errors++; }
  if (plant.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(plant.slug)) { console.error("INVALID SLUG", plant.slug, file); errors++; }
  if (plant.status && !statuses.has(plant.status)) { console.error("INVALID STATUS", plant.status, file); errors++; }
  if (!plant.identity?.botanicalName) { console.error("MISSING BOTANICAL NAME", file); errors++; }

  for (const part of plant.parts ?? []) if (!parts.has(part)) { console.error("INVALID PLANT PART", part, file); errors++; }

  const sourceIds = new Set((plant.sources ?? []).map((source) => source.id));
  for (const image of plant.images ?? []) {
    if (!parts.has(image.part)) { console.error("INVALID IMAGE PART", image.part, file); errors++; }
    if (!image.alt || image.alt.length < 5) { console.error("INVALID IMAGE ALT", image.id, file); errors++; }
    if (image.sourceId && !sourceIds.has(image.sourceId)) { console.error("IMAGE SOURCE NOT FOUND", image.id, file); errors++; }
    if (image.url) { try { new URL(image.url); } catch { console.error("INVALID IMAGE URL", image.id, file); errors++; } }
  }

  if (plant.status === "verified" && !(plant.sources ?? []).length) {
    console.error("VERIFIED PLANT HAS NO SOURCES", file); errors++;
  }
}

if (errors) process.exit(1);
console.log("Canonical plant records checked:", files.length, "errors:", errors);