# GA Digital corporate website

A responsive, statically generated corporate site for GA Digital Web Word Pvt. Ltd. Built in `D:\Projects\gweb` from the supplied master brief. No application runtime dependencies; Node.js 20+ is required for generation and local preview.

## Run locally

```sh
npm install
npm run build
npm run dev
```

Open `http://127.0.0.1:4173`. `dist/` contains the complete deployable website. Clean URLs are represented by directory indexes. Unknown routes return the custom 404 page from the local server.

## What is included

- 58 generated routes across company, services, industries, clients, insights, careers, contact and legal sections.
- Original GA Digital logo, original leadership photograph and original credential badges.
- Six verified core service pages plus a payroll/workforce administration capability page.
- Nine industry pages, searchable client references and documented engagement contexts.
- Three original editorial guides with article pages and search/category filtering.
- Searchable job notices, location/category/status/type filters, vacancy details, original application handoffs and candidate FAQs.
- Recruitment fraud guidance and the exact formal notice, with the separate joining-deposit notice preserved distinctly.
- Validated business enquiry preparation with loading, validation, success and error states; email draft and text download.
- Keyboard-operable navigation and accordions, focus styling, reduced-motion support and responsive layouts.
- Per-page metadata, canonical links, OpenGraph, Organization/Breadcrumb/Article structured data, sitemap and robots.txt.
- Self-hosted Manrope font (OFL license in assets), with no analytics scripts or external font requests.

## Edit content and design

- `people-data.mjs`: Managing Director, stakeholder and HR profiles, photo selection, exact LinkedIn URLs and clearly marked sample testimonials. Set `linkedin` to the verified full profile URL to turn the coming-soon control into a direct external profile link. Replace placeholder photos using `photo: 'filename.jpg'`, set `placeholder: false`, and update the name, role and biography together.
- `feature-components.mjs`: MD message draft, people cards, certification carousel, office map and indicative policy templates. Replace MD copy and policy templates with approved content before removing their draft labels.

- `site-data.mjs`: company details, services, industries, operating teams, articles and jobs.
- `build.mjs`: page templates, homepage sections, routing and metadata generation.
- `dist/styles.css`: responsive design system and page-specific styles (source file; keep under version control).
- `dist/app.js`: navigation, filters, forms and application-guidance interactions (source file).
- `CONTENT-SOURCES.md` and `research.json`: factual evidence, original URLs and discrepancies.
- `routes.json`: generated route inventory.

`npm run build` intentionally preserves `dist/assets`, `dist/styles.css` and `dist/app.js`; those are authored source assets, not disposable build cache. A fresh clone contains them.

## Checks

```sh
npm test
npx playwright test
```

Browser tests use an installed Chrome browser (`channel: 'chrome'`). On a machine without Chrome, install Chrome or adjust the Playwright browser configuration. Tests cover all routes at 360, 768 and 1440 pixels, interaction flows, archived-vacancy handling, enquiry validation/draft generation, representative WCAG A/AA checks and desktop/mobile screenshots. No test sends an email or submits a job application.

## Honest integration boundaries

The enquiry form prepares a mailto draft and downloadable text. It does **not** submit to a backend, send email automatically or claim receipt. A production form-delivery service, recipient routing and approved privacy terms are still needed for server-submitted enquiries.

Applications follow the original company job notices. This site does not collect resumes. No current vacancy was confirmed: undated notices are explicitly status-unconfirmed and expired roles are archived. Refresh jobs before a public corporate launch. JobPosting structured data is deliberately omitted.

Detailed case studies, approved testimonials and privacy/terms/cookie policy text were unavailable. Explicit content-population states are included; legal placeholder routes are noindex. Certification badge scope and validity require confirmation. The source Director’s Message is unattributed; the site does not invent a named Managing Director or signature.

Client names are presented in a typographic reference wall because verified logo assets were not available. No fake client logo or endorsement is used. Three insights are original editorial guides for this build, labeled accordingly, rather than fabricated company news.

## Indicative content and interactive sections

The MD page includes a clearly labeled sample message, placeholder identity and generated portrait. Leadership/stakeholder and HR cards combine the verified Garima Arora profile with explicitly indicative profiles. Missing LinkedIn URLs open an accessible coming-soon dialog; URLs are never guessed. Approved URLs can be pasted into `people-data.mjs`.

Testimonials contain visibly labeled sample quotes and bracketed attribution fields, not real client endorsements. Privacy, terms and cookie routes contain structured bracketed templates, not operative legal policies. FAQs and three blog articles remain available.

The certification strip scrolls automatically, pauses on hover/focus, offers manual previous/next and pause/resume controls, and starts paused under reduced-motion preferences. Only six unique credential badges are announced; a decorative duplicate set supports continuous scrolling.

The offline office map shows city-level Ghaziabad and Mumbai markers with addresses on hover, keyboard focus and tap. Additional locations are not fabricated. Background geography derives from Natural Earth public-domain 1:110m country geometry; precise directions use the existing office-address links. No external map script, tracking or API key is needed.

Additional ImageGen asset: `dist/assets/team-placeholder-portraits.png`, generated with the built-in ImageGen tool. Prompt: one 3-column, 2-row contact sheet of six fictional Indian enterprise professionals, with matching light gray backgrounds and head-and-shoulders business photography; top row MD, operations and finance; bottom row HR, recruitment and employee relations; navy, burgundy and neutral clothing; no text or logos. All sample portraits are labeled illustrative and do not depict GA Digital staff. Replace them with actual approved photographs later. The source sheet is rendered using CSS positioning without altering individual faces.

## Publication

The Sites project identity and static output configuration are in `.openai/hosting.json`. New publication is owner-private. Canonical origin is `company.origin` in `site-data.mjs`; update it and rebuild when migrating to the company’s final domain. The existing `gadigital.in` website has not been changed.

## Generated image

Final asset: `dist/assets/workforce-hero.webp`.

Generated with the built-in ImageGen tool and converted to WebP for delivery. It is labeled as illustrative on the homepage and is not represented as a real GA Digital team photograph. Original company assets are preserved unchanged.

Prompt: “Use case: photorealistic-natural. Asset type: corporate workforce company website hero photograph, landscape 1536x1024. Create a premium candid editorial photograph of three Indian industrial professionals, a senior male engineer in navy work shirt, an Indian woman engineer holding a tablet and another male technician, all wearing white hard hats and appropriate safety glasses, standing in a bright, clean, large modern manufacturing facility, reviewing work together. Authentic natural expressions, no posed smiling at camera. Frame waist up with generous architectural context, people on right two-thirds. Cool muted blue and steel palette, warm natural skin tones, soft daylight, refined realistic commercial photography, detailed but quiet background with structural beams. No text, logos, watermark, brand marks. This is an illustrative scene, not a real company team.”
