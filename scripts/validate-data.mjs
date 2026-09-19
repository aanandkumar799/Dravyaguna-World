import fs from "node:fs";
import path from "node:path";

const dir = "data/plants";
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((name) => /\.(json|ya?ml)$/.test(name)) : [];
let errors = 0;
const ids = new Set();
const slugs = new Set();

for (const file of files) {
  const fullPath = path.join(dir, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  if (!raw.trim()) {
    console.error("EMPTY", file);
    errors++;
    continue;
  }
  if (file.includes("demo")) continue;

  const idMatch = raw.match(/(?:^|\n)\s*id:\s*([^\s#]+)/) ?? raw.match(/"id"\s*:\s*"([^"]+)"/);
  const slugMatch = raw.match(/(?:^|\n)\s*slug:\s*([^\s#]+)/) ?? raw.match(/"slug"\s*:\s*"([^"]+)"/);
  if (!idMatch) { console.error("MISSING ID", file); errors++; }
  if (!slugMatch) { console.error("MISSING SLUG", file); errors++; }

  const id = idMatch?.[1];
  const slug = slugMatch?.[1];
  if (id && ids.has(id)) { console.error("DUPLICATE ID", id, file); errors++; }
  if (slug && slugs.has(slug)) { console.error("DUPLICATE SLUG", slug, file); errors++; }
  if (id) ids.add(id);
  if (slug) slugs.add(slug);

  if (id && !/^plant-[a-z0-9-]+$/.test(id)) { console.error("INVALID ID", id, file); errors++; }
  if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) { console.error("INVALID SLUG", slug, file); errors++; }

  if (!raw.includes("botanicalName")) { console.error("MISSING BOTANICAL NAME", file); errors++; }
  if (!raw.includes("status:") && !raw.includes('"status"')) { console.error("MISSING STATUS", file); errors++; }
}

if (errors) process.exit(1);
console.log("Plant data files checked:", files.length, "errors:", errors);