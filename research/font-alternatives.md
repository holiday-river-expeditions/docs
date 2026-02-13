# Font Alternatives: Stencil Display Font

## Problem

The current website uses **Stardos Stencil** (Google Fonts, by Vernon Adams) for H1/H2 headings to evoke the stenciled lettering painted on Holiday's rafts. It doesn't quite match — Stardos Stencil has thinner, more refined lines with a classical, elegant appearance. The actual raft stencils are bolder, heavier, and more utilitarian.

### Current Setup (from bikeraft.com)
- **Display:** Stardos Stencil, 700 weight, 50–60px
- **Body:** Open Sans, 400/700/800
- **Fallback:** Arial, sans-serif
- **Heading color:** `#A30D11` (Brand Red)

### Key Observations
- The official logo wordmark (see `design/assets/HRE_LOGO_WHITE.svg`) is a **clean geometric sans-serif** — not a stencil font
- The stencil treatment is specific to the physical raft lettering and the website headings
- Stardos Stencil was designed as a display-only webfont — it "falls apart at small sizes" (Typewolf) and only comes in 2 weights (400, 700)

---

## Alternatives

### Tier 1: Free (Google Fonts)

Easy to implement via `next/font/google`. No licensing cost.

**Saira Stencil One**
- Style: Bold, heavy sans-serif stencil
- Strengths: Thick, sturdy construction conveys durability. Sharp, precise stencil cuts. Strong brand presence at large sizes. Designed by Héctor Gatti / Omnibus-Type.
- Weaknesses: Only 1 weight (regular). No italic.
- Specimen: https://fonts.google.com/specimen/Saira+Stencil+One

**Black Ops One**
- Style: Military-inspired sans-serif stencil
- Strengths: Most "raft stencil" of the Google Fonts options. Heavy, utilitarian, immediately reads as outdoor/adventure.
- Weaknesses: Very military — may feel too aggressive for a family-friendly expedition company.
- Specimen: https://fonts.google.com/specimen/Black+Ops+One

**Big Shoulders Stencil Display**
- Style: Narrow, bold sans-serif stencil
- Strengths: 9 weights available (thin to black) — most flexible option. Chicago industrial heritage. Condensed letterforms work well for long names like "Holiday River Expeditions."
- Weaknesses: Narrow/condensed proportions may not match the wider raft lettering.
- Specimen: https://fonts.google.com/specimen/Big+Shoulders+Stencil+Display

**Allerta Stencil**
- Style: Clean, readable sans-serif stencil
- Strengths: Originally designed for signage readability at a distance — same use case as raft lettering. Clean, professional.
- Weaknesses: Lighter weight, less rugged feel. Only 1 weight.
- Specimen: https://fonts.google.com/specimen/Allerta+Stencil

### Tier 2: Premium

Better typographic quality and more weights/styles, but requires licensing.

**Rufina Stencil** (TipoType)
- Style: Bodoni-influenced serif stencil
- Strengths: Closest upgrade from Stardos Stencil — similar serif DNA but with more weight and presence. Multiple weights + alt styles. Available on Adobe Fonts (included with CC subscription).
- Weaknesses: Still leans elegant rather than rugged. Licensing cost if not on Adobe CC (~$35–50 on MyFonts).
- Specimen: https://fonts.adobe.com/fonts/rufina-stencil

**Off War**
- Style: Slab-serif stencil (Regular, Rounded, Stamp variants)
- Strengths: Closest to actual physical equipment stenciling. Tough, rugged, industrial character. The "Stamp" variant adds texture.
- Weaknesses: May look too distressed for a clean modern website. Premium only (~$15–30).

**Gabriela Stencil**
- Style: Didone-model serif stencil, 6 weights + italics
- Strengths: Most typographically complete option. Sophisticated yet strong. The weight range allows use beyond just H1.
- Weaknesses: May be too refined for a stencil-on-a-raft vibe. Premium licensing.

### Tier 3: Worth a Look

- **Union Force** — Bold, rugged military-inspired sans-serif stencil
- **Gasline** — Rough, letterpress-inspired texture with gritty industrial feel
- **Spencer** — Military-inspired but cleaner and more modern
- **Monty Stencil** — Grotesque sans-serif with dynamic stencil cuts

---

## Recommendation

For the best balance of raft-authenticity, brand fit, and implementation ease:

1. **Saira Stencil One** — Best free option. Bold, heavy, authoritative without being too military. Good fit for a 60-year-old adventure company. Easy to add via `next/font/google`.

2. **Black Ops One** — If the brand wants to lean harder into the rugged/expedition identity. Worth testing side-by-side with raft photos.

3. **Big Shoulders Stencil Display** — Best option if we need multiple weights (e.g., lighter stencil for H2/H3 while keeping H1 bold). The 9-weight family is uniquely flexible.

For premium: **Rufina Stencil** is the natural upgrade path from Stardos Stencil if the brand prefers a serif stencil.

## Next Steps

- [ ] Compare top candidates side-by-side with raft photos at heading sizes (50–60px)
- [ ] Test readability on mobile at smaller sizes
- [ ] Verify pairing with Open Sans body text
- [ ] Confirm licensing for chosen font
- [ ] Implement via `next/font/google` in layout

## Related
- [[brand-guidelines]] — Current typography specs
