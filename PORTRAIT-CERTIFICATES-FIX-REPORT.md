# Portrait sizing and Certificates & Awards correction

Local changes on `arushi-development`; no commit, push or publication.

- Leadership portraits now fill their frames with `object-fit: cover`. Desktop frames are taller to retain Tandon’s head and chin, with his crop positioned at 20%. Existing responsive layouts and the requested leader order are preserved. Original photographs are unchanged.
- The seven supplied certificate, award, trophy and honorary recognition images now share one **Certificates & Awards** page and gallery. The empty current-certifications block and duplicated page ribbon are removed. Certificate entries are labelled Certificate of Achievement; honorary recognition and trophies retain their own descriptions. Full-size links remain.
- Homepage ribbon and navigation use the merged heading. Updated the outstanding-content note to remove the obsolete separate certification request.
- No notice navigation changes in this task. The PDF Resources ref 9 explicitly says “Move archived notices under the Resources section.” Public Notices existed beforehand; keeping both menu links was an implementation choice, not an extra requirement stated in the PDF.

Validation: build and static checks passed (62 routes, 4,363 internal links, 216 image references). Five browser checks passed for desktop/mobile portraits, supplied images, merged gallery, keyboard/touch cards, ribbon and accessibility; the leadership check was rerun successfully after the final framing adjustment. `git diff --check` passed.

Files changed in this correction (content comparison against the start of this task; generated pages listed explicitly):

- `PENDING-CONTENT.md`
- `PORTRAIT-CERTIFICATES-FIX-REPORT.md`
- `build.mjs`
- `content-document.mjs`
- `dist/404.html`
- `dist/about/certifications/index.html`
- `dist/about/index.html`
- `dist/about/leadership/garima-arora/index.html`
- `dist/about/leadership/index.html`
- `dist/about/md-message/index.html`
- `dist/about/our-journey/index.html`
- `dist/about/our-team/index.html`
- `dist/about/presence/index.html`
- `dist/about/vision-values/index.html`
- `dist/careers/apply/index.html`
- `dist/careers/faqs/index.html`
- `dist/careers/index.html`
- `dist/careers/jobs/icmr-nihr-project-roles/index.html`
- `dist/careers/jobs/index.html`
- `dist/careers/jobs/mts-navi-mumbai/index.html`
- `dist/careers/jobs/product-manager-delhi/index.html`
- `dist/careers/jobs/technical-architect-bengaluru/index.html`
- `dist/careers/life-at-ga-digital/index.html`
- `dist/careers/recruitment-fraud-alert/index.html`
- `dist/clients/case-studies/index.html`
- `dist/clients/engagements/actrec/index.html`
- `dist/clients/engagements/icmr/index.html`
- `dist/clients/engagements/uidai/index.html`
- `dist/clients/index.html`
- `dist/clients/key-engagements/index.html`
- `dist/clients/testimonials/index.html`
- `dist/contact/index.html`
- `dist/contact/office-locations/index.html`
- `dist/contact/support/index.html`
- `dist/cookie-policy/index.html`
- `dist/disclaimer/index.html`
- `dist/faqs/index.html`
- `dist/index.html`
- `dist/industries/bfsi/index.html`
- `dist/industries/education/index.html`
- `dist/industries/energy-utilities/index.html`
- `dist/industries/government-public-sector/index.html`
- `dist/industries/healthcare/index.html`
- `dist/industries/index.html`
- `dist/industries/infrastructure-manufacturing/index.html`
- `dist/industries/research-institutions/index.html`
- `dist/industries/telecom/index.html`
- `dist/industries/transportation-hospitality/index.html`
- `dist/insights/index.html`
- `dist/insights/payroll-handover-checklist/index.html`
- `dist/insights/planning-workforce-requirements/index.html`
- `dist/insights/recognizing-recruitment-fraud/index.html`
- `dist/legal/index.html`
- `dist/october-request.css`
- `dist/privacy-policy/index.html`
- `dist/public-notices/index.html`
- `dist/recruitment-disclaimer/index.html`
- `dist/resources/archived-notices/index.html`
- `dist/resources/index.html`
- `dist/services/competence-building/index.html`
- `dist/services/contract-staffing/index.html`
- `dist/services/employment-verification/index.html`
- `dist/services/facility-management/index.html`
- `dist/services/index.html`
- `dist/services/it-technical-manpower/index.html`
- `dist/services/outsourcing-training/index.html`
- `dist/services/recruitment-head-hunting/index.html`
- `dist/terms-conditions/index.html`
- `feature-components.mjs`
- `routes.json`
- `tests/browser/org-awards.spec.mjs`
