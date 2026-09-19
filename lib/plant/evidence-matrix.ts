export type EvidencePriority = "high" | "medium" | "low";
export type EvidenceTarget = "identity" | "taxonomy" | "morphology" | "dravyaguna" | "usefulParts" | "therapeuticUses" | "formulations";

export type EvidenceMappingTask = {
  plantId: string;
  target: EvidenceTarget;
  priority: EvidencePriority;
  preferredSourceKinds: ("classical"|"modern"|"taxonomic"|"pharmacopoeial")[];
  status: "pending"|"in-progress"|"reviewed"|"verified";
  notes?: string;
};

const common: Pick<EvidenceMappingTask,"priority"|"preferredSourceKinds"> = {
  priority: "high",
  preferredSourceKinds: ["classical","pharmacopoeial","modern"],
};

export function createEvidenceMatrix(plantIds: string[]): EvidenceMappingTask[] {
  const targets: EvidenceTarget[] = ["identity","taxonomy","morphology","dravyaguna","usefulParts","therapeuticUses","formulations"];
  return plantIds.flatMap((plantId) => targets.map((target) => ({
    plantId,
    target,
    priority: target === "identity" || target === "taxonomy" ? "high" : common.priority,
    preferredSourceKinds: target === "taxonomy" ? ["taxonomic","pharmacopoeial"] : common.preferredSourceKinds,
    status: "pending" as const,
  })));
}
