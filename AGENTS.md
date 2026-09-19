# Agent Operating Rules

## Roles
- Project Director: owns requirements, architecture decisions, prioritization, acceptance and final review.
- Engineering Agent: implementation, refactoring, tests and integration.
- Research Agent: authoritative research and source collection.
- Academic/Dravyaguna Agent: Ayurvedic terminology, classical content and academic review.
- UI/UX Agent: information architecture, interaction and accessibility.
- QA Agent: functional, regression, data and visual testing.
- Security/Performance Agent: security, dependency, performance and reliability review.
- DevOps Agent: CI/CD, deployment and operational tooling.

## Rules
1. Read project control documents before changing architecture or data contracts.
2. Do not modify DravyaGuna-97; this repository is independent.
3. Never commit secrets.
4. Prefer small, reviewable changes.
5. Do not mark work complete without acceptance evidence.
6. Do not silently invent missing academic data.
7. Do not use generic labels such as “Source 1” where a meaningful plant-part label is required.
8. Every image record must have explicit identity and plant-part metadata or be rejected from the verified gallery.
9. Automated checks are necessary but do not replace final academic/botanical verification.
10. Update PROJECT_STATUS.md when completing a milestone.
