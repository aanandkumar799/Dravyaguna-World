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

export type EvidenceCoverage = {
  total: number;
  withEvidence: number;
  verified: number;
  reviewed: number;
  unverified: number;
  missing: string[];
};

const expected: (keyof PlantClaimSet)[] = [
  "identity",
  "taxonomy",
  "morphology",
  "dravyaguna",
  "usefulParts",
  "therapeuticUses",
  "formulations",
];

export function evidenceCoverage(claims: PlantClaimSet): EvidenceCoverage {
  const groups = Object.entries(claims) as [keyof PlantClaimSet, ClaimEvidence[] | undefined][];
  const all = groups.flatMap(([, items]) => items ?? []);
  const covered = new Set(
    groups
      .filter(([, items]) => Boolean(items?.length))
      .map(([key]) => key),
  );

  return {
    total: expected.length,
    withEvidence: expected.filter((key) => covered.has(key)).length,
    verified: all.filter((item) => item.verification === "verified").length,
    reviewed: all.filter((item) => item.verification === "reviewed").length,
    unverified: all.filter((item) => item.verification === "unverified").length,
    missing: expected.filter((key) => !covered.has(key)).map(String),
  };
}
