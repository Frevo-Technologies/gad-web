# IT & Technical Manpower page update

10 November 2026. Local work in `gad-web` on `arushi-development`.

The IT page now uses the existing service-page template instead of a separate page override: shared service banner and enquiry link, photo section, What You Need / Our Approach, capability grid, client references, company context, FAQs and final contact section. Existing technical role groups are preserved, including AI engineers and CTO/CXO roles.

C-DAC and UIDAI are shown side by side as client references. C-DAC links to the supplied client testimonial; UIDAI links to the existing specialist recruitment engagement page. No new contract scale, outcome or live-vacancy claims were added.

Reused the existing licensed server-room photograph at `dist/assets/industries/telecom.jpg`. No asset was downloaded, generated, modified or deleted. Its existing attribution is recorded in `industry-image-sources.json`.

Validation:

- `npm run build` passed: 62 routes plus 404, sitemap and robots.
- `npm test` passed: 4,430 internal links and 312 image references.
- Nine browser checks passed across IT service, content-document and PDF-request suites. Checks include 360/768/1440px layouts, image loading, keyboard FAQs, accessibility, both reference destinations and IT service selection in the enquiry form.
- File hashes confirm that only the IT service's generated HTML changed; other generated pages remain identical.
- `git diff --check` passed.

Exact files modified:

- `october-request.mjs`
- `approved-content.mjs`
- `content-document.mjs`
- `dist/services/it-technical-manpower/index.html`
- `tests/browser/pdf-request.spec.mjs`

Files added:

- `tests/browser/it-service.spec.mjs`
- `IT-MANPOWER-UPDATE-REPORT.md` (this report)

No commit, push, merge or deployment performed.
