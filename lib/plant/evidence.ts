export type EvidenceKind = "classical" | "modern" | "taxonomic" | "pharmacopoeial" | "image" | "other";
export type EvidenceVerification = "unverified" | "reviewed" | "verified";

export interface ClaimEvidence {
  id: string;
  claim: string;
  kind: EvidenceKind;
  sourceId: string;
  locator?: string;
  url?: string;
  verification: EvidenceVerification;
  notes?: string;
}

export interface PlantClaimSet {
  identity?: ClaimEvidence[];
  taxonomy?: ClaimEvidence[];
  morphology?: ClaimEvidence[];
  dravyaguna?: ClaimEvidence[];
  usefulParts?: ClaimEvidence[];
  therapeuticUses?: ClaimEvidence[];
  formulations?: ClaimEvidence[];
  images?: ClaimEvidence[];
}

export type EvidenceCoverage = { total: number; withEvidence: number; verified: number; reviewed: number; unverified: number; missing: string[] };

export function evidenceCoverage(claims: PlantClaimSet): EvidenceCoverage {
  const groups = Object.entries(claims) as [keyof PlantClaimSet, ClaimEvidence[] | undefined][];
  const all = groups.flatMap(([,items]) => items ?? []);
  const covered = new Set(groups.flatMap(([,items]) => items?.map((x)=>x.claim) ?? []));
  const expected = ["identity","taxonomy","morphology","dravyaguna","usefulParts","therapeuticUses","formulations"];
  return { total: expected.length, withEvidence: covered.size, verified: all.filter(x=>x.verification==="verified").length, reviewed: all.filter(x=>x.verification==="reviewed").length, unverified: all.filter(x=>x.verification==="unverified").length, missing: expected.filter(x=>!covered.has(x)) };
}
