# Design Upgrade Plan

> Translates the [[design-review]] findings into concrete implementation steps for the new site.
>
> **Superseded:** Parts of this doc have been overtaken by later decisions. (1) **Color/typography** — the interim "atmospheric extensions" (canyon/river/old-sand) and the Stardos Stencil headline guidance were replaced by the official 2026 brand refresh; see [[brand-guidelines]] and [[tailwind-tokens]]. (2) **Homepage structure** — the original section/component plans (Trust Bar, "The Holiday Way", Testimonials, Final CTA, teal accents, 4 river cards) were superseded by the Figma homepage mockup that was actually built. The "Homepage Redesign — Section Plan" and "Component Plan" sections below have been updated to reflect the implemented homepage. (3) **New Utility Patterns** — the teal accent thread and the wavy/organic dividers described there were never built; only the section-rhythm idea survived. (4) **Implementation Priority** — that list is historical, not a live to-do: the homepage shipped 2026-05-29 and the teal `Button` variant was dropped.

## Design Philosophy

**"The landscape is the brand."** Every design decision should serve immersion — the feeling of standing at the edge of a canyon, hearing water, breathing desert air. The site should feel like the first morning of a river trip: warm light, open space, quiet confidence.

## Design System

See [[brand-guidelines]] for the official color palette and typography specs, and [[tailwind-tokens]] for the token names and Tailwind utility classes.

### New Utility Patterns

- **Section rhythm**: Alternate `holiday-white → evergreen (dark) → sand → full-bleed photo` to create the changing-light-on-the-river feeling
- ~~**Teal accent thread**: Thin teal top-borders on cards, teal underlines on active nav items, teal icon fills — creates a subliminal water thread throughout~~ — _not built._
- ~~**Wavy/organic dividers**: SVG section dividers inspired by river topography and canyon silhouettes (carries forward the footer's existing wavy edge treatment)~~ — _not built; no `SectionDivider` component exists._

## Homepage Redesign — Section Plan

Reflects the homepage as built from the Figma mockup. Top to bottom:

### 1. Hero
- Full-bleed canyon/river photo with a subtle dark overlay (`bg-onyx/20`)
- Alternate Gothic H1 in white, all caps, centered: "Multi-Day Raft and Bike Expeditions in the Heart of Canyon Country"
- Red **"60 Years of Going With the Flow"** anniversary seal straddling the bottom-left edge
- Fixed height (~550px on desktop)

### 2. Featured Trips
- White background; 6 trip cards in a 3-column grid
- `TripCard` shows photo, category tag, "Starts at $X / N Days", red name, short description
- **Specialty variant**: red ribbon (e.g. "Specialty Music Trip"), red border frame, and a red subtitle line beneath the name (e.g. "Desolation Canyon" → "With The Pickpockets Bluegrass")
- "View All Trips" outline button below

### 3. Rafting Since 1966
- White background; two-column layout
- Left: two-image collage (vintage trip photo + grayscale founder portrait) with a handwritten **"Dee Holladay"** signature + arrow pointing at the portrait
- Right: red Alternate Gothic heading "Rafting Since 1966", short thank-you copy, "Learn More" outline button

### 4. River Selector
- Full-bleed photo background with a dark overlay
- Interactive vertical list of the rivers; hovering/focusing a name crossfades the background image; the active name is red, the rest white
- **River count unverified.** This section previously claimed 9 rivers, but only 4 River documents are consistently named across the vault (Colorado, Green, San Juan, Yampa). Check the live Sanity dataset before quoting a number.

### 5. Learn & Get Inspired
- White background; red section heading; 4 `ContentCard`s in a row
- Tall photo cards with the title overlaid (white, drop shadow); a video variant shows a play badge
- "Learn More" outline button below

### 6. Footer
- Sand background; newsletter signup ("The River Is Calling…") with email capture
- Follow Us / Resources / Find Us link columns
- Horizontal red logo lockup + NPS **"Authorized Concessioner"** badge on the bottom row

## Component Plan

Components backing the current homepage:

| Component | Location | Notes |
|-----------|----------|-------|
| `Hero` | `ui/Hero.tsx` | Full-bleed image, overlay, headline, 60-years seal |
| `TripCard` | `ui/TripCard.tsx` | Trip card; optional `ribbon` / `subtitle` / `featured` specialty variant |
| `RiverSelector` | `ui/RiverSelector.tsx` | Interactive river list with crossfading background |
| `ContentCard` | `ui/ContentCard.tsx` | Overlaid-title photo card; optional video play badge |
| `Section` | `ui/Section.tsx` | Section wrapper with background-color options |
| `Button` | `ui/Button.tsx` | Pill button: `primary` / `outline` / `onyx` |
| `NewsletterSignup` | `ui/NewsletterSignup.tsx` | Footer email capture; wired — posts to `/api/newsletter`, which writes `newsletterSubscriber` docs to Sanity. Only the email/CRM provider is still undecided (see [[open-decisions]]) |
| `Header` / `Nav` / `MobileNav` | `layout/` | Center logo lockup, desktop nav, Book Now, mobile menu |
| `Footer` | `layout/Footer.tsx` | Newsletter + link columns + logo + NPS badge |

**Not built** (dropped or deferred from the earlier vision): `TrustBar`, `RiverCard`, `TestimonialBlock`, `SectionDivider`, the teal `Button` variant, and the teal "water thread" accents.

## Implementation Priority

> **Historical — not a live to-do list.** This was the original sequencing; the homepage shipped 2026-05-29 from the Figma mockup with real Sanity content. Every step below is either done or dropped, as annotated.

1. **Design tokens** — Expand globals.css with new colors, H2 size, subheading size — _done, though the tokens that landed are the 2026 brand refresh set, not the interim ones this step had in mind; see [[tailwind-tokens]]._
2. **Section component** — Add canyon + sand backgrounds — _done (`ui/Section.tsx`); `canyon` was retired in favor of `evergreen`/`onyx`._
3. ~~**Button component** — Add teal variant~~ — _dropped. `Button` ships `primary` / `outline` / `onyx` only._
4. **Hero component** — Full-bleed with gradient overlay — _done (`ui/Hero.tsx`)._
5. **Homepage rebuild** — Wire up all sections with placeholder content — _done 2026-05-29, built from the Figma mockup with real Sanity content rather than placeholders._
6. **Iterate** — Refine spacing, typography, and feel based on Holiday feedback — _ongoing._

## What This Does NOT Include (Yet)

- Navigation redesign (mega-menus, photography inserts) — separate task
- Trip card enhancements (difficulty, duration, urgency) — needs Sanity/Arctic data
- Video/motion in hero — needs video assets
- Guide profiles — needs content
- ~~Blog integration — Phase 2~~ — _shipped 2026-08-10 under Phase 4: `/blog` and `/blog/[slug]` are live. See [[build-phases]]._

## Related
- [[design-review]] — Analysis of current bikeraft.com
- [[brand-guidelines]] — Color palette, typography, logos
- [[ui-patterns]] — UI pattern guidelines
- [[page-plan]] — Full page structure plan
