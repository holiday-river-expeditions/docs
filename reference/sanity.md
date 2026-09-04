# Sanity CMS — Reference

## Project Details

| Field                | Value                        |
| -------------------- | ---------------------------- |
| Project ID           | `jau3o5v4`                   |
| Dataset              | `production`                 |
| API version          | `2024-01-01`                 |
| Sanity version       | v5 (`sanity` package)        |
| Studio URL (local)   | http://localhost:3000/studio |
| Management dashboard | https://www.sanity.io/manage |

## Environment Variables

Defined in `.env.local` (gitignored), templated in `.env.example`:

| Variable                        | Public?             | Purpose                                                          |
| ------------------------------- | ------------------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes (client bundle) | Identifies the Sanity project                                    |
| `NEXT_PUBLIC_SANITY_DATASET`    | Yes (client bundle) | Dataset name (`production`)                                      |
| `SANITY_API_TOKEN`              | No (server only)    | Write access token — generate at sanity.io/manage → API → Tokens |

Centralized in `src/sanity/env.ts` — all code imports from there, never reads `process.env` directly.

## CORS Origins

Managed at sanity.io/manage → API → CORS Origins. Sanity does **not** support wildcards — each origin must be added explicitly.

Current origins:

- `http://localhost:3000` (with credentials)
- `https://website-phi-six-25.vercel.app` (confirmed registered 2026-08-24)

Still needed (⚠️ launch blocker):

- Production domain when live — **`https://holidayriver.com`** (see [[open-decisions#Domain]])
- Beta subdomain when configured (`https://beta.holidayriver.com`)

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
│   │       ├── post.ts                    ← Blog post
│   │       ├── homepage.ts                ← Singleton
│   │       ├── contact-submission.ts      ← Written by /api/contact
│   │       ├── newsletter-subscriber.ts   ← Written by /api/newsletter
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

| Schema        | Sanity type name | Key fields                                                                                                                                                       | Notes                                                                |
| ------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| River         | `river`          | name, riverName, slug, description, image, usgsSiteId, flowLinkUrl                                                                                               | Titled **Section** in the Studio. Named by stretch (Westwater, Cataract, White Rim); `riverName` carries the actual river. |
| Trip Type     | `tripType`       | name, slug, cardLabel, tagColor, listsWith, description, image, order                                                                                            | Rafting, Biking, Combo. Replaced `activity` + `tripCategory` on 2026-08-28. Drives `/rafting`, `/biking`, the card tag and its colour. |
| Specialty Type | `specialtyType` | name, slug, tagline, description (Portable Text), image, ribbonLabel, order                                                                                      | Specialty families. Backs the sections on `/specialty` — there are no per-family routes. |
| Trip Info Section | `tripInfoSection` | title, slug, body (Portable Text), order                                                                                                                   | Shared trip-page panels (Packing List, Getting Here, Before You Go), overridable per trip. |
| Trip          | `trip`           | name, slug, river (ref), tripType (ref), duration, description (Portable Text), highlights, whatsIncluded, videoUrl, minAge, season, whoIsThisFor, meetingPlace, deposit, featuredReview, itinerary, infoSections, arcticTripId | Central content type, fields grouped into tabs. `arcticTripId` is the comma-separated Arctic trip-type id(s). `difficulty` was removed 2026-08-28 in favour of `maxRapidClass`. |
| FAQ           | `faq`            | question, answer (Portable Text), category, order                                                                                                                | Categories: general, booking, trip-preparation, safety, cancellation |
| Site Settings | `siteSettings`   | phone, email, address, reviews, socialLinks                                                                                                                      | Singleton — pinned in Studio structure                               |
| Page          | `page`           | title, slug, content (array of blocks)                                                                                                                           | Generic page builder, rendered by `/[slug]`                          |
| Post          | `post`           | title, slug, excerpt, mainImage, publishedAt, category, body (Portable Text + images)                                                                             | Blog post (added 2026-08-10). Categories: trip-prep, conservation, culture & history. No author reference. |
| Homepage      | `homepage`       | hero, featuredTrips (refs), story block, rivers (refs), learnContent (cards)                                                                                     | Singleton — pinned in Studio structure                               |
| Trip Finder   | `tripFinderSpec` | questions[] (tripFinderQuestion), minConfidentScore, resultsShown                                                                                                | Singleton (added 2026-09-04). The Find Your Trip wizard's questions, answers, dials, and tuning. Validated in `src/lib/trip-finder-spec.ts`; the in-code default is the fallback. See [[trip-finder]]. |
| Contact Submission | `contactSubmission` | name, email, message, submittedAt                                                                                                                          | Written by `POST /api/contact`; triaged in Studio                    |
| Newsletter Subscriber | `newsletterSubscriber` | email, subscribedAt                                                                                                                                 | Written by `POST /api/newsletter`; idempotent `_id` derived from email |

### Object types (content blocks)

Used inside the Page builder's `content` array:

| Schema        | Sanity type name | Fields                                                 |
| ------------- | ---------------- | ------------------------------------------------------ |
| Hero Block    | `heroBlock`      | heading, subheading, backgroundImage, ctaText, ctaLink |
| Content Block | `contentBlock`   | heading, background (white/sand/opal/evergreen), body (Portable Text + images) |

### Planned (not yet implemented)

- **Author** — no author model exists; blog posts carry no byline reference
- **Story/History** — Phase 4
- **Gallery Item** — Phase 4

## Querying Data

### GROQ queries

All queries live in `src/lib/sanity/queries.ts` using `defineQuery()` from `next-sanity`. This enables `sanity typegen` to generate return types automatically.

Available queries:

| Query                | Params         | Returns                                                   |
| -------------------- | -------------- | --------------------------------------------------------- |
| `allTripsQuery`      | —              | All trips with dereferenced river, activities, categories |
| `tripBySlugQuery`    | `slug: string` | Single trip with full details                             |
| `allRiversQuery`     | —              | All rivers                                                |
| `riverBySlugQuery`   | `slug: string` | Single river                                              |
| `allActivitiesQuery` | —              | All activities                                            |
| `activityBySlugQuery`| `slug: string` | Single activity                                           |
| `allFaqsQuery`       | —              | All FAQs ordered by category then sort order              |
| `siteSettingsQuery`  | —              | Site settings singleton                                   |
| `pageBySlugQuery`    | `slug: string` | Single page with content blocks                           |
| `allPostsQuery`      | —              | All blog posts                                            |
| `postBySlugQuery`    | `slug: string` | Single blog post                                          |
| `homepageQuery`      | —              | Homepage singleton with dereferenced trips and rivers     |

Contact submissions and newsletter subscribers have no read queries — they are write-only from the API routes and reviewed directly in Studio.

### Fetch helpers

Thin wrappers in `src/lib/sanity/fetch.ts`. Use these in server components:

```typescript
import { getAllTrips, getTripBySlug } from "@/lib/sanity";

// In a server component or page:
const trips = await getAllTrips();
const trip = await getTripBySlug("desolation-canyon");
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
import { urlFor } from "@/lib/sanity";

// Basic usage
const url = urlFor(trip.photos[0]).url();

// With dimensions
const url = urlFor(trip.photos[0]).width(800).height(600).url();

// With format and quality
const url = urlFor(trip.photos[0]).width(1200).format("webp").quality(80).url();

// Auto crop with hotspot
const url = urlFor(trip.photos[0]).width(400).height(400).fit("crop").url();
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

**Adding content:** Navigate to `/studio`, select a document type from the sidebar, create/edit documents. Edits save as a draft and go live when the editor presses **Publish** (Sanity's default draft → publish flow; no review/approval workflow is configured on top of it). Editor-facing walkthrough: [[sanity-editor-guide]].

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
