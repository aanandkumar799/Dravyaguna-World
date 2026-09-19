# Plant Data Pipeline

Canonical records belong under this directory. The pipeline must validate identity, taxonomy, academic provenance, image metadata and verification state before publication.

## Publication states
- draft: incomplete working record; never presented as verified fact
- review: populated and awaiting specialist review
- verified: reviewed and approved for publication
- deprecated: retained for history but excluded from normal discovery

## Ingestion rules
1. Prefer authoritative/classical/taxonomic sources.
2. Preserve source provenance for significant claims.
3. Never fabricate Sanskrit names, shlokas, properties, indications or taxonomy.
4. Images require explicit plant-part, source, license and verification metadata.
5. Automated validation catches structural issues; it does not replace botanical or academic review.
