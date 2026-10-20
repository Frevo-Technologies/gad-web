# Homepage photo background — 21 October 2026

Branch: `arushi-development`. Local changes only; no commit, push or publication.

## Change

Replaced the full-width teal hero gradient with a locally stored office-meeting photograph and a charcoal ombre overlay, following the supplied visual reference. The image spans both hero columns. Text uses light colours for contrast; the existing foreground photograph, text, dimensions, buttons and destinations remain intact. Mobile uses a vertical dark fade for readability. All three existing theme options are supported.

The decorative background image is approximately 201 KiB at 1920 pixels wide. It is representative stock photography, not an image of GA Digital employees.

Source: [Gustavo Fring on Pexels](https://www.pexels.com/photo/people-in-a-meeting-at-a-conference-room-4872010/). [Pexels license](https://www.pexels.com/license/). Full provenance is in `hero-image-source.json`.

## Validation

- `npm run build`: passed, 58 routes plus 404, sitemap and robots.
- `npm test`: passed, internal links, image references, metadata and schema.
- Six relevant browser checks passed across the focused and regression runs. The hero-specific check covers 1440px/390px widths, all three themes, background-image loading, unchanged foreground image/links, page overflow and accessibility.
- JavaScript test syntax and `git diff --check`: passed.
- No lint/type-check scripts are configured.

## Exact files added or modified

- `dist/feedback.css`
- `dist/assets/hero-office-background.jpg`
- `hero-image-source.json`
- `tests/browser/october-updates.spec.mjs`
- `tests/browser/hero-background.spec.mjs`
- `HERO-BACKGROUND-REPORT.md`

## Local previews

- `artifacts/hero-photograph-1440.png`
- `artifacts/hero-photograph-390.png`

No content or approval is pending for this hero change.
