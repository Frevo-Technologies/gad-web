# Visual refresh report — 21 October 2026

Local branch: `arushi-development`. No commit, push, branch publication, merge, deployment or pull request.

This report supersedes the earlier Leadership arrangement and Chief-Manager-only card design, following the user's latest instructions.

## Implemented

- Leadership: six equal profile cards, three per row on desktop, in the exact requested order: Garima Arora, S.K. Tandon, Sharat Mishra; Manish Dutt Sharma, Archeesha Sharma, Nidhi Anand. Responsive two-/one-column layouts remain at smaller widths.
- Our Team: the five approved departments have a refined white/teal design with restrained borders, typography and clear interaction cues. Each reverse shows the complete documented department roster, with names and positions (22 staff total), per the latest request. All five support hover, tap, Enter/Space, Escape and reduced motion. Executives who oversee departments are represented in Leadership rather than duplicated inside staff lists.
- Industries: all nine former SVG/logo-style card illustrations replaced by relevant Pexels photographs. The shared component updates the homepage and Industries overview together. Existing content, routes, flips and organization links remain. Photos are stored locally, resized, lazy-loaded and given descriptive alt text. Existing assets are preserved.
- Clients: added 23 logo/emblem assets, completing 31 of 32 organizations. The existing eight assets are preserved. Shared mappings update the Clients directory, homepage logo ribbon and relevant individual industry portfolios. Search, filters and seamless ribbon behavior remain.
- IGNOU and BEML white wordmarks use dark logo panels for legibility; source artwork is not recoloured.
- PFMS Punjab remains a text card pending identity/logo confirmation. No guessed logo was substituted.

## Still needed

See [PENDING-CONTENT.md](PENDING-CONTENT.md) for the complete remaining content/decision list, including partial names, leadership portraits/links, PFMS identity, current certificates, testimonials, inquiry delivery and Frevone integration.

## Source records

- All nine photos are from pages identifying them as free Pexels stock photographs; usage details: [Pexels license](https://www.pexels.com/license/).
- Per-photo source pages, creators, download URLs and license are recorded in `industry-image-sources.json`.
- Client logo/emblem download URLs are recorded in `client-logo-sources.json`. Sources were checked against the organization identity; official websites/NIC were preferred. MEA, GTB and Lady Hardinge use the government emblems shown on their official websites. BBNL uses its identified [Wikimedia Commons logo](https://commons.wikimedia.org/wiki/File:Bharat_Broadband_Network.png), listed there under CC0.
- New logos are downloaded assets, not drawn/reconstructed or hotlinked. The name/caption remains visible so government emblems are not presented as unique corporate logos.

## Validation

- `npm run build`: passed (58 routes plus 404, sitemap and robots).
- `npm test`: passed (3,616 internal links, 210 image references, metadata/schema and archive checks).
- Relevant Playwright suite: **16/16 passed**, including department rosters/positions, keyboard/hover/tap, two-row Leadership alignment, nine photographs, 31 logo assets, client filtering, desktop/mobile overflow, accessibility scans, reduced motion and earlier regression checks.
- Final focused photo/logo checks after wordmark contrast adjustment: 2/2 passed.
- JavaScript syntax and `git diff --check`: passed.
- Lint/type-check: no scripts configured.

## Exact website, source, test and report files modified/added for this refresh

- `PENDING-CONTENT.md`
- `VISUAL-REFRESH-REPORT.md`
- `build.mjs`
- `client-logo-sources.json`
- `client-logos.mjs`
- `customer-feedback.mjs`
- `dist/about/leadership/index.html`
- `dist/about/our-team/index.html`
- `dist/assets/clients/ashok.png`
- `dist/assets/clients/barc.svg`
- `dist/assets/clients/bbnl.png`
- `dist/assets/clients/beml.png`
- `dist/assets/clients/bhel.png`
- `dist/assets/clients/bses.png`
- `dist/assets/clients/cdac.png`
- `dist/assets/clients/central-railway.jpg`
- `dist/assets/clients/dfccil.png`
- `dist/assets/clients/eci.png`
- `dist/assets/clients/esic.png`
- `dist/assets/clients/gtb.png`
- `dist/assets/clients/hal.png`
- `dist/assets/clients/hpcl.png`
- `dist/assets/clients/icai.png`
- `dist/assets/clients/icar.jpg`
- `dist/assets/clients/ignou.png`
- `dist/assets/clients/iim-mumbai.jpg`
- `dist/assets/clients/lhmc.jpg`
- `dist/assets/clients/mea.svg`
- `dist/assets/clients/niti.svg`
- `dist/assets/clients/pasteur.jpg`
- `dist/assets/clients/petronet.png`
- `dist/assets/industries/bfsi.jpg`
- `dist/assets/industries/education.jpg`
- `dist/assets/industries/energy-utilities.jpg`
- `dist/assets/industries/government-public-sector.jpg`
- `dist/assets/industries/healthcare.jpg`
- `dist/assets/industries/infrastructure-manufacturing.jpg`
- `dist/assets/industries/research-institutions.jpg`
- `dist/assets/industries/telecom.jpg`
- `dist/assets/industries/transportation-hospitality.jpg`
- `dist/clients/index.html`
- `dist/feedback.css`
- `dist/feedback.js`
- `dist/index.html`
- `dist/industries/education/index.html`
- `dist/industries/energy-utilities/index.html`
- `dist/industries/government-public-sector/index.html`
- `dist/industries/healthcare/index.html`
- `dist/industries/index.html`
- `dist/industries/infrastructure-manufacturing/index.html`
- `dist/industries/research-institutions/index.html`
- `dist/industries/telecom/index.html`
- `dist/industries/transportation-hospitality/index.html`
- `feature-components.mjs`
- `industry-image-sources.json`
- `industry-images.mjs`
- `people-data.mjs`
- `tests/browser/org-awards.spec.mjs`
- `tests/browser/visual-refresh.spec.mjs`

## Photo credits

- government-public-sector: [Kampus Production](https://www.pexels.com/photo/office-workers-looking-at-documents-during-a-business-meeting-8439750/).
- education: [RDNE Stock project](https://www.pexels.com/photo/teacher-and-students-in-classroom-8419196/).
- healthcare: [Max Mishin](https://www.pexels.com/photo/group-of-doctors-walking-in-corridor-11119419/).
- energy-utilities: [ThisIsEngineering](https://www.pexels.com/photo/man-standing-among-solar-panels-19895880/).
- infrastructure-manufacturing: [Felipe Silva](https://www.pexels.com/photo/a-man-is-working-on-a-machine-in-a-factory-27102114/).
- bfsi: [RDNE Stock project](https://www.pexels.com/photo/a-man-and-woman-sitting-at-the-table-with-calculator-8292887/).
- research-institutions: [Mikhail Nilov](https://www.pexels.com/photo/scientists-experimenting-in-the-laboratory-9243748/).
- telecom: [panumas nikhomkhai](https://www.pexels.com/photo/it-technician-working-in-data-center-server-room-37605911/).
- transportation-hospitality: [abdo alshreef](https://www.pexels.com/photo/hotel-reception-desk-attendant-in-lobby-36684286/).
