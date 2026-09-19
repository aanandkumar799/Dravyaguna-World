# Image & Media Standards

Every gallery image should track:
- plant identity
- plant part
- image type/context
- source
- attribution/license
- alt text
- verification state
- dimensions/optimization metadata where useful

## Display rules
- Plant-part labels must be meaningful: Leaf, Flower, Fruit, Bark, Root, Seed, Whole plant, etc.
- Never expose internal source numbering as the visible plant-part name.
- Do not map an image to a plant solely from filename similarity.
- Broken, ambiguous, duplicate or mismatched images must fail validation or be quarantined.
- Automated image checks are screening tools; final botanical verification requires appropriate review.


## Required provenance fields
For a publishable image, retain the plant part, descriptive alt text, verification state, and a traceable source. When available, also retain the source page URL, license URL, photographer/creator, capture date, caption, and usage notes. A verified image must have a delivered asset URL and must not rely on filename-based identity inference.

## Gallery behavior
The UI must show the meaningful plant-part label and provenance status. Missing assets remain explicitly marked as pending rather than replaced with guessed imagery. Image records are independent from academic plant verification: a plant can remain review-state even when an individual image is verified.
