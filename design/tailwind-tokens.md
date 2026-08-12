# Tailwind Design Tokens

All brand tokens are defined in `website/src/app/globals.css` via `@theme inline` and available as Tailwind utility classes.

## Colors

### Primary

| Token | Hex | Text class | Background class | Border class |
|---|---|---|---|---|
| `--color-holiday-red` | `#D00A0B` | `text-holiday-red` | `bg-holiday-red` | `border-holiday-red` |
| `--color-holiday-white` | `#FCFCFC` | `text-holiday-white` | `bg-holiday-white` | `border-holiday-white` |
| `--color-holiday-grey` | `#B6B6B6` | `text-holiday-grey` | `bg-holiday-grey` | `border-holiday-grey` |

### Secondary (accents only)

| Token | Hex | Text class | Background class |
|---|---|---|---|
| `--color-teal` | `#3F786B` | `text-teal` | `bg-teal` |
| `--color-evergreen` | `#0A332D` | `text-evergreen` | `bg-evergreen` |
| `--color-opal` | `#9DBDB8` | `text-opal` | `bg-opal` |
| `--color-sand` | `#D6B588` | `text-sand` | `bg-sand` |
| `--color-onyx` | `#2C2B29` | `text-onyx` | `bg-onyx` |

## Fonts

| Token | Class | Stack |
|---|---|---|
| `--font-alt-gothic` | `font-alt-gothic` | ATF Alternate Gothic (Adobe Fonts), Oswald fallback, Arial, sans-serif |
| `--font-sans` | `font-sans` | PT Sans, Arial, sans-serif (body default) |

> **Note:** ATF Alternate Gothic Medium is the official brand face for all headlines/CTAs and must be wrapped in `uppercase`. Oswald (weights 500/600/700) serves as the Google Fonts fallback until the Adobe Fonts kit fully covers the heavier cuts. **Body face is PT Sans** (weights 400/700) — chosen to match the Figma homepage mockup. The brand PDF does not specify a body face; PT Sans supersedes the earlier Open Sans choice.
>
> **Heading weights:** display headings (hero, section, card titles, river names, specialty subtitle) use Alternate Gothic **900 (`font-black`)**, prices/footer links **600 (`font-semibold`)**, and nav/tags/buttons/newsletter headline **500 (`font-medium`)**. Match per element rather than defaulting everything to medium. (The Figma API *reports* 800 for the headings, but desktop→web-kit weight numbering doesn't line up 1:1 — the kit's **900** is what visually matches the mock. The kit publishes all weights 100–900.)
>
> **`font-black` is safe on the brand face, synthesized on the fallback.** Re-verified 2026-08-11 against `use.typekit.net/guz5fen.css`: `alternate-gothic-atf` serves nine real `@font-face` cuts, 100–900, so all 41 `font-black` call sites render a genuine 900 — confirmed live, a section `<h2>` computes `font-weight: 900` with `alternate-gothic-atf` resolved. The Google Fonts **Oswald fallback tops out at 700 and cannot cover it** (Oswald's published range is 200–700), so during font-swap — or if the Typekit kit is blocked — the browser synthesizes a faux-bold. Known and accepted; it is a transient degraded-path artifact, not a reason to change the call sites. It does mean the fallback renders *wider* than the brand face, which is the sizing constraint behind `Button`'s `sm` size (see below).
>
> **Body font application:** the `@theme inline` block inlines tokens into utilities and does **not** emit them as `:root` custom properties — so a raw `body { font-family: var(--font-sans) }` rule resolves to *empty* and body text silently falls back to `ui-sans-serif`. `globals.css` therefore sets the body font via `var(--font-pt-sans)` directly (that next/font variable is defined on `<body>`). Inside components, use the `font-sans` / `font-alt-gothic` utility classes — those carry the inlined value and work correctly.

## Typography Scale

| Token | Size | Line height | Class | Line height class |
|---|---|---|---|---|
| `--text-h1` | 64px | 0.92 | `text-h1` | `leading-h1` |
| `--text-h2` | 44px | 0.95 | `text-h2` | `leading-h2` |
| `--text-section` | 36px | 0.9 | `text-section` | `leading-section` |
| `--text-h3` | 28px | 1 | `text-h3` | `leading-h3` |
| `--text-subheading` | 22px | 30px | `text-subheading` | `leading-subheading` |
| `--text-paragraph` | 18px | 24px | `text-paragraph` | `leading-paragraph` |
| `--text-body` | 16px | 22.4px | `text-body` | `leading-body` |
| `--text-link` | 12px | 1.5 | `text-link` | `leading-link` |

**Each `text-*` class already carries its own line height** — Tailwind compiles
the `--text-*--line-height` pair into the font-size utility as
`line-height: var(--tw-leading, <value>)`. So `text-body` on its own is enough;
`text-body leading-body` is redundant but harmless.

**Reach for a `leading-*` class only to break that pairing** — a heading that
wants body leading, say `text-h1 leading-body`. It works because the `leading-*`
utility sets `--tw-leading`, which the font-size utility defers to.

> **Fixed 2026-08-11 — these classes used to be inert.** Tailwind resolves
> `leading-*` from a `--leading-*` namespace, and the theme had only ever
> defined the `--text-*--line-height` pairs. All seven compiled to **nothing**,
> and ~78 uses across `src/` silently did zero work. It went unnoticed because
> every one sat beside its matching `text-*` sibling, which applied the same
> value anyway — the site rendered correctly for the wrong reason, and any
> attempt to *override* a line height would have been ignored. `globals.css`
> now defines the `--leading-*` tokens, so the column above is real.
>
> Those values **must mirror the `--text-*--line-height` pairs by hand.** They
> cannot reference them via `var()` — `@theme inline` inlines values instead of
> emitting `:root` custom properties, so a `var()` there resolves to empty (the
> same trap as `--font-sans`, noted above). Change one, change both.

`--text-section` (added 2026-08-11) is the site's most-used section heading and
replaced 14 hand-written `text-[36px] leading-[0.9]` pairs. It sits between h2
and h3 because 44px overpowers a mid-page band.

Two places deliberately keep arbitrary values rather than this token:

- **`Logo.tsx`** — `text-[36px] md:text-[44px]`. Bare font-size utilities emit
  *no* line height; the lockup sets its own leading per variant to match the
  mark. Switching to `text-section` would impose 0.9 on it.
- **`blog/page.tsx`** — keeps an explicit `leading-[0.9]` next to
  `text-section … md:text-h2`, because that sets `--tw-leading`, which
  `md:text-h2` then defers to. Removing it would let h2's 0.95 take over at `md`.

## Letter Spacing

| Token | Value | Class |
|---|---|---|
| `--tracking-tight` | -0.5px | `tracking-tight` |

## Typography Recipes

### Headline — Hero (Alternate Gothic, all caps)

```
font-alt-gothic uppercase text-h1 font-black text-holiday-red
```

### Section heading — on light

```
font-alt-gothic uppercase text-section font-black text-holiday-red
```

### Section heading — on imagery

```
font-alt-gothic uppercase text-section font-black text-holiday-white
```

### Body

```
text-body text-onyx
```

### Small uppercase label / tag

```
text-link font-semibold uppercase tracking-widest
```

## Buttons

`Button.tsx` is the single definition of button typography and shape — never
hand-roll the class string. It exports two things:

- **`<Button>`** — use this by default. Renders a `next/link` when given `href`,
  otherwise a `<button>`.
- **`buttonClasses({ variant, size, display, className })`** — for the elements
  `<Button>` can't render: an `ExternalLink`, a `tel:` anchor, a `<summary>`, a
  `disabled` submit. Same string, same source of truth.

| Size | Metrics | Use |
|---|---|---|
| `sm` | `px-6 py-2.5` · 17px | Narrow containers (MiniCart's 288px panel) |
| `default` | `px-6 py-2` · 19px | Everything ordinary |
| `compact` | `px-4 py-1.5` · 16px → `default` at `md` | Mobile header CTA |
| `lg` | `px-8 py-2.5` · 20px | Hero / standalone CTA |
| `xl` | `px-10 py-4` · 24px | The `/book` page phone CTA |

Variants: `primary` (red fill), `outline` (red border), `onyx`.

**Pass `display`, don't append one.** Tailwind resolves same-specificity
conflicts by stylesheet order, not class-attribute order, so a `display`
utility added through `className` would fight the built-in `inline-block`
unpredictably. Pass `display: 'inline-flex'` for a `<summary>`, `'block'` for a
full-width CTA, or `''` when the host element brings its own (`ExternalLink`
already applies `inline-flex`).

**Why `sm` exists.** "Continue to Secure Checkout" has 240px of room inside the
MiniCart panel. Measured: 215px at `default` on the brand face — but **256px on
the Oswald fallback, which overflows**. `sm` leaves 11px of headroom on the
fallback. Any button in a fixed narrow container needs checking against Oswald,
not just the brand face.

All sizes carry tracking (`0.025em`, `lg` gets `0.05em`) — uppercase condensed
gothic needs it to stay legible at button sizes.

## Removed in 2026 brand refresh

These tokens existed in the interim design and have been removed. Remap to the new tokens listed below.

| Removed token | Replacement |
|---|---|
| `--color-brand-red` (`#A30D11`) | `--color-holiday-red` (`#D00A0B`) |
| `--color-blue` (`#1863DC`) | `--color-onyx` (case-by-case) |
| `--color-taupe` (`#4E4D48`) | `--color-onyx` |
| `--color-charcoal` (`#212121`) | `--color-onyx` |
| `--color-off-white` (`#F4F4F4`) | `--color-holiday-white` |
| `--color-light-gray` (`#A6ADB4`) | `--color-holiday-grey` |
| `--color-canyon` (`#1A1612`) | `--color-evergreen` or `--color-onyx` |
| `--color-river` (`#2D7A7F`) | `--color-evergreen` |
| old `--color-sand` (`#E8E0D4`) | `--color-sand` (`#D6B588`) — note the warmer new hue |
| `--font-stardos` (Stardos Stencil) | `--font-alt-gothic` (ATF Alternate Gothic Medium) |

## Related

- [[brand-guidelines]] — Source color palette and typography specs
