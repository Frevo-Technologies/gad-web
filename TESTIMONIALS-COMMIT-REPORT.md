# Testimonial drafts and website commit

26 October 2026. Work remains local to `gad-web` on `arushi-development`. The user explicitly authorised committing the changes; no push, deployment, merge or pull request was requested or performed.

## Testimonial addition

- Transcribed all 14 entries from `GA_Digital_Client_Testimonials_DRAFT_for_Approval.pdf`, with their original proposed wording and suggested officer/organisation attributions. No individual names, signatures or client approvals were supplied, so none were invented.
- Local preview: `http://localhost:4173/review/client-testimonials`. Every card is labelled draft and awaiting client approval; the page explains that these are suggested statements rather than confirmed endorsements.
- The local server binds to loopback, serves this page with no-store/noindex headers, and does not export it to `dist` or the sitemap. Source data and renderer are committed for review, while the generated deployable site excludes unapproved quotes.
- Main website testimonial sections now use a shared component that includes an entry only when its status is approved and its final attribution and approval reference have been recorded. All 14 supplied entries currently remain drafts.
- Updated `PENDING-CONTENT.md`: the wording is now provided; outstanding items are client sign-off, edits if any, and final attribution.

The PDF's approval language is treated as context for the supplied drafts, not as authority to change the user's workflow. This implements the user's request to add the material locally and commit it without presenting suggested client statements as established endorsements.

## Commit scope

The commit includes these testimonial additions and the existing website changes from this session: leadership portraits/framing, the merged Certificates & Awards page, five departmental flip cards and Ritu correction, approved content updates, IT manpower, Resources/archive/disclaimer pages, shared office map/chatbot updates, Careers links, generated output, assets, tests and local handover reports. Earlier reports retain the details and limitations of each task.

## Validation

- `npm run build` passed: 62 generated routes plus 404, sitemap and robots.
- `npm test` passed: 62 routes, 4,425 internal links and 216 image references.
- All 23 relevant browser checks passed, including targeted reruns after correcting mobile wrapping on the draft review page. They cover all local routes at mobile/tablet/desktop widths, enquiry forms/download, navigation, filters, maps, chatbot, accessibility, and all 14 draft quotes/attributions with verification that unapproved quotes stay out of generated website pages.

- Normalised line endings/trailing whitespace in the newly vendored Leaflet CSS and license; license wording and runtime behaviour are unchanged. Staged whitespace checks passed.

## Exact files included

All added or modified website files included in this commit are listed below. Ignored screenshots, temporary files and test outputs are excluded. The supplied PDF remains in Downloads and is not copied into the repository.

109 files.

| Status | File |
| --- | --- |
| M | `PENDING-CONTENT.md` |
| M | `build.mjs` |
| M | `confirmed-feedback.mjs` |
| M | `content-document.mjs` |
| M | `dist/404.html` |
| M | `dist/about/certifications/index.html` |
| M | `dist/about/index.html` |
| M | `dist/about/leadership/garima-arora/index.html` |
| M | `dist/about/leadership/index.html` |
| M | `dist/about/md-message/index.html` |
| M | `dist/about/our-journey/index.html` |
| M | `dist/about/our-team/index.html` |
| M | `dist/about/presence/index.html` |
| M | `dist/about/vision-values/index.html` |
| M | `dist/app.js` |
| M | `dist/careers/apply/index.html` |
| M | `dist/careers/faqs/index.html` |
| M | `dist/careers/index.html` |
| M | `dist/careers/jobs/icmr-nihr-project-roles/index.html` |
| M | `dist/careers/jobs/index.html` |
| M | `dist/careers/jobs/mts-navi-mumbai/index.html` |
| M | `dist/careers/jobs/product-manager-delhi/index.html` |
| M | `dist/careers/jobs/technical-architect-bengaluru/index.html` |
| M | `dist/careers/life-at-ga-digital/index.html` |
| M | `dist/careers/recruitment-fraud-alert/index.html` |
| M | `dist/clients/case-studies/index.html` |
| M | `dist/clients/engagements/actrec/index.html` |
| M | `dist/clients/engagements/icmr/index.html` |
| M | `dist/clients/engagements/uidai/index.html` |
| M | `dist/clients/index.html` |
| M | `dist/clients/key-engagements/index.html` |
| M | `dist/clients/testimonials/index.html` |
| M | `dist/contact/index.html` |
| M | `dist/contact/office-locations/index.html` |
| M | `dist/contact/support/index.html` |
| M | `dist/cookie-policy/index.html` |
| M | `dist/faq-chat.js` |
| M | `dist/faqs/index.html` |
| M | `dist/index.html` |
| M | `dist/industries/bfsi/index.html` |
| M | `dist/industries/education/index.html` |
| M | `dist/industries/energy-utilities/index.html` |
| M | `dist/industries/government-public-sector/index.html` |
| M | `dist/industries/healthcare/index.html` |
| M | `dist/industries/index.html` |
| M | `dist/industries/infrastructure-manufacturing/index.html` |
| M | `dist/industries/research-institutions/index.html` |
| M | `dist/industries/telecom/index.html` |
| M | `dist/industries/transportation-hospitality/index.html` |
| M | `dist/insights/index.html` |
| M | `dist/insights/payroll-handover-checklist/index.html` |
| M | `dist/insights/planning-workforce-requirements/index.html` |
| M | `dist/insights/recognizing-recruitment-fraud/index.html` |
| M | `dist/legal/index.html` |
| M | `dist/privacy-policy/index.html` |
| M | `dist/public-notices/index.html` |
| M | `dist/recruitment-disclaimer/index.html` |
| M | `dist/services/competence-building/index.html` |
| M | `dist/services/contract-staffing/index.html` |
| M | `dist/services/employment-verification/index.html` |
| M | `dist/services/facility-management/index.html` |
| M | `dist/services/index.html` |
| M | `dist/services/outsourcing-training/index.html` |
| M | `dist/services/recruitment-head-hunting/index.html` |
| M | `dist/sitemap.xml` |
| M | `dist/terms-conditions/index.html` |
| M | `feature-components.mjs` |
| M | `frevone-integration.mjs` |
| M | `people-data.mjs` |
| M | `routes.json` |
| M | `server.mjs` |
| M | `tests/browser/confirmed-feedback.spec.mjs` |
| M | `tests/browser/content-document.spec.mjs` |
| M | `tests/browser/faq-chat.spec.mjs` |
| M | `tests/browser/frevone.spec.mjs` |
| M | `tests/browser/navigation-map.spec.mjs` |
| M | `tests/browser/org-awards.spec.mjs` |
| M | `tests/browser/site.spec.mjs` |
| M | `tests/site-checks.mjs` |
| ?? | `LEADERSHIP-PORTRAITS-REPORT.md` |
| ?? | `PDF-IMPLEMENTATION-REPORT.md` |
| ?? | `PORTRAIT-CERTIFICATES-FIX-REPORT.md` |
| ?? | `TESTIMONIALS-COMMIT-REPORT.md` |
| ?? | `dist/assets/archeesha-sharma.jpeg` |
| ?? | `dist/assets/leaflet/LICENSE.txt` |
| ?? | `dist/assets/leaflet/images/layers-2x.png` |
| ?? | `dist/assets/leaflet/images/layers.png` |
| ?? | `dist/assets/leaflet/images/marker-icon-2x.png` |
| ?? | `dist/assets/leaflet/images/marker-icon.png` |
| ?? | `dist/assets/leaflet/images/marker-shadow.png` |
| ?? | `dist/assets/leaflet/leaflet.css` |
| ?? | `dist/assets/leaflet/leaflet.js` |
| ?? | `dist/assets/nidhi-anand.jpeg` |
| ?? | `dist/assets/sk-tandon.jpeg` |
| ?? | `dist/disclaimer/index.html` |
| ?? | `dist/october-request.css` |
| ?? | `dist/offices-map.js` |
| ?? | `dist/resources/archived-notices/index.html` |
| ?? | `dist/resources/index.html` |
| ?? | `dist/services/it-technical-manpower/index.html` |
| ?? | `dist/testimonial-cards.css` |
| ?? | `october-request.mjs` |
| ?? | `office-data.mjs` |
| ?? | `office-map-sources.json` |
| ?? | `review/client-testimonials.mjs` |
| ?? | `testimonial-components.mjs` |
| ?? | `testimonial-data.mjs` |
| ?? | `tests/browser/pdf-request.spec.mjs` |
| ?? | `tests/browser/testimonials.spec.mjs` |
