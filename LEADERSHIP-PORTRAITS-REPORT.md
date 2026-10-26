# Leadership portraits — 25 October 2026

Branch: `arushi-development`. No commit, push, merge, publication or pull request.

## Implemented

Added the three supplied portraits to the existing Leadership cards using the user's explicit labels:

- Archeesha Sharma (black): `WhatsApp Image 2026-10-24 at 23.13.41 (1).jpeg` → `dist/assets/archeesha-sharma.jpeg`.
- Nidhi Anand (red): `WhatsApp Image 2026-10-24 at 23.13.41.jpeg` → `dist/assets/nidhi-anand.jpeg`.
- S.K. Tandon (blue): `WhatsApp Image 2026-10-24 at 23.14.28.jpeg` → `dist/assets/sk-tandon.jpeg`.

Local copies were resized to a maximum dimension of 640px and saved as JPEGs for website use. Source files were not changed. Existing three-column desktop order, mobile layout, names, positions, links and SEO remain intact.

Read the attached `GA_Digital_Website_Change_Request.pdf` as reference. Its broader page changes, including larger Leadership photos, are separate from this explicit three-portrait update and were not applied in this task.

## Remaining portrait assets

Sharat Mishra and Manish Dutt Sharma still need photographs. Updated `PENDING-CONTENT.md` accordingly.

## Validation

- `npm run build`: passed (58 routes plus 404, sitemap and robots).
- `npm test`: passed (3,616 internal links and 213 image references, metadata/schema and preserved recruitment archive).
- Focused Leadership Playwright test: passed, checking exact image/profile mappings, successful image loading, desktop order and 390px/1440px layout overflow.
- Visual desktop review: correct three portraits displayed on their respective cards.
- `git diff --check`: passed.
- No lint or type-check scripts are configured.

## Exact files modified or added

- `LEADERSHIP-PORTRAITS-REPORT.md`
- `PENDING-CONTENT.md`
- `dist/about/leadership/index.html`
- `dist/assets/archeesha-sharma.jpeg`
- `dist/assets/nidhi-anand.jpeg`
- `dist/assets/sk-tandon.jpeg`
- `people-data.mjs`
- `tests/browser/org-awards.spec.mjs`
