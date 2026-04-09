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
| `--font-sans` | `font-sans` | Open Sans, Arial, sans-serif (body default) |

> **Note:** ATF Alternate Gothic Medium is the official brand face for all headlines/CTAs and must be wrapped in `uppercase`. Until the Adobe Fonts kit is wired in `layout.tsx`, Oswald serves as a close Google Fonts fallback.

## Typography Scale

| Token | Size | Line height | Class | Line height class |
|---|---|---|---|---|
| `--text-h1` | 64px | 0.92 | `text-h1` | `leading-h1` |
| `--text-h2` | 44px | 0.95 | `text-h2` | `leading-h2` |
| `--text-h3` | 28px | 1 | `text-h3` | `leading-h3` |
| `--text-subheading` | 22px | 30px | `text-subheading` | `leading-subheading` |
| `--text-paragraph` | 18px | 24px | `text-paragraph` | `leading-paragraph` |
| `--text-body` | 16px | 22.4px | `text-body` | `leading-body` |
| `--text-link` | 12px | 1.5 | `text-link` | `leading-link` |

## Letter Spacing

| Token | Value | Class |
|---|---|---|
| `--tracking-tight` | -0.5px | `tracking-tight` |

## Typography Recipes

### Headline — Hero / Section (Alternate Gothic, all caps)

```
font-alt-gothic uppercase text-h1 font-medium leading-h1 text-holiday-red
```

### Section heading — on light

```
font-alt-gothic uppercase text-h2 font-medium leading-h2 text-holiday-red
```

### Section heading — on imagery

```
font-alt-gothic uppercase text-h2 font-medium leading-h2 text-holiday-white
```

### Body

```
text-body leading-body text-onyx
```

### Small uppercase label / tag

```
text-link font-semibold uppercase tracking-widest
```

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
