# Design Upgrade Plan

> Translates the [[design-review]] findings into concrete implementation steps for the new site.
>
> **Superseded color/typography:** The interim "atmospheric extensions" (canyon/river/old-sand) and the Stardos Stencil headline guidance in this document have been replaced by the official 2026 brand refresh. See [[brand-guidelines]] for the current system. The homepage section plan and component list below remain valid; interpret their color references against the new tokens in [[tailwind-tokens]].

## Design Philosophy

**"The landscape is the brand."** Every design decision should serve immersion — the feeling of standing at the edge of a canyon, hearing water, breathing desert air. The site should feel like the first morning of a river trip: warm light, open space, quiet confidence.

## Design System

See [[brand-guidelines]] for the official color palette and typography specs, and [[tailwind-tokens]] for the token names and Tailwind utility classes.

### New Utility Patterns

- **Section rhythm**: Alternate `holiday-white → evergreen (dark) → sand → full-bleed photo` to create the changing-light-on-the-river feeling
- **Teal accent thread**: Thin teal top-borders on cards, teal underlines on active nav items, teal icon fills — creates a subliminal water thread throughout
- **Wavy/organic dividers**: SVG section dividers inspired by river topography and canyon silhouettes (carries forward the footer's existing wavy edge treatment)

## Homepage Redesign — Section Plan

The homepage is the first place to demonstrate the new design language. Structure:

### 1. Full-Bleed Hero
- Full viewport height background image (canyon/river photography)
- Gradient overlay (dark at bottom for text legibility)
- Stardos H1 in brand-red: "Holiday River Expeditions"
- Subheading in white: "Motor-Free Rafting Since 1966"
- Single CTA button: "Plan Your Trip" (teal)
- Scroll indicator at bottom

### 2. Trust Bar
- Horizontal strip just below hero
- `60 Years on the River · 5.0 on Google · Travelers' Choice 2025 · Motor-Free Since 1966`
- Off-white background, small text, high credibility density
- Teal separator dots between items

### 3. "The Holiday Way" Brand Story
- Canyon-dark background section
- Short manifesto text (2-3 sentences about the philosophy)
- Subtle decorative element (river topo line or canyon silhouette)
- This is NOT just a heading — it's a brand moment

### 4. Explore by River
- Off-white or sand background
- 4 cards in a row: Colorado, Green, San Juan, Yampa
- Each card: full-bleed photo, river name overlaid, brief tagline
- Teal top-border accent on each card

### 5. Featured Trips
- White background
- 3 trip cards with enhanced design (photo, name, duration, difficulty badge, price, "X seats left" urgency)
- "View All Trips" link below
- Cards have teal top-border accent

### 6. Testimonials
- Canyon-dark background
- 1-2 guest quotes, large italic text
- Star rating, guest name, trip name
- Creates emotional pause before CTA

### 7. Final CTA
- Full-bleed photo background (campfire, sunset, group on river)
- "Ready for Your Adventure?" in white
- "Browse All Trips" button (teal)
- Simple, confident, inviting

## Component Plan

New components needed:

| Component | Location | Notes |
|-----------|----------|-------|
| `Hero` | `ui/Hero.tsx` | Full-bleed image, gradient overlay, headline + CTA |
| `TrustBar` | `ui/TrustBar.tsx` | Horizontal credibility strip |
| `RiverCard` | `ui/RiverCard.tsx` | Photo card with overlaid river name |
| `TestimonialBlock` | `ui/TestimonialBlock.tsx` | Quote display for dark backgrounds |
| `SectionDivider` | `ui/SectionDivider.tsx` | SVG wavy/organic section transition |

Existing components to use as-is:
- `Section` — add `canyon` and `sand` background options
- `Button` — add `teal` variant
- `Card` — enhance with difficulty badge, duration, urgency flag (Phase 2, when trip data flows from Sanity)

## Implementation Priority

1. **Design tokens** — Expand globals.css with new colors, H2 size, subheading size
2. **Section component** — Add canyon + sand backgrounds
3. **Button component** — Add teal variant
4. **Hero component** — Full-bleed with gradient overlay
5. **Homepage rebuild** — Wire up all sections with placeholder content
6. **Iterate** — Refine spacing, typography, and feel based on Holiday feedback

## What This Does NOT Include (Yet)

- Navigation redesign (mega-menus, photography inserts) — separate task
- Trip card enhancements (difficulty, duration, urgency) — needs Sanity/Arctic data
- Video/motion in hero — needs video assets
- Guide profiles — needs content
- Blog integration — Phase 2

## Related
- [[design-review]] — Analysis of current bikeraft.com
- [[brand-guidelines]] — Color palette, typography, logos
- [[ui-patterns]] — UI pattern guidelines
- [[page-plan]] — Full page structure plan
