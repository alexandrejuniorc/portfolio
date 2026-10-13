---
version: alpha
name: Alexandre Junior portfolio
description: A black ground with SAP blue, built on one shape. The step arrow of an integration flow is the only decorative form on the site and appears at four scales, from the three arrows that fill the lower first screen to the bullet beside a list. Type is Red Hat Display for headings and Red Hat Text for reading. Dark is the identity and the default; light is the same system with the grounds inverted.

colors:
  bg: "#07090d"
  surface: "#121820"
  ink: "#eef1f4"
  muted: "#a3afbb"
  accent: "#0070f2"
  accent-ink: "#ffffff"
  accent-text: "#5ab3ff"
  arrow-1: "#00205e"
  arrow-1-ink: "#dbeaff"
  arrow-2: "#0057d2"
  arrow-2-ink: "#ffffff"
  arrow-3: "#1b90ff"
  arrow-3-ink: "#00122e"
  light-bg: "#f6f7f9"
  light-surface: "#ffffff"
  light-ink: "#0b1220"
  light-muted: "#51647a"
  light-accent-text: "#0064d9"
  light-arrow-1: "#00144a"
  light-arrow-2: "#0070f2"
  light-arrow-3: "#89d1ff"
  light-arrow-3-ink: "#00144a"

typography:
  display:
    fontFamily: "Red Hat Display Variable, system-ui, sans-serif"
    fontSize: clamp(1.75rem, 7.2vw, 6.25rem)
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.04em
  heading:
    fontFamily: "Red Hat Display Variable, system-ui, sans-serif"
    fontSize: clamp(1.875rem, 4.2vw, 3.5rem)
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.035em
  lead:
    fontFamily: "Red Hat Text Variable, system-ui, sans-serif"
    fontSize: clamp(1.1875rem, 1rem + 0.6vw, 1.5rem)
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Red Hat Text Variable, system-ui, sans-serif"
    fontSize: clamp(1rem, 0.96rem + 0.2vw, 1.125rem)
    fontWeight: 400
    lineHeight: 1.5
  small:
    fontFamily: "Red Hat Text Variable, system-ui, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.4

rounded:
  none: 0px

spacing:
  page-margin: clamp(1.25rem, 2.2vw, 2rem)
  section: clamp(5rem, 11vw, 11rem)
  container: 90rem

components:
  arrow-button:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    height: 52px
    shape: rectangle with a 20px point on the right
  flow-step:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    shape: rectangle with a point on the leading edge and a notch on the trailing edge
  flow-step-final:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
  nav-link:
    textColor: "{colors.ink}"
    height: 44px
---

## Overview

The site belongs to a software engineer whose work is connecting SAP systems to everything around them. The design takes the one drawing that work always produces, the step arrow of an integration flow, and uses nothing else. There are no cards, no icons, no gradients, no shadows and no photographs of interfaces.

Two things carry the page: very large type and whole fields of flat blue.

## Colors

### Grounds

- `bg` is the page. `surface` is one step away from it and is the only way two areas are told apart. There are no rules and no outlined boxes.
- The contact section changes the whole field to `arrow-1`, the deepest blue.

### Text

- `ink` for everything a visitor reads. `muted` only for secondary notes such as a client and year.
- `accent-text` for links.

### Accent

- `accent` is SAP's brand blue, `#0070f2`. It appears on the primary action and on the final step of each flow, and nowhere else at rest.
- `arrow-1`, `arrow-2` and `arrow-3` are the three hero arrows, deepest to brightest. They are fields, not accents.

Every text and ground pair meets WCAG AA. `src/styles/tokens.test.ts` checks this on each run.

### Light theme

Light keeps every role and inverts the grounds. The `light-*` values above replace their dark counterparts when `data-theme="light"` is set on `<html>`.

## Typography

### Font Family

Red Hat Display for headings and figures, Red Hat Text for reading. Both are variable fonts served from the site itself.

### Hierarchy

Five sizes and no more: display, heading, lead, body, small. Two do the visible work, display and body; the gap between them is the design.

### Principles

- A heading is never more than two lines, at any width. Cut words before shrinking type.
- Left aligned throughout.
- No monospace, no uppercase labels with letter spacing, no small label above a heading, no word in a heading styled differently from the rest.

## Layout

### Grid & Container

One container of 90rem with one page margin. Text blocks share that left edge on the whole page.

### Whitespace Philosophy

The gap between sections is clearly larger than any gap inside one. Neighbouring sections never share a composition.

## Elevation & Depth

None. Nothing has a shadow. Depth comes from a step in tone.

## Shapes

### Border Radius Scale

Square corners everywhere.

### The arrow

The only decorative shape. It is always the same geometry, a rectangle with a point on its leading edge and a matching notch on its trailing edge, so consecutive steps lock together.

It appears at four scales:

1. Three arrows filling the lower third of the first screen, running off the right edge.
2. The flow diagram of each case study.
3. The primary button.
4. The bullet of a list.

Below 1024px the arrows stack and point down.

### Photography & Illustrations

No screens, captures or recreations of client systems, ever. At most two real photographs of São Paulo, credited in the footer and cut to the arrow shape.

## Components

### Top Navigation

The name, four section links, three language links and the theme switch. No bar, no background. Below 1024px the section links, languages and theme move into a `details` menu.

### Buttons

One button shape, the arrow, in `accent`. Secondary actions are underlined links.

### Flow

An ordered list. Steps are `surface`; the last step is `accent`. Each step has a label and, below it, the technology in the small size.

### Tables

Real tables without lines. Every other row sits on `surface`.

## Do's and Don'ts

### Do

- Fill space with scale, full content or a field of flat colour.
- Keep running text in `ink` at 16px or more.
- Reuse the arrow before reaching for any other shape.

### Don't

- Add a gradient, a shadow, a blur, a rounded card, an icon, an emoji or a hairline.
- Number things 01, 02, 03.
- Name a consultancy or show a client interface.

## Responsive Behavior

### Breakpoints

Two. Below 1024px flows stack vertically and the navigation collapses into a menu. Below 768px tables become blocks.

### Touch Targets

44px or more for every link and button.

## Iteration Guide

1. Change colour only in the two token blocks at the top of `src/styles/app.css`.
2. Add a size only by replacing one of the five.
3. After any visual change run the taste-skill inspector at 1440, 768 and 390 pixels, in both themes and in the three languages.

## Known Gaps

- No portrait of Alexandre in the first version.
- The Spanish text has not been reviewed by a fluent speaker.
