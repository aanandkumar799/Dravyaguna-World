# Data Model — Initial Contract

The core model will be normalized enough to preserve provenance while remaining practical for a student-facing application.

## Core entities
- Plant
- PlantName
- Taxonomy
- PlantPart
- PropertyProfile
- TherapeuticUse
- Formulation
- Reference
- ImageAsset
- ImageVerification
- LearningItem
- UserBookmark
- UserNote
- FeedbackIssue

## Principles
- Stable IDs rather than display names as foreign keys.
- Source/provenance attached to academic claims.
- Image metadata separate from image binary/storage.
- Verification state explicit.
- Schema validation in CI.
- Avoid duplicated facts across UI files.
