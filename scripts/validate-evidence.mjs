import fs from "node:fs";
import path from "node:path";

const root = path.resolve(".");
const evidenceDir = path.join(root, "data/evidence");
const plantsDir = path.join(root, "data/plants");
const files = fs.existsSync(evidenceDir)
  ? fs.readdirSync(evidenceDir).filter((file) => file.endsWith(".json") && file !== "source-registry.json" && file !== "plant-evidence.json")
  : [];

const allowedTargets = new Set([
  "identity",
  "taxonomy",
  "morphology",
  "dravyaguna",
  "usefulParts",
  "therapeuticUses",
  "formulations",
]);
const allowedVerification = new Set(["unverified", "reviewed", "verified"]);

const plantSlugs = new Set(
  (fs.existsSync(plantsDir) ? fs.readdirSync(plantsDir) : [])
    .filter((file) => file.endsWith(".json") && file !== "plant-demo.json")
    .map((file) => file.replace(/\.json$/, "")),
);

const plantSourceIds = new Set();
for (const file of plantSlugs) {
  const value = JSON.parse(fs.readFileSync(path.join(plantsDir, file + ".json"), "utf8"));
  for (const source of value.sources ?? []) {
    if (typeof source?.id === "string") plantSourceIds.add(source.id);
  }
}

const registryPath = path.join(evidenceDir, "source-registry.json");
const registry = registryPath.existsSync ? [] : [];
let registryIds = new Set();
if (fs.existsSync(registryPath)) {
  const value = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  if (!Array.isArray(value)) throw new Error("source-registry.json must contain an array");
  registryIds = new Set(value.map((source) => source?.id).filter((id) => typeof id === "string"));
}

const sourceIds = new Set([...plantSourceIds, ...registryIds]);
const errors = [];
const seen = new Set();

for (const file of files) {
  let value;
  try {
    value = JSON.parse(fs.readFileSync(path.join(evidenceDir, file), "utf8"));
  } catch {
    errors.push(file + ": invalid JSON");
    continue;
  }

  if (!Array.isArray(value)) {
    errors.push(file + ": evidence file must contain an array");
    continue;
  }

  value.forEach((item, index) => {
    const location = file + "[" + index + "]";
    for (const key of ["plantSlug", "target", "sourceId", "verification"]) {
      if (typeof item?.[key] !== "string" || !item[key].trim()) {
        errors.push(location + ": missing " + key);
      }
    }

    if (item?.plantSlug && !plantSlugs.has(item.plantSlug)) {
      errors.push(location + ": unknown plantSlug " + item.plantSlug);
    }
    if (item?.target && !allowedTargets.has(item.target)) {
      errors.push(location + ": invalid target");
    }
    if (item?.verification && !allowedVerification.has(item.verification)) {
      errors.push(location + ": invalid verification");
    }
    if (item?.sourceId && !sourceIds.has(item.sourceId)) {
      errors.push(location + ": sourceId is not registered or attached to a plant: " + item.sourceId);
    }
    if (item?.verification === "verified" && (!item?.claim || !item?.locator)) {
      errors.push(location + ": verified evidence requires claim and locator");
    }

    const key = [item?.plantSlug, item?.target, item?.sourceId, item?.claim ?? "", item?.locator ?? ""].join("|");
    if (seen.has(key)) errors.push(location + ": duplicate evidence mapping");
    seen.add(key);
  });
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  "Evidence validation passed:",
  files.length,
  "file(s),",
  plantSlugs.size,
  "plant(s),",
  sourceIds.size,
  "source IDs.",
);
