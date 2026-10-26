# GA Digital — PDF implementation and handover

25 October 2026. Local work only in `gad-web`, branch `arushi-development`. Nothing committed, pushed, published, merged or submitted as a pull request.

Request: implement `GA_Digital_Website_Change_Request.pdf` (24 October 2026), replace the Tender staff entry with **Ritu**, and identify remaining information. The PDF supplies website requirements and content; it does not override the user's local-only restriction. Source documents and original supplied image files were not changed.

## Requirement status

| PDF ref | Request | Local result / dependency |
| --- | --- | --- |
| 3 | Homepage HR and Candidate Insights, pictures | Complete. Separate labelled groups, with a picture for every article. Insight filters use these categories. |
| 21 | Remove decorative numbering | Complete. Removed section/card sequence numbers, retaining meaningful statistics, dates, addresses and original legal/archive records. |
| 19 | Full legal company name | Complete for generated website copy, metadata, accessible labels and runtime help/enquiry messages. Original scanned assets and verbatim historical notice remain unchanged. |
| 2 | Updated awards pictures | Seven supplied awards/certificate/trophy images retained and verified, with full-size links and dates. Current operational certification documents remain a separate outstanding item. |
| 4 | Hold MD message | Complete. Draft message is absent from rendered pages. Its source is retained locally for review; the old message URL leads to About without the removed fragment. |
| 5 | Larger leadership photos | Complete for supplied portraits. Large, aligned portraits retain the requested desktop order: Garima Arora, S.K. Tandon, Sharat Mishra / Manish Dutt Sharma, Archeesha Sharma, Nidhi Anand. Missing Sharat and Manish photos still use initials. |
| 6 | Chief Managers at top | Complete. Compliance chiefs precede the other staff; both Finance and Payroll chiefs precede other Finance & Account staff. Other departments already begin with their documented senior member. Shikha Dixit's documented Assistant Manager title is retained rather than promoting her. |
| 7 | Nishad → Ritu | Complete. **Ritu**, Jr. Tender Executive. No surname added or requested. |
| 8 | Front email and handling chief | Complete. Five department cards show handling officers and clickable department emails. The email is outside the flip button for valid accessible interaction and remains available on either face. Tender: Nidhi Anand; HR: Archeesha Sharma; Compliance/Finance: Manish Dutt Sharma; HRMS: Manish Dutt Sharma and Archeesha Sharma. Full available staff names and positions remain on the reverse. |
| 25 | Dedicated IT & Technical Manpower | Complete page/navigation/service entry at `/services/it-technical-manpower`, with supplied IT role groups, AI engineers, CTO/CXO roles and C-DAC reference. Exact client/designation engagement claims await the approved mapping below. |
| 12 | Facility link on every service | Complete. Direct in-page Facility Management link on every service detail page, with existing service navigation retained. |
| 20 | Placement fee only on Recruitment | Complete. Approved ₹10,000 policy appears on Recruitment. Homepage and other pages/chatbot link to the authoritative Recruitment section instead of repeating fee details. |
| 23 | Correct clients and supplied designations | Partial. Removed the old inferred sector/service associations. Added a neutral client-reference enquiry section to each service. **Actual replacement client → supplied-designation data is required**; no staffing history is invented. |
| 24 | Training Provided | Complete using supplied approved copy: interview preparation and communication, teamwork, professional conduct, workplace behaviour and confidence. Both relevant training service pages contain the section. |
| 13 | Photos on insights | Complete. All three cards and their article pages have local images. |
| 14 | Every client industry visible | Verified. All 9 categories and all 32 client entries remain available through the filter. Existing logos retained; PFMS Punjab identity/logo still awaits confirmation. |
| 15 | Client Success Stories section | Section/library added, linked from Clients and Resources. Existing published recruitment engagements are explicitly identified as context, not invented success outcomes. **Approved client stories are still needed.** |
| 16 | Testimonials section | Section and page added/retained, linked from Clients, Homepage and Resources. **Approved quotes and attribution are still needed.** No sample quotes are presented as real feedback. |
| 9 (Resources) | Archived notices under Resources | Complete. `/resources/archived-notices`, Resources navigation/footer entry and Public Notices link. Original 14 June 2025 notice is preserved verbatim. |
| 17 | FrevoOne login, direct jobs/admin | Partial. Local Careers page now offers verified HTTPS official jobs, Client sign in and Admin sign in links, rather than instantly redirecting every visitor. Existing application/detail URLs still reach the official portal. **A public vacancy-list feed or working public list endpoint and confirmation of account permissions are needed for live jobs inside this website.** External accounts/roles were not created or changed. |
| 1 | MP office and PIN | IISER Bhopal is present with **462066**, and IIT Indore is retained. **Company-confirmed IIT Indore postal address/PIN is still needed** if a PIN must be displayed for that location too. The campus geocoder result is not assumed to establish the company mailing address. |
| 18 | Every office pinned on interactive map | Complete for 10 known addresses. Leaflet map shows all pins, selection/popups, directions, zoom and Show all offices. Several coordinates identify approximate areas/cities/campuses; this is labelled. Exact entrance/map links would improve precision. Sindhudurg remains unpublished as instructed. |
| 27 | Consistent department emails | Complete formatting and shared department source for team/contact pages. **Confirm `compliance@gaidgital.in`**, whose supplied domain differs from the others; no replacement is guessed. |
| 26 | Chatbot all offices | Complete. Chatbot reads the same 10-office directory as the map, including all full written addresses. |
| 9 (Legal) | Disclaimer page | Local `/disclaimer` page, footer and Legal links are in place. It contains factual website/recruitment contact information and links to policies, and remains noindex. **Ria's approved company-wide disclaimer wording is required to finish legal content.** No deployment performed. |

## Information to send next

1. A list or spreadsheet of **service → client → designations actually supplied**, including C-DAC/IT.
2. Approved client success stories with facts/outcomes and permission; approved testimonial text with speaker, role, organisation and permission.
3. Final approved MD message and Ria's final Disclaimer text.
4. FrevoOne integration contact: public job listing/feed/API details and confirmation of the client/admin account access intended for this site. Do not send passwords in chat.
5. Confirm the Compliance email spelling and IIT Indore's postal address/PIN. For precise building pins, provide Google Maps location links for the offices.

Other previously pending items remain in `PENDING-CONTENT.md`: Sharat/Manish portraits, optional S.K. Tandon email and leaders' LinkedIn links, full names for Ajay/Kajal if available, PFMS Punjab identity/logo, current operational certificates, and any future enquiry backend. Sindhudurg stays on hold; no further confirmation is presumed.

## Validation

- `npm run build`: 62 routes, 404, sitemap and robots built successfully.
- `npm test`: 62 routes, 4,371 internal links and 223 image references; metadata, schema, archives, fee placement and FrevoOne access passed.
- 33 distinct browser checks across `pdf-request`, `site`, `org-awards`, `navigation-map`, `frevone`, `content-document`, `confirmed-feedback`, `faq-chat` and `hero-background` suites passed, including targeted reruns after fixes. They cover every local route at 360/768/1440px, portrait order/load, seven award images, five team cards/22 staff, keyboard/touch interactions, client categories, enquiry drafts/download, legacy redirects, all map pins/address synchronisation, chatbot, image hero and WCAG A/AA checks on relevant pages.
- The first runs caught an obsolete MD fragment redirect and a stale ambiguous test selector; both were corrected and affected checks rerun successfully.
- Browser map tests stub external tile requests; markers, local Leaflet assets, controls, address selection and popups are tested without bulk-fetching OSM tiles. External authentication, permissions and live vacancy delivery require FrevoOne-side access and were not claimed as tested.
- Original archive text verified against `research.json`. No existing assets deleted. No new runtime npm dependency added.

## Map asset provenance

Leaflet 1.9.4 is stored locally with its BSD license at `dist/assets/leaflet/LICENSE.txt`. Map/coordinate attribution is visible. `office-map-sources.json` records cached matches and their precision.

References: [Leaflet quick start](https://leafletjs.com/examples/quick-start/), [OpenStreetMap attribution](https://www.openstreetmap.org/copyright), [Nominatim usage policy](https://operations.osmfoundation.org/policies/nominatim/), [tile usage policy](https://operations.osmfoundation.org/policies/tiles/). No API key is required by the present map implementation.

## Exact files changed in this task

The following list compares file content with the snapshot taken before this PDF implementation. Generated HTML is listed explicitly because shared navigation, company naming, styles and shared office data changed across pages. Pre-existing portrait additions and their earlier report/test changes were preserved; unchanged files from that prior work are excluded here. Temporary ignored artifacts/test outputs are excluded.

96 files added or modified.

| Status | File |
| --- | --- |
| Added | `PDF-IMPLEMENTATION-REPORT.md` |
| Modified | `PENDING-CONTENT.md` |
| Modified | `build.mjs` |
| Modified | `confirmed-feedback.mjs` |
| Modified | `content-document.mjs` |
| Modified | `dist/404.html` |
| Modified | `dist/about/certifications/index.html` |
| Modified | `dist/about/index.html` |
| Modified | `dist/about/leadership/garima-arora/index.html` |
| Modified | `dist/about/leadership/index.html` |
| Modified | `dist/about/md-message/index.html` |
| Modified | `dist/about/our-journey/index.html` |
| Modified | `dist/about/our-team/index.html` |
| Modified | `dist/about/presence/index.html` |
| Modified | `dist/about/vision-values/index.html` |
| Modified | `dist/app.js` |
| Added | `dist/assets/leaflet/LICENSE.txt` |
| Added | `dist/assets/leaflet/images/layers-2x.png` |
| Added | `dist/assets/leaflet/images/layers.png` |
| Added | `dist/assets/leaflet/images/marker-icon-2x.png` |
| Added | `dist/assets/leaflet/images/marker-icon.png` |
| Added | `dist/assets/leaflet/images/marker-shadow.png` |
| Added | `dist/assets/leaflet/leaflet.css` |
| Added | `dist/assets/leaflet/leaflet.js` |
| Modified | `dist/careers/apply/index.html` |
| Modified | `dist/careers/faqs/index.html` |
| Modified | `dist/careers/index.html` |
| Modified | `dist/careers/jobs/icmr-nihr-project-roles/index.html` |
| Modified | `dist/careers/jobs/index.html` |
| Modified | `dist/careers/jobs/mts-navi-mumbai/index.html` |
| Modified | `dist/careers/jobs/product-manager-delhi/index.html` |
| Modified | `dist/careers/jobs/technical-architect-bengaluru/index.html` |
| Modified | `dist/careers/life-at-ga-digital/index.html` |
| Modified | `dist/careers/recruitment-fraud-alert/index.html` |
| Modified | `dist/clients/case-studies/index.html` |
| Modified | `dist/clients/engagements/actrec/index.html` |
| Modified | `dist/clients/engagements/icmr/index.html` |
| Modified | `dist/clients/engagements/uidai/index.html` |
| Modified | `dist/clients/index.html` |
| Modified | `dist/clients/key-engagements/index.html` |
| Modified | `dist/clients/testimonials/index.html` |
| Modified | `dist/contact/index.html` |
| Modified | `dist/contact/office-locations/index.html` |
| Modified | `dist/contact/support/index.html` |
| Modified | `dist/cookie-policy/index.html` |
| Added | `dist/disclaimer/index.html` |
| Modified | `dist/faq-chat.js` |
| Modified | `dist/faqs/index.html` |
| Modified | `dist/index.html` |
| Modified | `dist/industries/bfsi/index.html` |
| Modified | `dist/industries/education/index.html` |
| Modified | `dist/industries/energy-utilities/index.html` |
| Modified | `dist/industries/government-public-sector/index.html` |
| Modified | `dist/industries/healthcare/index.html` |
| Modified | `dist/industries/index.html` |
| Modified | `dist/industries/infrastructure-manufacturing/index.html` |
| Modified | `dist/industries/research-institutions/index.html` |
| Modified | `dist/industries/telecom/index.html` |
| Modified | `dist/industries/transportation-hospitality/index.html` |
| Modified | `dist/insights/index.html` |
| Modified | `dist/insights/payroll-handover-checklist/index.html` |
| Modified | `dist/insights/planning-workforce-requirements/index.html` |
| Modified | `dist/insights/recognizing-recruitment-fraud/index.html` |
| Modified | `dist/legal/index.html` |
| Added | `dist/october-request.css` |
| Added | `dist/offices-map.js` |
| Modified | `dist/privacy-policy/index.html` |
| Modified | `dist/public-notices/index.html` |
| Modified | `dist/recruitment-disclaimer/index.html` |
| Added | `dist/resources/archived-notices/index.html` |
| Added | `dist/resources/index.html` |
| Modified | `dist/services/competence-building/index.html` |
| Modified | `dist/services/contract-staffing/index.html` |
| Modified | `dist/services/employment-verification/index.html` |
| Modified | `dist/services/facility-management/index.html` |
| Modified | `dist/services/index.html` |
| Added | `dist/services/it-technical-manpower/index.html` |
| Modified | `dist/services/outsourcing-training/index.html` |
| Modified | `dist/services/recruitment-head-hunting/index.html` |
| Modified | `dist/sitemap.xml` |
| Modified | `dist/terms-conditions/index.html` |
| Modified | `feature-components.mjs` |
| Modified | `frevone-integration.mjs` |
| Added | `october-request.mjs` |
| Added | `office-data.mjs` |
| Added | `office-map-sources.json` |
| Modified | `people-data.mjs` |
| Modified | `routes.json` |
| Modified | `tests/browser/confirmed-feedback.spec.mjs` |
| Modified | `tests/browser/content-document.spec.mjs` |
| Modified | `tests/browser/faq-chat.spec.mjs` |
| Modified | `tests/browser/frevone.spec.mjs` |
| Modified | `tests/browser/navigation-map.spec.mjs` |
| Added | `tests/browser/pdf-request.spec.mjs` |
| Modified | `tests/browser/site.spec.mjs` |
| Modified | `tests/site-checks.mjs` |
