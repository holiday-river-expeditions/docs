# Sanity CMS — Reference

## Project Details

| Field | Value |
|-------|-------|
| Project ID | `jau3o5v4` |
| Dataset | `production` |
| API version | `2024-01-01` |
| Sanity version | v5 (`sanity` package) |
| Studio URL (local) | http://localhost:3000/studio |
| Management dashboard | https://www.sanity.io/manage |

## Environment Variables

Defined in `.env.local` (gitignored), templated in `.env.example`:

| Variable | Public? | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes (client bundle) | Identifies the Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes (client bundle) | Dataset name (`production`) |
| `SANITY_API_TOKEN` | No (server only) | Write access token — generate at sanity.io/manage → API → Tokens |

Centralized in `src/sanity/env.ts` — all code imports from there, never reads `process.env` directly.

## CORS Origins

Managed at sanity.io/manage → API → CORS Origins. Sanity does **not** support wildcards — each origin must be added explicitly.

Current origins:
- `http://localhost:3000` (with credentials)

Still needed:
- Production domain when live
- Vercel production URL (`https://website-phi-six-25.vercel.app`)

## File Structure

```
website/
├── sanity.config.ts              ← Studio config (plugins, schema registration, basePath)
├── sanity.cli.ts                 ← CLI config (project ID, dataset, typegen output path)
├── src/
│   ├── sanity/
│   │   ├── env.ts                ← Centralized env var access
│   │   ├── types.ts              ← Generated types (DO NOT EDIT — run pnpm typegen)
│   │   └── schemas/
│   │       ├── index.ts          ← Barrel export of all schema types
│   │       ├── river.ts
│   │       ├── activity.ts
│   │       ├── trip-category.ts
│   │       ├── trip.ts
│   │       ├── faq.ts
│   │       ├── site-settings.ts
│   │       ├── page.ts
│   │       └── blocks/
│   │           ├── hero-block.ts
│   │           └── content-block.ts
│   ├── lib/sanity/
│   │   ├── client.ts             ← createClient from next-sanity
│   │   ├── image.ts              ← urlFor() image URL builder
│   │   ├── queries.ts            ← GROQ queries (defineQuery for typegen)
│   │   ├── fetch.ts              ← Fetch helpers (getAllTrips, getTripBySlug, etc.)
│   │   └── index.ts              ← Barrel export
│   └── app/studio/[[...tool]]/
│       ├── page.tsx              ← NextStudio client component
│       └── layout.tsx            ← Fragment wrapper (inherits root layout)
```

## Content Schemas

### Document types

| Schema | Sanity type name | Key fields | Notes |
|--------|-----------------|------------|-------|
| River | `river` | name, slug, description, image | Colorado, Green, San Juan, Yampa |
| Activity | `activity` | name, slug, description, image | Rafting, Mountain Biking, Multi-Sport |
| Trip Category | `tripCategory` | name, slug, description | Family, Stargazing, Canyon Concerts, etc. |
| Trip | `trip` | name, slug, river (ref), activities (refs), categories (refs), difficulty, duration, description (Portable Text), photos, highlights, pricingNotes, arcticTripId | Central content type. `arcticTripId` links to Arctic API. |
| FAQ | `faq` | question, answer (Portable Text), category, order | Categories: general, booking, trip-preparation, safety, cancellation |
| Site Settings | `siteSettings` | phone, email, address, socialLinks | Singleton — only one document of this type should exist |
| Page | `page` | title, slug, content (array of blocks) | Generic page builder |

### Object types (content blocks)

Used inside the Page builder's `content` array:

| Schema | Sanity type name | Fields |
|--------|-----------------|--------|
| Hero Block | `heroBlock` | heading, subheading, backgroundImage, ctaText, ctaLink |
| Content Block | `contentBlock` | heading, body (Portable Text + images) |

### Planned (not yet implemented)

- Blog Post, Author — Phase 4
- Story/History — Phase 4
- Gallery Item — Phase 4

## Querying Data

### GROQ queries

All queries live in `src/lib/sanity/queries.ts` using `defineQuery()` from `next-sanity`. This enables `sanity typegen` to generate return types automatically.

Available queries:

| Query | Params | Returns |
|-------|--------|---------|
| `allTripsQuery` | — | All trips with dereferenced river, activities, categories |
| `tripBySlugQuery` | `slug: string` | Single trip with full details |
| `allRiversQuery` | — | All rivers |
| `riverBySlugQuery` | `slug: string` | Single river |
| `allActivitiesQuery` | — | All activities |
| `allFaqsQuery` | — | All FAQs ordered by category then sort order |
| `siteSettingsQuery` | — | Site settings singleton |
| `pageBySlugQuery` | `slug: string` | Single page with content blocks |

### Fetch helpers

Thin wrappers in `src/lib/sanity/fetch.ts`. Use these in server components:

```typescript
import { getAllTrips, getTripBySlug } from '@/lib/sanity';

// In a server component or page:
const trips = await getAllTrips();
const trip = await getTripBySlug('desolation-canyon');
```

### Writing custom queries

1. Add the query to `src/lib/sanity/queries.ts` using `defineQuery()`
2. Add a fetch helper to `src/lib/sanity/fetch.ts`
3. Export from `src/lib/sanity/index.ts` if not already covered by `*` re-export
4. Run `pnpm typegen` to regenerate TypeScript types
5. Commit `src/sanity/types.ts`

### GROQ syntax quick reference

```groq
// All documents of a type
*[_type == "trip"]

// Filter by field
*[_type == "trip" && difficulty == "moderate"]

// Dereference a reference field
"river": river->{ name, slug }

// Dereference an array of references
"activities": activities[]->{ name, slug }

// Filter by slug
*[_type == "trip" && slug.current == $slug][0]

// Order results
*[_type == "faq"] | order(category asc, order asc)

// Limit results
*[_type == "trip"][0...10]
```

## Images

Use the `urlFor()` helper from `src/lib/sanity/image.ts`:

```typescript
import { urlFor } from '@/lib/sanity';

// Basic usage
const url = urlFor(trip.photos[0]).url();

// With dimensions
const url = urlFor(trip.photos[0]).width(800).height(600).url();

// With format and quality
const url = urlFor(trip.photos[0]).width(1200).format('webp').quality(80).url();

// Auto crop with hotspot
const url = urlFor(trip.photos[0]).width(400).height(400).fit('crop').url();
```

Images are served from `cdn.sanity.io` (already whitelisted in `next.config.ts`).

## Type Generation

Types are generated from schemas + GROQ queries and written to `src/sanity/types.ts`.

```bash
pnpm typegen
```

This runs two steps:
1. `sanity schema extract` → produces `schema.json` (gitignored)
2. `sanity typegen generate` → reads schema + queries → writes `src/sanity/types.ts`

**When to re-run:**
- After adding or changing schemas in `src/sanity/schemas/`
- After adding or changing queries in `src/lib/sanity/queries.ts`

**Always commit `src/sanity/types.ts`** — it's checked into git so CI doesn't need a live Sanity connection to typecheck.

## Studio

Sanity Studio is embedded in the Next.js app at `/studio` via a catch-all route (`src/app/studio/[[...tool]]/`).

**Plugins enabled:**
- `structureTool` — document list and editor
- `visionTool` — GROQ query playground (useful for testing queries)

**Access:** Log in with standard Sanity credentials. Project owner has full access. Other team members need to be invited at sanity.io/manage → Members.

**Adding content:** Navigate to `/studio`, select a document type from the sidebar, create/edit documents. Changes publish immediately (no draft/publish workflow configured yet).

## Adding a New Schema

1. Create the schema file in `src/sanity/schemas/` using `defineType` and `defineField` from `sanity`
2. Import and add it to the `schemaTypes` array in `src/sanity/schemas/index.ts`
3. Add queries to `src/lib/sanity/queries.ts` using `defineQuery()`
4. Add fetch helpers to `src/lib/sanity/fetch.ts`
5. Run `pnpm typegen` and commit `src/sanity/types.ts`
6. Verify: `pnpm lint && pnpm typecheck && pnpm build`

## Related

- [[architecture]] — Content models and data flow
- [[build-phases]] — Sanity setup status
- [[tech-stack]] — Why Sanity was chosen
- [[cms-comparison]] — Sanity vs alternatives evaluation
