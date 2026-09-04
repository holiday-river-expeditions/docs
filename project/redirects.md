# Redirects — Domain Cutover Plan

> How traffic to the old domains reaches `holidayriver.com` after launch. The URL-by-URL map is in [[redirect-map]]. This page covers the mechanism, the rules per domain, the fallback page, the cutover order, and what is still undecided. Decided with Darius 2026-09-04; open items are flagged for [[open-decisions]].

## Where things stand today (verified 2026-09-04)

All three domains resolve to SiteGround, the host for the WordPress site:

| Domain | Today | After cutover |
|---|---|---|
| `www.bikeraft.com` | Serves the live WordPress site | Stays on SiteGround; WordPress serves 301s from the map |
| `bikeraft.com` | 301 → `https://www.bikeraft.com/` | Unchanged (one hop into the www rules) |
| `holidayriverexpeditions.com` (+www) | 301 → `https://www.bikeraft.com/` | 301 → `https://holidayriver.com/` |
| `holidayriver.com` (+www) | 301 → `https://www.bikeraft.com` (parked on SiteGround) | DNS moves to Vercel; serves the new site |

The old site is still a live dependency of the new one, not only a redirect source. See Blockers.

## Mechanism and ownership

**Path-level redirects live in WordPress on `www.bikeraft.com`, owned by Holiday's team.** SiteGround hosting and WordPress stay up indefinitely as the redirect server. This matches how Holiday already manages redirects and keeps the rules editable without a developer.

- The map is tool-agnostic. Which WordPress tool Holiday uses (Redirection plugin, Rank Math, Yoast Premium, or SiteGround Site Tools) decides only the import format. **Ask Karen.** The handoff CSV is generated from [[redirect-map]] once that is known.
- **Later option, Vercel.** If Holiday ever wants to retire SiteGround, `bikeraft.com` DNS moves to Vercel as a second domain on the website project, and the same map ships as `redirects()` in `website/next.config.ts` guarded by `has: [{ type: 'host', value: 'www.bikeraft.com' }]`. Nothing about the map changes; only where it runs.
- Nothing in `website/` implements any of this today, by design. The only code is `website/scripts/verify-redirect-map.mjs`, which checks the map against production.

## Rules per domain

### holidayriver.com

- DNS to Vercel (A / CNAME per Vercel's domain setup). Both apex and `www` added to the Vercel project; **apex is canonical**, `www` redirects to it. This matches `NEXT_PUBLIC_SITE_URL=https://holidayriver.com`.
- Email DNS (MX, SPF, DKIM) must be carried over when DNS moves. Still an open item, see [[open-decisions#Email Domain Management with Vercel]].

### holidayriverexpeditions.com

- Change the existing SiteGround redirect target from `https://www.bikeraft.com/` to `https://holidayriver.com/`. Root only, not path-preserving; the domain never served pages of its own.
- It must not go through bikeraft.com. A chain of `holidayriverexpeditions.com → www.bikeraft.com → holidayriver.com` is exactly what Karen asked to avoid.

### bikeraft.com (apex)

- Leave the existing 301 to `www.bikeraft.com` in place. It adds one hop before the www rules, which is acceptable and avoids touching a rule that works.

### www.bikeraft.com

Ordered rules, most specific first:

1. **Exclusions** so Holiday keeps admin access and the redirect tool keeps working: `/wp-admin/*`, `/wp-login.php`, `/wp-json/*` (needed by the Redirection plugin's UI).
2. **One-to-one rows** from [[redirect-map]].
3. **Pattern rows**: `/category/*`, `/tag/*`, `/author/*`, `/page/*`, `/feed*` → `/blog`; `/?s=*` → `/welcome`.
4. **Catch-all**: `/*` → `https://holidayriver.com/welcome`. This is what de-indexes bikeraft.com; no robots.txt change is needed once it is on.

`/wp-content/uploads/*` is included in the catch-all only after Blocker 1 is cleared and the USDA non-discrimination PDF is rehosted.

All rules are `301`. Query strings on old URLs are dropped except where the map says otherwise.

## The fallback page

Karen's "generalized redirect to a purpose-built page." One page on the new site that every unmapped old URL lands on.

- **Path:** `/welcome`. A Sanity `page` document served by the `/[slug]` route; no code needed. `welcome` is not in `RESERVED_SLUGS`. Create it in the Studio or add it to `website/scripts/seed-pages.mjs`.
- **Content:** a short "Holiday River Expeditions has a new home" heading, one paragraph, and links to `/trips`, `/trip-finder`, `/book`, `/blog`, `/contact`. Plain and indexable.
- **Expectation:** Google treats mass redirects to a single unrelated page as soft 404s and drops those old URLs from the index. That is the intended outcome for the ~100 unmigrated blog posts. The page exists for humans arriving from old backlinks, not to transfer ranking.

## Blockers on turning the catch-all on

Both are already documented in [[environments]] and [[open-decisions]]. Restated here because the catch-all breaks them the moment it is enabled.

1. **Seven interim photos are served from `www.bikeraft.com`** via `next/image` (see [[photo-upload-checklist]]). Move them to Sanity, then remove `www.bikeraft.com` and `cdn-ilbflkb.nitrocdn.com` from `remotePatterns` in `website/next.config.ts`.
2. **Arctic's per-departure `onlinebookingurl` points at bikeraft.com's reserve flow** (see [[arctic-api]]). Confirm the new site's cart-and-handoff no longer depends on it, and update the guest-site URL in Arctic.

## Cutover order

Expands step 5 of the checklist in [[environments]].

1. Clear Blocker 1 (photos) and Blocker 2 (Arctic URLs).
2. Create the `/welcome` page in Sanity and confirm it renders on production.
3. Resolve the `decision` rows in [[redirect-map]] with Holiday, and get Karen's list of blog posts to migrate. Run `verify-redirect-map.mjs --targets` so every `ready` row is really 200.
4. Ask Karen which WordPress redirect tool is in use and export the rules that already exist (a spot check found a dozen; see "Existing WordPress redirects" in the map). Retarget every existing rule that points at an old bikeraft.com page, or it becomes a chain.
5. Hand Karen the CSV. Rules 1 to 3 go in ahead of launch; they are harmless before DNS moves because `holidayriver.com` still redirects back to bikeraft. **Do not enable the catch-all yet.**
6. Launch: `holidayriver.com` DNS to Vercel, `NEXT_PUBLIC_SITE_URL` set, `noindex` removed from production, Sanity CORS updated.
7. Same hour: flip the `holidayriverexpeditions.com` rule to `holidayriver.com`; enable the `www.bikeraft.com` catch-all.
8. Search Console: add the `holidayriver.com` property, run **Change of Address** from the bikeraft.com property. Submit the new sitemap (note: `sitemap.ts` and `robots.ts` do not exist yet; see [[build-phases]] Phase 6).
9. Update linked URLs on Google Business Profile, TripAdvisor, Yelp, adventure.travel, and in Arctic's guest-facing settings.
10. Run `verify-redirect-map.mjs --source https://www.bikeraft.com` against the map. Zero 404s, zero chains.

## Do not do this before cutover

- **Do not apply the WordPress-internal consolidations from the old SEO action plan** (blog post → old trip page). Any of those done now becomes a two-hop chain at cutover. The same posts are mapped straight to their new-site targets in [[redirect-map]].
- **Do not add per-path redirects on the new site** for old `/specialty/<slug>` URLs or other pre-launch route changes. Decided 2026-08-26; nothing external links to them.

## Verification

`website/scripts/verify-redirect-map.mjs` reads [[redirect-map]] and has two modes:

```bash
node website/scripts/verify-redirect-map.mjs docs/project/redirect-map.md --targets https://website-phi-six-25.vercel.app
```

Pre-cutover. Requests every non-pattern target and reports `ready` rows that are not 200 (a regression) and `pending` rows that now are (flip them to `ready`).

```bash
node website/scripts/verify-redirect-map.mjs docs/project/redirect-map.md --source https://www.bikeraft.com
```

Post-cutover. Requests every old URL without following redirects and checks for exactly one 301 whose `Location` matches the map. Reports 404s, wrong targets, and chains.

## Open items for open-decisions.md

Flagged for Darius to record; not edited here.

- Which WordPress redirect tool Holiday uses, and what rules already exist.
- The fallback page slug (`/welcome` proposed).
- Whether Grand Canyon, Idaho / Salmon River, and National Parks pages have any new-site equivalent, or fall back.
- Getting Here / Before You Go pages (already open): eight map rows and five blog rows depend on it.
- The curated blog migration list (already open): each chosen post gets a 1:1 row.
- Employment, Wilderness First Aid, Outside for All Fund, Meet the Guides: fallback, or pages that need building.
- Which specialty trips continue (kayak workshop, writers' workshop, author series, Feast, yoga, sound baths).

## Related

- [[redirect-map]] — the URL map
- [[environments]] — cutover checklist
- [[domain-name]] — domain research and the 301 decision
- [[site-audit]] — old-site inventory
- [[architecture]] — new-site routes
