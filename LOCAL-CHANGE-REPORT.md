# GA Digital local change report — 21 October 2026
Follow-up: the supplied organisation chart and award images are implemented in [COMPANY-UPDATES-REPORT.md](COMPANY-UPDATES-REPORT.md). That report supersedes the leadership, team and award dependencies below where resolved.

Branch: `arushi-development`. No commit, push, deployment, branch publication, merge or pull request performed.

## Implemented

- Home: full hero white/light-teal/teal ombre; teal service hover/focus states; continuous logo travel with exact duplicate-set wrapping, pause controls and reduced-motion support.
- Site-wide: current candidate fee is ₹10,000, including FAQ assistant, FAQs, recruitment guidance and current notices. The archived 14 June 2025 notice is preserved. Official supplied Instagram and Facebook links are in the footer. Our Team navigation and metadata replace HR Team.
- Company: Garima’s email is `garima1200@hotmail.com`; existing leadership card design and members retained, diagram connector lines removed. Existing documented award retained.
- Services: approved What You Need and Our Approach copy on Contract Staffing, Recruitment & Head Hunting, the existing combined Outsourcing & Training page, and Competence & Skill Development. Dark-teal Contract Staffing sector hover/focus. Facility Management category 11 contains the supplied IT and Technical Manpower copy and five role groups.
- FAQs: all twelve supplied questions, including T+7; ₹10,000 overrides the older amount in the DOCX. Accounts contact retained and verified HRMS address appended.
- Contact / Locations: ten verified addresses, using the existing selectable card and map component: Ghaziabad, Delhi, Mumbai, Lucknow, Gwalior, Chennai, Guwahati, Kolkata, IISER Bhopal and IIT Indore. Existing national 11-zonal-office statistic is preserved; it is distinct from the ten published addresses.
- Legal: consolidated `/legal` index links the four existing documents; footer and sitemap updated without new legal wording.

## Pending content / approvals

- Industry photography: provide approved workforce photographs for the nine industries. Existing assets are illustrations or lack verified sector-specific photography approval; visuals remain intact rather than using invented/downloaded replacements.
- Leadership: approved reporting hierarchy. Existing verified names/roles are retained; no new positions or reporting lines assumed.
- Our Team: approved department list and exact Chief Manager names, including separate PF and ESIC managers. Current functioning section retained; department flips await these details.
- Certifications / awards: current certificates, scope, validity, approved award assets and titles/dates. Existing badges alone cannot verify current certification. The supplied PDF also asks for currency confirmation. Certificate ribbon remains pending; existing documented award is preserved.
- Testimonials: approved initial quotes, attribution and optional client photos. Future collection process requires Niranjan Sir’s confirmation; no public submission form added.
- Inquiry: current form prepares a mailto draft, defaults to `hr@gadigital.in` and allows department selection; fallback is `info@gadigital.in`. It does not send or store submissions on a server. Niranjan Sir must confirm the intended recipient and an email-delivery backend is needed for automatic delivery. Destination unchanged.
- Careers: current destination is `http://gad-hrms.frevo.co.in/open-positions`. Existing integration only contains this URL; there is no public vacancies API, registration URL or job-specific authentication configuration in the repo. External inspection was unavailable. Frevone team must supply/confirm public vacancy access, login/registration and return-to-job support before the requested application flow can be implemented. Existing integration preserved; no invented vacancies/endpoints.
- Services: supplied DOCX has four service entries and combines Outsourcing & Training. Separate fifth Training page/copy is not supplied; current combined route preserved.
- Sindhudurg: held pending at the user’s explicit request. Address photo includes a personal name and mobile number; none published.
- Client logos: all eight approved logo assets are already mapped. Additional official approved assets are missing for the organizations listed below.

- NITI Aayog
- Election Commission of India
- Ministry of External Affairs
- IGNOU
- IIM Mumbai
- The Institute of Chartered Accountants of India
- Employees State Insurance Corporation
- GTB Hospital
- Lady Hardinge Medical College
- Pasteur Institute of India
- Hindustan Petroleum Corporation Limited
- BSES Rajdhani
- Petronet LNG
- Hindustan Aeronautics Limited
- Bharat Heavy Electricals Limited
- Bharat Earth Movers Limited
- Public Financial Management System, Punjab
- Bharat Broadband Network Limited
- Central Railway
- Dedicated Freight Corridor Corporation of India
- Ashok Hotel
- Bhabha Atomic Research Centre
- Centre for Development of Advanced Computing
- Indian Council of Agricultural Research

## Validation

- `npm run build`: passed (58 routes plus 404, sitemap and robots).
- `npm test`: passed (58 routes, 3,580 internal links, 98 image references, metadata/schema and preserved recruitment archive).
- Relevant Playwright suite: 10/10 passed; includes desktop/mobile layout, accessibility scans, inquiry/verification email drafts, FAQ assistant, approved copy, locations, Legal links, hover/focus colors, logo loop boundary and reduced motion.
- JavaScript syntax checks and `git diff --check`: passed.
- Lint/type-check: no scripts configured.
- Browser tests required permission to run the localhost preview server outside the sandbox.

## Exact files modified or added

- `LOCAL-CHANGE-REPORT.md`
- `approved-content.mjs`
- `build.mjs`
- `confirmed-feedback.mjs`
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
- `dist/faq-chat.js`
- `dist/faqs/index.html`
- `dist/feedback.css`
- `dist/feedback.js`
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
- `dist/services/competence-building/index.html`
- `dist/services/contract-staffing/index.html`
- `dist/services/employment-verification/index.html`
- `dist/services/facility-management/index.html`
- `dist/services/index.html`
- `dist/services/outsourcing-training/index.html`
- `dist/services/recruitment-head-hunting/index.html`
- `dist/sitemap.xml`
- `dist/terms-conditions/index.html`
- `feature-components.mjs`
- `people-data.mjs`
- `routes.json`
- `tests/browser/compact-ribbon.spec.mjs`
- `tests/browser/confirmed-feedback.spec.mjs`
- `tests/browser/content-document.spec.mjs`
- `tests/browser/faq-chat.spec.mjs`
- `tests/browser/october-updates.spec.mjs`
- `tests/site-checks.mjs`
