# Architecture — Initial Decision Record

## Target architecture
A modern, responsive web application/PWA with:
- component-based frontend
- typed application code
- structured plant data separated from presentation
- searchable plant index
- server/API boundary where needed
- automated validation and CI
- image/media metadata layer
- accessible UI
- SEO and canonical URLs
- low-cost deployment path

## Architectural priorities
1. Correctness and traceability
2. Maintainability
3. Fast mobile experience
4. Search/discovery quality
5. Data quality
6. Security
7. Low operating cost

## Decision process
The implementation stack is not locked merely because this document exists. The engineering/architecture review must evaluate current stable options against these priorities before the first production application scaffold.

## Non-negotiables
- Stable plant IDs/slugs
- Schema validation for plant records
- Reference/source metadata
- Image metadata and verification state
- Automated tests and checks
- No credentials in repository
