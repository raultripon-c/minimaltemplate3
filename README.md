# Career Platform Template

Standalone, dependency-free career website template focused on employer brand storytelling, fast job discovery, candidate confidence, and modular reuse.

## Run Locally

From this folder:

```bash
python3 -m http.server 8081
```

Open `http://localhost:8081/index.html`.

## Structure

- `components/`: reusable header, footer, cards, buttons, badges, job cards, accordions, and section primitives.
- `widgets/`: independently renderable homepage widgets. The homepage only assembles these widgets.
- `pages/`: page entry points and page module renderers.
- `data/`: reusable content for jobs, pathways, EVP pillars, benefits, stories, events, and locations.
- `styles/`: semantic tokens, base styles, component styles, and responsive rules.
- `scripts/`: app bootstrap plus interactions for nav drawers, tabs, filters, save/share state, accordions, saved jobs, and form success states.

## Token Guidance

The styling follows the provided consolidation tokens as first-class CSS variables:

- Brand: `--brand-color-primary`, `--brand-color-secondary`, `--widget-bg-gradient-color`
- Text: `--text-dark`, `--secondary-text`, `--light-text`, `--link-color`
- Surfaces: `--body-bg`, `--widget-bg-white-color`, `--widget-bg-gray-color`, `--widget-bg-dark-color`
- Borders and inputs: `--stroke-primary`, `--stroke-neutral`, `--input-stroke`, `--input-stroke-focus`
- Normalized utilities: `.phw-g-btn-primary`, `.phw-g-btn-secondary`, `.phw-g-h1-primary`, `.phw-g-h2-dark`

## Pages Included

- Homepage
- Search results
- Job description
- Working here / life
- Benefits
- Early careers
- Events
- Talent community
- Locations
- Career areas
- Saved jobs
- Accessibility and help
- Widget preview

## QA Checklist

Validate the following breakpoints: `1920`, `1440`, `1280`, `1024`, `768`, `430`, `390`, and `320`.

Check keyboard navigation through the header drawer, filters, tabs, accordions, save/share controls, forms, and sticky CTA. Confirm no horizontal scroll, clipped CTAs, or hidden primary search controls.
