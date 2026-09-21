# Project Status

## Current phase
**Phase 2 — Full website experience + evidence/production hardening (active build)**

## Completed foundations
- Independent public GitHub repository and governance.
- Architecture, academic, image, testing, security and deployment contracts.
- Next.js/TypeScript and CI foundation.
- Canonical plant schema, typed model and search foundation.
- Catalog/dossier, comparison, responsive UI and learning flows.
- Bookmarks, notes, revision dashboard and local activity history.
- SEO/robots/sitemap foundations.
- Plant quality auditing and publication gate.
- Claim-level evidence model and consolidated evidence catalog.
- Reviewed identity/taxonomy evidence mappings for all 14 seed plants.
- Reviewed official useful-part mappings for the current supported records.
- Official pharmacopoeial evidence mappings added where checked.
- Server-side feedback endpoint implemented with GitHub issue persistence when production secrets are configured.
- Production security headers and evidence validation added to CI.

## Current corpus
14 review-state seed records are loaded:
Tulasi, Ashwagandha, Guduchi, Amalaki, Haritaki, Nimba, Shatavari, Brahmi, Arjuna, Ashoka, Yashtimadhu, Pippali, Shunthi and Maricha.

Academic status remains **review**, not verified. Claim-level evidence is deliberately incomplete where primary/official support has not yet been established.

## Remaining validation work
- Complete primary/classical claim-level evidence for morphology, Dravyaguna properties, therapeutic uses and formulations.
- Complete and verify image corpus.
- Run full typecheck/test/data/evidence/lint/format/build checks in an environment with dependencies installed.
- Browser-based accessibility/performance/PWA smoke testing.
- Configure production feedback secrets.
- Production deployment and public smoke test.

## Deployment
- GitHub repository: public.
- Production URL: **not yet verified**.
- The available Vercel deployment action in this runtime is currently returning Tool deploy_to_vercel not found, so no deployment is being falsely reported as live.
- Vercel CLI/GitHub deployment remains the production path once a usable Vercel project/credentials are available.

## Definition of done
No feature or academic dataset is marked complete without implementation evidence, automated checks, production build evidence, appropriate accessibility/performance/security review, and specialist academic/botanical review where applicable.

## Boundary
Dravyaguna-World is independent from DravyaGuna-97. Do not modify DravyaGuna-97 unless explicitly authorized.


## Plant dataset migration — 2026-09-21
- DravyaGuna 97 plant records are now represented in Dravyaguna World using the World runtime schema.
- Complete source records are retained under each plant record's `legacy` field.
- 111 canonical plant JSON records are present in `data/plants/` (97 syllabus records plus the 14 supplementary records already included by DravyaGuna 97).
- The plant catalog imports the complete dataset; existing search, filters, evidence and learning features continue to use the normalized fields.
