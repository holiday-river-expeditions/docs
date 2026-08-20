# Design Review — bikeraft.com Analysis

> Review of Holiday's existing site (bikeraft.com) to inform the new site's aesthetic direction.
>
> ⚠️ **Superseded:** This is a snapshot analysis of the **old** bikeraft.com, written before the 2026 brand refresh — read it as history, not as guidance for the new site. Its color and typography references (`#A30D11`, Stardos Stencil, Open Sans) are all retired; see [[brand-guidelines]] and [[tailwind-tokens]] for what's current. Several of the "Key Recommendations" below were subsequently dropped and are annotated inline.

## What the Site Is

Holiday River Expeditions (bikeraft.com) is a guided outdoor adventure company based in Utah, operating for 60+ years. They offer multi-day whitewater rafting trips on the Colorado Plateau's major river systems — the Green, Colorado, San Juan, and Yampa — as well as mountain biking trips in Utah and Colorado. The brand proposition is rooted in motor-free, nature-immersed rafting guided by an expert, family-owned team with deep regional knowledge. Their differentiators are longevity (six decades), environmental stewardship, and a philosophy they call "The Holiday Way" — going with the flow and connecting people to wild landscapes.

## Current Design Language

**Typography** is the most distinctive element. Large serif display headings use a confident, high-contrast editorial style reminiscent of outdoor magazine design. The brand red (~~#A30D11~~ — retired; the brand red is now **#D00A0B** / `--color-holiday-red`) on white gives warmth and authority. The mix of serif display with condensed sans-serif navigation creates an editorial hierarchy that suits adventure publishing.

**Color palette** leans on deep crimson, off-white, and taupe/warm gray — earthy and western. The teal and blue accents (river labels on the map) hint at unexploited potential for a water-native color story.

**Photography** is the genuine strength. Hero canyon shots are stunning — deep red rock walls, emerald green water, dramatic perspective. The photography communicates the experience far better than the text does.

**Layout** is a hybrid of editorial and catalog. The bones are logical but sections feel individually designed without a strong connecting thread.

**What it lacks:** The off-white background feels flat. Horizontal red divider bars are noisy. The nav is functional but cold. The "60 Years" badge feels stock. The iframe booking experience is the biggest UX debt.

## Key Recommendations

1. **Let the landscape own more real estate** — Full-screen hero, overlaid tagline, single CTA
2. **Commit to the earthy tonal palette as atmosphere** — Alternate between off-white, dark canyon backgrounds with white type, and full-bleed photo panels (rhythm that evokes changing light on a river trip)
3. **Teal is underused** — Water is the central metaphor; teal should show up as accent throughout
   - _Not adopted._ The teal "water thread" accents and the teal `Button` variant were never built. Teal remains an accent-only secondary color per [[brand-guidelines]].
4. **Typography already has a strong voice** — Refine, don't reinvent. ~~Stardos Stencil~~ for big H1 moments only, ~~Open Sans~~ handles everything else
   - _Retired._ Both faces are gone. The brand face is **ATF Alternate Gothic** (Adobe Fonts kit `guz5fen`), paired with **PT Sans** (400/700) for body — see [[tailwind-tokens]].
5. **Build "The Holiday Way" into the visual grammar** — Hand-illustrated elements (river topo lines, canyon cross-sections), consistent lockup used like a brand stamp
6. **Navigation should feel like an invitation** — Organize around how guests think, add photography to mega-menus
7. **Authority signals need better placement** — Weave into a sleek trust bar, not a badge parade
   - _Not adopted._ No `TrustBar` component was built. Where authority signals live is still unsettled — see [[ui-patterns]].
8. **Trip cards deserve more investment** — Show difficulty, duration, group size, season, urgency flags
9. **The footer's wavy edge treatment is a nice detail** — This terrain-referencing approach should happen more throughout
   - _Not adopted._ The wavy/organic `SectionDivider` and the broader terrain treatment were dropped; no divider component exists.

## Competitive Positioning

The industry has moved toward:
- **Immersive visual storytelling** — Cinematic video/motion in hero
- **Mobile-first booking** — Native multi-step flows, not iframes
- **Trip comparison UX** — Filterable trip index with good card design
- **Integrated social proof** — Guest quotes inline on trip pages
- **Guide team as brand ambassadors** — Photo-rich guide profiles
- **Environmental storytelling** — Motor-free and stewardship as differentiator
- **Performance as brand signal** — Fast sites signal modern operation

## Summary

The brand equity is real and earned. The rebuild's job is to let it breathe:
1. Elevate the visual experience to match the physical one
2. Simplify and warm up the navigation and conversion path
3. ~~Make teal/water and "The Holiday Way" visible in the design system~~ — _Partly dropped. The teal "water thread" was not built (see item 3 above). "The Holiday Way" as a brand narrative was carried into the homepage story section, but not as a distinct visual grammar._
4. Deliver a native booking experience
5. Build trust signals into the structure of every page

## Related
- [[brand-guidelines]] — Colors, typography, logos
- [[ui-patterns]] — UI pattern guidelines
- [[design-upgrade-plan]] — Implementation plan for the new site
