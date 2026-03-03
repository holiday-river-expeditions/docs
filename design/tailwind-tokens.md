# Tailwind Design Tokens

All brand tokens are defined in `website/src/app/globals.css` via `@theme inline` and available as Tailwind utility classes.

## Colors

| Token | Hex | Text class | Background class |
|-------|-----|-----------|-----------------|
| `--color-brand-red` | #A30D11 | `text-brand-red` | `bg-brand-red` |
| `--color-taupe` | #4E4D48 | `text-taupe` | `bg-taupe` |
| `--color-charcoal` | #212121 | `text-charcoal` | `bg-charcoal` |
| `--color-off-white` | #F4F4F4 | `text-off-white` | `bg-off-white` |
| `--color-light-gray` | #A6ADB4 | `text-light-gray` | `bg-light-gray` |
| `--color-blue` | #1863DC | `text-blue` | `bg-blue` |
| `--color-teal` | #5C9CA1 | `text-teal` | `bg-teal` |

## Fonts

| Token | Class | Stack |
|-------|-------|-------|
| `--font-stardos` | `font-stardos` | Stardos Stencil, Open Sans, Arial, sans-serif |
| `--font-sans` | `font-sans` | Open Sans, Arial, sans-serif (body default) |

## Typography Scale

| Token | Size | Line height | Class | Line height class |
|-------|------|-------------|-------|-------------------|
| `--text-h1` | 50px | 46px | `text-h1` | `leading-h1` |
| `--text-h3` | 26px | 28px | `text-h3` | `leading-h3` |
| `--text-paragraph` | 18px | 24px | `text-paragraph` | `leading-paragraph` |
| `--text-body` | 16px | 22.4px | `text-body` | `leading-body` |
| `--text-link` | 12px | 1.5 | `text-link` | `leading-link` |

## Letter Spacing

| Token | Value | Class |
|-------|-------|-------|
| `--tracking-tight` | -1.5px | `tracking-tight` |

## Typography Recipes

### H1 / H2 — Primary headings
```
font-stardos text-h1 font-bold leading-h1 tracking-tight text-brand-red
```

### H3 — Section subheading (on dark)
```
text-h3 font-extrabold leading-h3 text-white
```

### H3 — Section subheading (on light)
```
text-h3 font-extrabold leading-h3 text-charcoal
```

### Paragraph — Emphasized body text
```
text-paragraph font-bold leading-paragraph text-taupe
```

### Body — Default body text
```
text-body leading-body text-taupe
```

### Link — Small uppercase labels
```
text-link font-semibold uppercase text-taupe
```

## Related

- [[brand-guidelines]] — Source color palette and typography specs
