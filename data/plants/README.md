# Canonical Plant Records

One file per plant is recommended. Records must use stable IDs and explicit verification states.

Do not publish a record merely because it parses. Botanical identity, taxonomy, classical claims, modern evidence and images require appropriate review.

The demo record is intentionally non-authoritative and must never be treated as production knowledge.


## Canonical data migration rule
New plant records should be authored as individual structured records under `data/plants/`. The TypeScript catalog remains a transitional runtime seed and must not become the long-term source of truth. Records must pass schema validation before publication.
