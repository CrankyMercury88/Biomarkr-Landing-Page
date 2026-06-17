# Biomarkr Design System

> *Monitor, detect, prevent.*

Biomarkr is a deep-tech company building **silicon photonic biosensors** that make
blood testing roughly **25× faster and cheaper**. A laboratory-grade immunoassay is
miniaturized onto a chip the size of a fingernail — "ELISA on a chip" — measuring a
multiplex **cytokine** panel from a finger-prick of blood in under ten minutes. The
long-term vision is direct-to-consumer blood tests people take **daily**, building a
personal immune baseline that catches disease before symptoms appear.

The brand is deliberately **"unbranded"**: a near-monochrome system of black, white
and a precise grey ramp, anchored by a single lowercase serif wordmark. The feeling
is clinical-but-human, quiet, and exact — the visual equivalent of a clean signal.

---

## Sources

This system was built from materials the user supplied. Anyone extending it should
explore these directly for higher fidelity:

- **Landing-page codebase** — `github.com/CrankyMercury88/Biomarkr-Landing-Page`
  (the live marketing site: HTML/CSS/JS, real imagery, the device render and the
  pointing-hand hero). The canonical source for color, type, motion and layout.
- **Pitch deck** — `uploads/Biomarkr Deck June 2026.pdf` (15 slides; product thesis,
  technology, the five-cytokine panel, market, team, milestones). Source for the
  slide specimens and most product copy.
- **Logos** — `uploads/Black Logo.png`, `uploads/White Logo.png` (wordmark) and the
  repo's `logo_mark_black.png` (the fingerprint-heart mark).

Note: the repo's own `README.md` is a leftover template from earlier "Evergreen
Health" testing and is **not** authoritative — treat the rendered site + this guide
as truth.

---

## Content Fundamentals

**Voice.** Declarative, precise, unhurried. Short sentences that state facts and let
them land. The brand earns trust through specificity, not adjectives — *"results in
under 10 minutes," "up to 32 biomarkers per test," "97.5% accuracy vs. Luminex."*
Numbers do the persuading.

**Casing.** Sentence case for headlines and body. **ALL-CAPS only** for the small
tracked eyebrows above titles (`OUR`, `TECHNOLOGY`). Never all-caps a full sentence.

**Person.** Mostly third-person and declarative about the company and science
("Biomarkr measures…", "Central labs are…"). Shifts to **you / your** when describing
the personal benefit — *"measured against your unique baseline."* Aspirational "we"
appears in mission and thesis statements ("we believe inflammation holds the key").

**Tone signatures.**
- Big claims, soberly stated: *"Biomarkr is what proactive healthcare actually looks like."*
- Contrast framing: *"From reactive to proactive."* / *"Central labs are a legacy system."*
- Plain-language science: explains cytokines without dumbing down ("a single cytokine
  value is meaningless… it depends on your baseline, age, stress, time of day").

**Mechanics.** Use the ampersand sparingly in tight labels (*"Monitor & detect"*),
spelled "and" in prose. Marker symbols are exact: `IL-6`, `IL-1β`, `IFN-γ`, `TNF-α`.
Tagline punctuation matters: *"Monitor, detect, prevent."* — three words, commas, period.

**No emoji. Ever.** No exclamation points. No hype words ("revolutionary,"
"game-changing"). The restraint *is* the brand.

---

## Visual Foundations

**Color.** Near-monochrome. True black `#000` and near-black `#0a0a0a` (inverse
surfaces) on white `#fff`, mediated by a neutral grey ramp (`#fafafa → #121212`).
Secondary text is `#666`, tertiary/muted is `#999`. The system carries **four muted
functional signals** (positive `#2f7d52`, caution `#9a6a00`, critical `#a23b32`,
info `#36506b`) used *only* to encode biomarker status or UI state — never as brand
color. If you reach for a hue to decorate, stop.

**Typography.** Two families. **Inter** does all functional work — UI, body, data,
labels. **Newsreader** is a quiet literary serif reserved for occasional large
editorial statements. Two signatures define the type:
1. **Light display** — headings set in Inter **300** at large sizes with tight
   tracking (`-0.02em`). Never bold headlines.
2. **Tracked eyebrows** — 11–12px, weight 600, uppercase, `+0.15–0.2em` letter-spacing,
   tertiary grey, sitting above titles beneath a 60px accent rule.
Body runs at 15px with generous **1.8** line-height. Numerals are tabular.

**The wordmark** is the one expressive gesture — a lowercase, old-style serif
"biomarkr". It always ships as **artwork** (never re-typeset) and inverts cleanly for
dark surfaces.

**Layout.** Airy. Content insets at ~8–10% page gutters with an 880–900px reading
column. Sections are separated by **hairline rules**, opened by the eyebrow + rule +
light-title lockup. Whitespace is the primary compositional tool.

**Backgrounds.** Predominantly flat white or flat near-black. Two atmospheric moves:
(1) the **mist** — a fade-to-paper gradient that dissolves photography into the page
from the bottom; (2) a soft **radial vignette** behind the hero device. No busy
patterns, no textures, no decorative gradients, no glassmorphism beyond the single
blurred floating nav pill.

**Imagery.** Cool, clean, high-key. The pointing hand and the Q-SENS device render
are shot/rendered on near-white with soft shadows. Photography is desaturated and
calm; team portraits are simple circular crops. Imagery always meets the page through
the mist, rarely with a hard edge.

**Corners & borders.** Modest radii: 2–4px on small controls, 8px on fields, 16px on
cards. The one flourish is the **pill** (`999px`) used for the floating nav and
primary buttons. Separation is achieved with **1px hairline borders** (`12%` ink)
far more often than shadow.

**Elevation.** Shadows whisper. Most surfaces are flat with a hairline; cards lift
only on hover. The largest shadow (`0 20px 60px / 10%`) is reserved for hero imagery
floating over the page — never for UI chrome.

**Motion.** Restrained and smooth. Entrances are **fade + 10–30px rise** on an
ease-out curve (`cubic-bezier(0.16,1,0.3,1)`), staggered down a section. The accent
rule **grows from 0 → 60px** on reveal. Hover states are quick (`0.2s`): the primary
button **dims to ~82% opacity**, secondary/ghost gain a faint raised tint, the
border darkens on focus. No bounces, no springs, no parallax tricks beyond the hero
hand rising and the mission text rotating. Respect `prefers-reduced-motion`.

**Hover / press / focus.**
- Hover: primary dims; ghost/secondary tint to `--surface-raised`; links go to full ink.
- Focus: border darkens to `--border-strong` (no colored ring); error border switches
  to the critical signal.
- Selected (tags/toggles): inverts to near-black with paper text/knob.

**Dark mode.** First-class. The whole system inverts cleanly via `[data-theme="dark"]`
— ink becomes paper and vice-versa; the mist re-tints to near-black.

---

## Iconography

Biomarkr has **no proprietary icon font**. The live site draws icons as **inline SVG,
2px stroke, 24px, round caps/joins, no fill** — a thin, geometric, monochrome line
style (sun/moon theme toggle, the brand's own arrow/chevron, a filled brand-blue
LinkedIn glyph being the one exception, used at its official color).

**For new work, use [Lucide](https://lucide.dev) from CDN** — its 2px-stroke,
24×24, rounded geometry matches the site's hand-drawn SVGs almost exactly. Set
`stroke="currentColor"` so icons inherit text color and invert with the theme. This
is a *substitution for convenience*, not an in-repo asset — flagged here so it can be
swapped for bespoke marks later.

```html
<script src="https://unpkg.com/lucide@latest"></script>
```

Sizes: 16px inline with text, 18–20px in buttons, 24px standalone. **No emoji. No
unicode pictographs as icons.** Status is shown with a small solid **dot** in a
functional signal color, not an icon.

**Brand marks** (in `assets/`):
- `logo-wordmark-black.png` / `logo-wordmark-white.png` — the primary lockup. Always place as artwork; never re-typeset.
- `device-reader.png` — the Q-SENS reader render. `website-hand.png` — hero hand.

---

## What's in here — index

**Foundations (`tokens/`)**
- `fonts.css` — `@font-face` + Google Fonts load (Inter, Newsreader).
- `colors.css` — ink/paper, grey ramp, functional signals, light + dark semantics.
- `typography.css` — families, weights, scale, tracking, composite roles.
- `spacing.css` — spacing, radii, borders, shadows, motion, z-index.
- `base.css` — `.bm-scope` baseline + signature helpers (`.bm-eyebrow`, `.bm-mist`…).
- `styles.css` (root) — the single entry point; `@import`s the above.

**Specimen cards (`guidelines/`)** — small HTML cards rendered in the Design System
tab: Brand (wordmark, mark, mist), Colors (core, ramp, signals, surfaces), Type
(display, eyebrow+title, body+serif, scale), Spacing (scale, radii, elevation).

**Components (`components/`)** — React primitives, monochrome by default:
- `buttons/` — **Button**, **IconButton**
- `forms/` — **Input**, **Select**, **Switch**, **Checkbox**
- `feedback/` — **Badge**, **Tag**
- `data/` — **BiomarkerReadout** (the signature cytokine card), **Avatar**
- `layout/` — **Card**, **SectionHeader**

**UI kits (`ui_kits/`)**
- `website/` — faithful recreation of the live marketing site (header, hero with the
  rising hand + rotating mission, thesis/hardware/software sections, team, device
  showcase, footer; working light/dark toggle).

**Slides (`slides/`)** — six deck specimens at 1280×720 matching the June 2026 deck:
title, statement, feature grid, marker panel, metrics, team.

**`SKILL.md`** — makes this folder usable as a downloadable Claude Agent Skill.

---

## Using the system

Consuming projects link one file — `styles.css` — and read components from the global
namespace `window.BiomarkrDesignSystem_734cca` after loading `_ds_bundle.js`
(auto-generated). Scope brand styling by wrapping content in `.bm-scope`. Honor the
restraint: monochrome surfaces, light headings, tracked eyebrows, hairline borders,
and color used only to mean something.
