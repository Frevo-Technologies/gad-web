# Client testimonials and Netlify release

26 October 2026. The website owner explicitly authorised pushing and merging the website changes and confirmed that the supplied testimonials came from clients, with instructions to add them to the site.

## Changes in this release

- All 14 supplied testimonials are enabled on `/clients/testimonials`, with three-card previews on Homepage and Clients linking to the complete list.
- Quotations retain the supplied wording. Officer and organisation attributions use the provided text; no individual names, signatures, signed approvals or approval dates are invented.
- The data records the website owner's publication authorisation and its date separately from the original PDF's draft status. This supersedes the previous local-review-only handling described in the earlier commit report.
- The old local review URL redirects to the public Testimonials page. The compatibility helper is retained.
- Canonical links, OpenGraph URLs, structured-data URLs, robots and sitemap now use the requested production origin `https://gadigital.netlify.app` instead of the old preview hostname.
- Pending-content notes and testimonial browser checks reflect the publication authorisation.

## Verification before publication

- The existing Netlify homepage matched `origin/main:dist/index.html` exactly before this release.
- GitHub's previous PR #1 shows a successful `netlify/gadigital/deploy-preview` check pointing to this Netlify project.
- `npm run build` and `npm test` passed for the updated production metadata: 62 routes, 4,425 internal links and 216 image references.
- All 23 relevant browser checks passed: all local routes at 360/768/1440px, public testimonial cards at 390/768/1440px, all 14 exact quotations/attributions, three-card previews, review URL handoff, office maps, forms, filters, navigation, chatbot and accessibility.
- `git diff --check` passed. Final deployment is verified separately against the live Netlify URL after the merge.

## Exact files changed in this release commit

This list is relative to commit `8ecab50`. Earlier website changes remain in that commit and are included in the merge. Generated pages are listed individually because their production metadata changed.

75 files.

- `PENDING-CONTENT.md`
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
- `dist/privacy-policy/index.html`
- `dist/public-notices/index.html`
- `dist/recruitment-disclaimer/index.html`
- `dist/resources/archived-notices/index.html`
- `dist/resources/index.html`
- `dist/robots.txt`
- `dist/services/competence-building/index.html`
- `dist/services/contract-staffing/index.html`
- `dist/services/employment-verification/index.html`
- `dist/services/facility-management/index.html`
- `dist/services/index.html`
- `dist/services/it-technical-manpower/index.html`
- `dist/services/outsourcing-training/index.html`
- `dist/services/recruitment-head-hunting/index.html`
- `dist/sitemap.xml`
- `dist/terms-conditions/index.html`
- `dist/testimonial-cards.css`
- `october-request.mjs`
- `review/client-testimonials.mjs`
- `server.mjs`
- `site-data.mjs`
- `testimonial-components.mjs`
- `testimonial-data.mjs`
- `tests/browser/testimonials.spec.mjs`
- `NETLIFY-RELEASE-REPORT.md`
