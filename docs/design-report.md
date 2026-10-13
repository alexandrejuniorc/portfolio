# Design report

Measured on 2026-10-13 against the static build served locally.

## Direction

One motif (taste-skill, seed 7302), with the palette and the typefaces kept. The hero and the
section compositions the sheet dealt were redrawn: the site owner chose the composition himself
from mockups (option G), and that choice and section 6 of the spec take precedence.

## Idea

On this page, the step arrow of an integration flow becomes the only shape of the site. It
appears at four scales: three arrows across the first screen, the flow diagram of each case, the
primary button and the bullet of a list.

## The live thing

Shared working hours in the contact section: one sentence and two rows of half-hour slots,
computed in the browser from the visitor's time zone.

## Waived rules

- `few-pictures`: the site shows no client interfaces and carries no photographs in its first
  version. No other inspector rule was waived.

## Inspector

`inspect.mjs` at 1440, 768 and 390 pixels:

| Variation | FAIL | WARN |
| --- | --- | --- |
| English, dark | 0 | 2 |
| English, light | 0 | 2 |
| Portuguese, dark | 0 | 2 |
| Spanish, dark | 0 | 2 |

The hero headline holds two lines at every width in the three languages (100px, 55px and 28px).
Five type sizes are in use: 14, 18, 24, 56 and 100px.

The two warnings are the same everywhere and were kept:

- `no-footage`: there is no honest video of this work to show, for the same reason there are no
  screenshots.
- `card-rows` at 390px: the rows are the stacked steps of a flow diagram, pointing down into each
  other, not a grid of cards.

`lint.mjs` on `src`: 0 FAIL. Its one warning is a phrase inside a test name, not shipped copy.

## Critique

Two rounds on the screenshots.

- Round 1, main problem: the case diagrams were thin bands with small labels and did not carry
  their sections. Fixed: labels at the lead size, steps 6.5rem tall on a phone and 8.5rem on a
  desktop.
- Round 2 score: design 6.5, usability 8, creativity 7, content 8, overall 7.2.

What still falls short:

- Design is capped at 6.5 because the page has no real pictures.
- Creativity is capped at 7 because the idea would also fit another engineer who integrates SAP
  systems. The cases, the clients and the shared hours are what make the page his.

## Web Interface Guidelines

Fixed after the review:

- Transitions animate only `transform` and `opacity`; a test now enforces it.
- `<meta name="theme-color">` follows the theme instead of staying dark in the light theme.
- Product, client and personal names and the email address carry `translate="no"`.
- Headings use balanced wrapping and paragraphs use pretty wrapping.
- Links, buttons and the menu summary set `touch-action: manipulation`; the tap highlight uses
  the accent colour.
- The credential dates use tabular numerals.
- Each language link keeps its visible code inside its accessible name ("PT Português"), which
  Lighthouse had flagged as a label mismatch.

Not applied, with the reason:

- Title Case for headings and buttons: the design system sets sentence case.
- Second person instead of first: a personal site speaks in the first person.
- Language detection from the browser: the spec makes the URL the only source of the language.
- Safe-area insets: the page does not opt into `viewport-fit=cover`, so the browser already keeps
  content clear of notches.
- Non-breaking spaces inside brand names: not applied; the headline lines are fixed by markup.
- Rules about forms, images, media and long lists: the site has none of these.

## Lighthouse

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| `/` | 98 | 100 | 100 | 100 |
| `/pt` | 98 | 100 | 100 | 100 |
| `/es` | 98 | 100 | 100 | 100 |

First contentful paint 1.7s, largest contentful paint 2.1s, total blocking time 0ms, layout shift
0, under Lighthouse's simulated slow network.

These figures come from a local server that compresses responses, as the production host does.
The plain development server used for the other checks does not compress and scores 82 on
performance for that reason alone.

## Without JavaScript, and with reduced motion

- The prerendered HTML already carries every text, the six flow diagrams, the language links,
  the phone menu and a fixed sentence in the contact section. The styles hide nothing until the
  script has started. This was checked on the built HTML; a screenshot with scripts disabled
  could not be taken with the tools at hand.
- With reduced motion forced in headless Chrome, everything is visible and nothing moves.

## Content to confirm

- Years for the clients other than RHI Magnesita (2024), Whirlpool (2025) and Braskem (2026).
- The Spanish text, by a fluent reader.
- The site domain.
