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
