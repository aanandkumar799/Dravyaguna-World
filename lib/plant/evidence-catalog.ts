import records from "../../data/evidence/plant-evidence.json";
import sourceRegistry from "../../data/evidence/source-registry.json";
import type { ClaimEvidence, PlantClaimSet, EvidenceCoverage } from "./evidence";
import { evidenceCoverage } from "./evidence";

type EvidenceRecord = {
  plantSlug: string;
  target: keyof PlantClaimSet;
  sourceId: string;
  verification: ClaimEvidence["verification"];
  claim?: string;
  locator?: string;
  url?: string;
  notes?: string;
  kind?: ClaimEvidence["kind"];
};

type EvidenceSource = {
  id: string;
  title: string;
  type: string;
  url?: string;
  verification: ClaimEvidence["verification"];
};

const evidenceRecords = records as EvidenceRecord[];
const sources = sourceRegistry as EvidenceSource[];

export function getPlantEvidence(slug: string): { claims: PlantClaimSet; coverage: EvidenceCoverage } {
  const claims: PlantClaimSet = {};

  for (const record of evidenceRecords.filter((item) => item.plantSlug === slug)) {
    const target = record.target;
    const list = claims[target] ?? [];
    list.push({
      id: `${record.plantSlug}-${record.target}-${record.sourceId}-${list.length + 1}`,
      claim: record.claim ?? record.notes ?? record.target,
      kind: record.kind ?? (target === "taxonomy" ? "taxonomic" : target === "usefulParts" ? "pharmacopoeial" : "classical"),
      sourceId: record.sourceId,
      locator: record.locator,
      url: record.url ?? sources.find((source) => source.id === record.sourceId)?.url,
      verification: record.verification,
      notes: record.notes,
    });
    claims[target] = list;
  }

  return { claims, coverage: evidenceCoverage(claims) };
}

export function getEvidenceSource(sourceId: string) {
  return sources.find((source) => source.id === sourceId);
}
