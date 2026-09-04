# Redirect Map — www.bikeraft.com → holidayriver.com

> **Working document.** Every URL the old site publishes, with the page it should land on after cutover. Strategy, host-level rules, and the cutover order are in [[redirects]]. Old URLs come from the live sitemaps at `www.bikeraft.com/page-sitemap.xml` and `post-sitemap.xml` as of 2026-09-04 (84 pages, 146 posts), reconciled against the February inventory in [[site-audit]] and spot-checked live; a handful of pages are live but excluded from the sitemap and are noted inline. New targets are paths on `https://holidayriver.com`.

## How to read the table

| Column | Meaning |
|---|---|
| **Old path** | Path on `www.bikeraft.com`. A trailing `*` means a pattern rule. |
| **New target** | Path on `holidayriver.com`. A `#anchor` jumps to a section of a hub page. |
| **Kind** | `1:1` same page on the new site · `section` closest hub or parent page · `fallback` the purpose-built landing page at `/welcome` · `drop` no rule needed |
| **Status** | `ready` target returns 200 on production today · `pending` target route exists but that page/slug is not live yet · `decision` needs Darius or Holiday to choose |

Rule order matters in WordPress: exact rows first, then pattern rows, then the catch-all. Run `node website/scripts/verify-redirect-map.mjs docs/project/redirect-map.md --targets <prod url>` to re-check every `ready` and `pending` row against production.

The new site's `/rivers/<slug>` pages are **canyon sections** (Cataract, Desolation, Westwater, White Rim, the Maze, San Rafael, Gates of Lodore, San Juan, Yampa), not the old "Green River / Colorado River" landing pages. Old canyon pages map there when no bookable `/trips/<slug>` exists yet.

---

## Homepage

| Old path | New target | Kind | Status | Note |
|---|---|---|---|---|
| `/` | `/` | 1:1 | ready | |

## River landing pages (old "Rivers" nav)

| Old path | New target | Kind | Status | Note |
|---|---|---|---|---|
| `/colorado-river-rafting-trips/` | `/rafting` | section | decision | No Colorado River page on the new site. Its canyons (Westwater, Cataract) have `/rivers` pages. Alternative: `/trips`. |
| `/green-river-rafting/` | `/rafting` | section | decision | Same. Green canyons are Desolation, Labyrinth, Lodore. |
| `/san-juan-river-rafting/` | `/rivers/san-juan` | 1:1 | ready | |
| `/colorado-white-water-rafting/yampa-river-rafting-trips/` | `/rivers/yampa` | 1:1 | ready | Listed under both Rivers and Colorado trips on the old site. |

## Destination landing pages

| Old path | New target | Kind | Status | Note |
|---|---|---|---|---|
| `/utah-white-water-rafting/` | `/rafting` | section | ready | |
| `/colorado-white-water-rafting/` | `/rafting` | section | ready | Colorado the state. |
| `/grand-canyon-rafting/` | `/welcome` | fallback | decision | Holiday does not run Grand Canyon trips on the new site. Confirm there is nothing to point at. |
| `/idaho-river-rafting/` | `/welcome` | fallback | decision | Same question for Idaho / Salmon River. |
| `/salmon-river-rafting/` | `/welcome` | fallback | decision | Not in the Feb audit; in the live sitemap. |
| `/national-parks/` | `/trips` | section | decision | Already 404 on the old site (2026-09-04); rule is optional. |
| `/national-park-vacations-in-ut-co/` | `/trips` | section | decision | Not in the Feb audit; in the live sitemap. |

## Trip detail pages — rafting

| Old path | New target | Kind | Status | Note |
|---|---|---|---|---|
| `/utah-white-water-rafting/cataract-canyon/` | `/trips/cataract-canyon` | 1:1 | ready | |
| `/utah-white-water-rafting/desolation-canyon/` | `/rivers/desolation` | 1:1 | ready | Only the bluegrass music trip is live under `/trips`. Switch to `/trips/desolation-canyon` when the standard trip ships. |
| `/utah-white-water-rafting/fisher-towers-moab-river-rafting/` | `/trips/fisher-towers` | 1:1 | pending | No river or trip page yet. |
| `/utah-white-water-rafting/westwater-canyon-rafting/` | `/trips/westwater-canyon` | 1:1 | ready | |
| `/utah-white-water-rafting/san-juan-upper-canyon/` | `/trips/san-juan-river` | section | ready | Upper/Lower/Full are one trip on the new site so far. Split later if Holiday wants three. |
| `/utah-white-water-rafting/san-juan-lower-canyon/` | `/trips/san-juan-river` | section | ready | |
| `/utah-white-water-rafting/san-juan-river/` | `/trips/san-juan-river` | 1:1 | ready | |
| `/green-river-rafting/labyrinth-canyon-rafting-trip/` | `/trips/labyrinth-canyon` | 1:1 | pending | No river or trip page yet. |
| `/colorado-white-water-rafting/lodore-canyon/` | `/trips/gates-of-lodore` | 1:1 | ready | |

## Mountain biking

| Old path | New target | Kind | Status | Note |
|---|---|---|---|---|
| `/mountain-biking-trips/` | `/biking` | 1:1 | ready | |
| `/mountain-biking-trips/white-rim-trail-mountain-bike-tour/` | `/rivers/white-rim` | 1:1 | ready | Switch to `/trips/white-rim` when the trip ships. |
| `/mountain-biking-trips/the-maze/` | `/trips/the-maze` | 1:1 | ready | |
| `/mountain-biking-trips/san-rafael-swell/` | `/rivers/san-rafael` | 1:1 | ready | Switch to `/trips/san-rafael-swell` when the trip ships. |

## Multi-sport combinations

| Old path | New target | Kind | Status | Note |
|---|---|---|---|---|
| `/multi-sport-combination/` | `/biking` | section | decision | No combo trips on the new site yet. |
| `/multi-sport-combination/moab-westwater-combination/` | `/biking` | section | decision | Or `/trips/westwater-canyon`. |
| `/multi-sport-combination/white-rim-trail-cataract-canyon-combination/` | `/biking` | section | decision | Or `/trips/cataract-canyon`. |

## Trip type / category pages

| Old path | New target | Kind | Status | Note |
|---|---|---|---|---|
| `/river-rafting-trips/` | `/rafting` | 1:1 | ready | |
| `/family-rafting-trips/` | `/trip-finder` | section | decision | The wizard is the new "which trip fits us" path. Alternative: `/trips`. |
| `/adult-only-trips/` | `/trip-finder` | section | decision | Same. |
| `/private-charter-trips-in-utah-and-colorado/` | `/contact` | section | decision | Charters are inquiry-driven. No charter page yet. |
| `/youth-group-rafting-trips/` | `/specialty#youth-family` | section | ready | |
| `/holiday-river-expeditions-alumni-trips/` | `/welcome` | fallback | decision | |

## Youth group trip detail pages

| Old path | New target | Kind | Status | Note |
|---|---|---|---|---|
| `/youth-group-rafting-trips/green-river-daily/` | `/specialty#youth-family` | section | decision | No day trips on the new site. |
| `/youth-group-rafting-trips/colorado-river-daily/` | `/specialty#youth-family` | section | decision | Same. |
| `/youth-group-rafting-trips/fisher-towers-moab-beginner-rafting/` | `/specialty#youth-family` | section | decision | Or `/trips/fisher-towers` once it exists. |
| `/youth-group-rafting-trips/san-juan-river/` | `/trips/san-juan-river` | section | ready | |
| `/youth-group-rafting-trips/desolation-canyon/` | `/rivers/desolation` | section | ready | |

## Stargazing

| Old path | New target | Kind | Status | Note |
|---|---|---|---|---|
| `/dark-sky-stargazing-trip-series/` | `/specialty#stargazing` | 1:1 | ready | |
| `/dark-sky-stargazing-trip-series/cataract-canyon-stargazing-trip/` | `/specialty#stargazing` | section | ready | Swap to the trip page when a stargazing trip ships under `/trips`. |
| `/dark-sky-stargazing-trip-series/desolation-canyon-stargazing-trip/` | `/specialty#stargazing` | section | ready | |
| `/dark-sky-stargazing-trip-series/labyrinth-canyon-stargazing-and-hiking-river-trip/` | `/specialty#stargazing` | section | ready | |
| `/dark-sky-stargazing-trip-series/white-rim-trail-stargazing-trip/` | `/specialty#stargazing` | section | ready | |
| `/dark-sky-stargazing-trip-series/yampa-river-stargazing-rafting-camping-trip/` | `/specialty#stargazing` | section | ready | |
| `/dark-sky-stargazing-trip-series/lodore-canyon-stargazing-trip/` | `/specialty#stargazing` | section | ready | Not in the Feb audit; in the live sitemap. |

## Canyon Concerts

| Old path | New target | Kind | Status | Note |
|---|---|---|---|---|
| `/music-river-rafting-trips-in-ut-co/` | `/specialty#canyon-concerts` | 1:1 | ready | |
| `/music-river-rafting-trips-in-ut-co/gates-of-lodore-rafting-with-theoretical-blonde/` | `/specialty#canyon-concerts` | section | ready | |
| `/music-river-rafting-trips-in-ut-co/green-river-rafting-trip-with-ben-weiss-and-friends/` | `/specialty#canyon-concerts` | section | ready | |
| `/music-river-rafting-trips-in-ut-co/pickpockets-bluegrass-band-on-the-green-river/` | `/specialty#stargazing` | section | ready | WordPress already redirects this to the Lodore stargazing trip, so the concert was replaced. Retarget that rule. |
| `/music-river-rafting-trips-in-ut-co/pompe-n-honey-on-the-yampa-river/` | `/specialty#canyon-concerts` | section | ready | |
| `/music-river-rafting-trips-in-ut-co/westwater-canyon-with-the-last-wild-buffalo/` | `/specialty#canyon-concerts` | section | ready | |
| `/music-river-rafting-trips-in-ut-co/westwater-canyon-with-the-wasatch-valley-drifters/` | `/specialty#canyon-concerts` | section | ready | |
| `/music-river-rafting-trips-in-ut-co/yampa-river-rafting-with-members-of-the-del-sol-string-quartet/` | `/specialty#canyon-concerts` | section | ready | |
| `/boats-buddha-and-the-blues-cataract-canyon-with-bad-brad-wheeler/` | `/trips/cataract-canyon` | section | ready | WordPress already redirects this to the old Cataract page. Retarget that rule. |

## Specialty, affinity, women's

The `/specialty` hub has anchors `canyon-concerts`, `stargazing`, `womens`, `youth-family`, `affinity`. Old specialty trips with no matching family land on the hub itself.

| Old path | New target | Kind | Status | Note |
|---|---|---|---|---|
| `/specialty-river-rafting-trips/` | `/specialty` | 1:1 | ready | |
| `/specialty-river-rafting-trips/kayak-workshop/` | `/specialty` | section | decision | No kayak family. Is the workshop continuing? |
| `/specialty-river-rafting-trips/fall-extended-hiking-trip-stargazing/` | `/specialty#stargazing` | section | ready | |
| `/specialty-river-rafting-trips/green-river-rafting-labyrinth-canyon-hiking-trip/` | `/specialty` | section | decision | Or `/trips/labyrinth-canyon` once it exists. |
| `/specialty-river-rafting-trips/meditation-and-sound-baths-on-the-green-river/` | `/trips/cataract-canyon` | section | ready | Already a two-hop chain on the old site (→ Boats, Buddha & the Blues → Cataract). Retarget directly. |
| `/specialty-river-rafting-trips/river-read-author-series-with-craig-childs/` | `/specialty` | section | decision | |
| `/specialty-river-rafting-trips/writers-workshop-on-the-yampa-river/` | `/specialty` | section | decision | |
| `/lodore-canyon-rafting-and-yoga-with-seek-studio/` | `/specialty#womens` | section | ready | WordPress already redirects this to the women's yoga trip. Retarget that rule. |
| `/the-feast/` | `/specialty` | section | decision | |
| `/affinity-based-trips/` | `/specialty#affinity` | 1:1 | ready | |
| `/affinity-based-trips/bipoc-westwater-canyon-rafting-trip/` | `/specialty#affinity` | section | ready | |
| `/affinity-based-trips/lgbtq-lodore-canyon-rafting-trip/` | `/specialty#affinity` | section | ready | |
| `/affinity-based-trips/lgbtq-westwater-canyon-family-rafting-trip/` | `/specialty#affinity` | section | ready | WordPress already redirects this to the affinity landing. Retarget that rule. |
| `/womens-river-rafting-yoga-trip/` | `/specialty#womens` | section | ready | |
| `/womens-watercolor-workshop-in-lodore-canyon-with-the-great-old-broads/` | `/specialty#womens` | section | ready | |

## About pages

| Old path | New target | Kind | Status | Note |
|---|---|---|---|---|
| `/our-history/` | `/about` | section | ready | |
| `/the-holiday-way/` | `/about` | section | ready | |
| `/meet-the-guides/` | `/about` | section | decision | Is a guides page planned? |
| `/at-your-service/` | `/about` | section | ready | Admin team. |
| `/reviews/` | `/about` | section | decision | Reviews strategy pushes to Google/TripAdvisor. Nothing on-site to land on. |
| `/employment/` | `/welcome` | fallback | decision | Holiday hires guides every season. An employment page is probably needed; flag. |
| `/wilderness-first-aid-courses/` | `/welcome` | fallback | decision | |
| `/outside-for-all-fund/` | `/welcome` | fallback | decision | |
| `/the-environment/` | `/about` | section | decision | |
| `/river-rafting-awards-holiday-river-expeditions-does-it-right/` | `/about` | section | ready | |
| `/impeccable-gear/` | `/about` | section | decision | |

## Utility and policy pages

| Old path | New target | Kind | Status | Note |
|---|---|---|---|---|
| `/faqs/` | `/faq` | 1:1 | ready | |
| `/contact-us/` | `/contact` | 1:1 | ready | WordPress already redirects this to `/contact-holiday-river-expeditions/`. Retarget that rule. |
| `/contact-holiday-river-expeditions/` | `/contact` | 1:1 | ready | The current contact page. |
| `/open-seats-on-utah-whitewater-rafting-trips/` | `/book` | 1:1 | ready | Appears in both the page and post sitemaps. |
| `/utah-trips-by-date/` | `/book` | 1:1 | ready | |
| `/last-minute-deals/` | `/book` | section | ready | Ways to Save. |
| `/cancellation-policy/` | `/trip-insurance` | 1:1 | decision | Confirm the trip-insurance page carries the cancellation policy. Policy pages are decided-needed, phase TBD. |
| `/essential-eligibility-criteria/` | `/essential-eligibility-criteria` | 1:1 | pending | Policy page not built. |
| `/code-of-conduct/` | `/code-of-conduct` | 1:1 | pending | Policy page not built. |
| `/privacy/` | `/privacy` | 1:1 | pending | Not built. |
| `/trip-rating/` | `/faq` | section | decision | |
| `/alternate-payment-methods/` | `/faq` | section | decision | Not in the Feb audit; in the live sitemap. |
| `/travel-agents/` | `/contact` | section | decision | |
| `/forms/` | `/welcome` | fallback | decision | Spanish forms page. Spanish content is decided-needed, phase TBD. |
| `/request-a-catalog/` | `/contact` | section | decision | Catalog requests are an open decision. |
| `/my-trip/` | `/contact` | section | decision | Arctic guest area and inquiry forms were embedded here. The `?%2Finquire%2F…` variants collapse to this row. |
| `/newsletters/` | `/` | section | decision | Newsletter signup lives in the new footer. |
| `/feedbackform/` | `/welcome` | fallback | pending | Fallback page not built yet. |
| `/feedback-thank-you/` | `/welcome` | fallback | pending | |
| `/mediakit/` | `/welcome` | fallback | decision | |
| `/search/` | `/welcome` | fallback | pending | |
| `/sitemap/` | `/welcome` | fallback | pending | |
| `/wp-content/uploads/Forms/USDANDS.pdf` | `/welcome` | fallback | decision | Rehost the USDA statement on the new site or in Sanity before the uploads folder is redirected. |

The Online Store link points at `holiday-river-expeditions.square.site`, not bikeraft.com, so it needs no rule.

## Pre-trip and logistics pages

All eight depend on the open "Getting Here / Before You Go" decision (standalone pages vs. sections on trip pages). Interim targets below.

| Old path | New target | Kind | Status | Note |
|---|---|---|---|---|
| `/packing-list-for-our-multi-day-river-trips/` | `/blog/packing-for-your-trip` | 1:1 | decision | The seeded post covers the same ground. Already 404 on the old site (2026-09-04); rule is optional. |
| `/mountain-biking-and-whitewater-rafting-trip-combination-checklist/` | `/biking` | section | decision | |
| `/green-river-utah-getting-here/` | `/contact` | section | decision | HQ addresses are on the contact page. |
| `/green-river-utah-trips-before-you-go/` | `/faq` | section | decision | |
| `/upper-san-juan-rafting-trips-getting-here/` | `/trips/san-juan-river` | section | decision | |
| `/san-juan-rafting-trips-getting-here/` | `/trips/san-juan-river` | section | decision | |
| `/vernal-utah-getting-here/` | `/contact` | section | decision | |
| `/vernal-utah-before-you-go/` | `/faq` | section | decision | Already 404 on the old site (2026-09-04); rule is optional. |
| `/vernal-utah-trips-before-you-go/` | `/faq` | section | decision | Live but not in the sitemap. The old SEO plan's open Vernal question. |

## Blog: index, categories, patterns

| Old path | New target | Kind | Status | Note |
|---|---|---|---|---|
| `/blog/` | `/blog` | 1:1 | ready | |
| `/resources/` | `/blog` | 1:1 | ready | Old nav label for the blog. |
| `/category/*` | `/blog` | section | ready | Five categories. |
| `/tag/*` | `/blog` | section | ready | |
| `/author/*` | `/blog` | section | ready | |
| `/page/*` | `/blog` | section | ready | Paginated archives. |
| `/feed*` | `/blog` | section | ready | RSS. |
| `/?s=*` | `/welcome` | fallback | pending | WordPress search. |

## Blog posts: one-to-one rows

Posts whose subject has a clear home on the new site. Everything else falls through to the catch-all. Rows targeting a `/blog/<slug>` are `decision` until Holiday confirms which posts are being migrated and under what slug; where the old post is being migrated, the target is its own new slug, not the seeded post.

| Old path | New target | Kind | Status | Note |
|---|---|---|---|---|
| `/packing-for-a-river-trip-how-the-experts-do-it/` | `/blog/packing-for-your-trip` | section | decision | |
| `/what-to-pack-for-your-whitewater-trip-and-how-to-pack-it/` | `/blog/packing-for-your-trip` | section | decision | |
| `/what-to-wear-white-water-rafting/` | `/blog/packing-for-your-trip` | section | decision | In the old SEO plan's consolidation list. |
| `/what-to-bring-wear-white-water-rafting/` | `/blog/packing-for-your-trip` | section | decision | |
| `/if-i-only-knew-then-what-i-know-now-packing-pro-tips/` | `/blog/packing-for-your-trip` | section | decision | |
| `/dutch-oven-cooking-in-the-backcountry/` | `/blog/river-cooking-101` | section | decision | |
| `/coffee-on-the-river/` | `/blog/river-cooking-101` | section | decision | |
| `/astrophotography-the-night-sky/` | `/blog/stargazing-on-the-river` | section | decision | |
| `/the-importance-of-dark-skies/` | `/blog/stargazing-on-the-river` | section | decision | |
| `/when-it-comes-to-light-pollution-red-lights-get-the-green-light/` | `/blog/stargazing-on-the-river` | section | decision | |
| `/through-the-big-drops-in-boats-of-wood-and-steel/` | `/blog/triple-rig-history` | section | decision | |
| `/wait-i-dont-have-to-paddle-the-raft-why-holiday-uses-oar-rafts/` | `/blog/triple-rig-history` | section | decision | |
| `/utah-river-rafting-five-reasons-why-rafting-desolation-canyon-is-cool/` | `/rivers/desolation` | section | ready | Old SEO plan consolidation, retargeted to the new site. |
| `/lodore-from-the-eyes-of-a-guide/` | `/trips/gates-of-lodore` | section | ready | Old SEO plan consolidation. |
| `/five-things-make-lodore-canyon-epic/` | `/trips/gates-of-lodore` | section | ready | |
| `/hiking-guide-gates-of-lodore/` | `/trips/gates-of-lodore` | section | ready | |
| `/photo-journal-colorado-river-through-westwater-canyon/` | `/trips/westwater-canyon` | section | ready | |
| `/insiders-guide-to-floating-the-san-juan-river-in-utah/` | `/trips/san-juan-river` | section | ready | |
| `/understanding-san-juan-river-water-levels/` | `/rivers/san-juan` | section | ready | |
| `/who-wants-to-play-in-the-doll-house/` | `/rivers/maze` | section | ready | The Doll House is in the Maze district. |
| `/insiders-guide-to-rafting-the-colorado-river-through-cataract-canyon/` | `/trips/cataract-canyon` | section | ready | Live but not in the sitemap (noindexed). Old SEO plan consolidation. |
| `/insiders-guide-to-floating-on-the-green-river-through-labyrinth-canyon/` | `/trips/labyrinth-canyon` | section | pending | Live but not in the sitemap. |
| `/insiders-guide-to-biking-utahs-white-rim-trail/` | `/rivers/white-rim` | section | ready | Live but not in the sitemap. Existing WordPress rule sends the "top five reasons" post here. |
| `/the-story-of-dark-canyon-rapid-part-1/` | `/rivers/cataract` | section | ready | Dark Canyon rapid is in Cataract. Old SEO plan flags this post as ranking; consider migrating it 1:1 instead. |
| `/the-story-of-dark-canyon-rapid-continued/` | `/rivers/cataract` | section | ready | |
| `/experience-canyonlands/` | `/rivers/cataract` | section | decision | |
| `/insiders-guide-to-mountain-biking-trips-in-the-san-rafael-swell/` | `/rivers/san-rafael` | section | ready | |
| `/multi-day-mountain-bike-trips-the-best-of-utah/` | `/biking` | section | ready | Old SEO plan flags this post as ranking; consider migrating it 1:1. |
| `/mountain-bike-photography-101/` | `/biking` | section | ready | |
| `/a-comprehensive-guide-to-green-river-rafting/` | `/rafting` | section | ready | |
| `/a-complete-guide-to-colorado-river-rafting/` | `/rafting` | section | ready | |
| `/a-beginners-guide-to-whitewater-rafting-in-utah-and-colorado/` | `/rafting` | section | ready | |
| `/top-10-whitewater-rapids-in-utah/` | `/rafting` | section | decision | Old SEO plan calls this a high-priority post. Migrate 1:1. |
| `/kayak-adventure-holiday-river-expeditions-kayaking-workshop/` | `/specialty` | section | decision | Tied to the kayak workshop question above. |
| `/how-to-plan-a-charter-trip/` | `/contact` | section | decision | |
| `/bachelor-bachelorette-bachelorx-trips-on-the-river/` | `/contact` | section | decision | Charter inquiry. |
| `/how-to-become-a-river-guide/` | `/welcome` | fallback | decision | Follows the employment page decision. |
| `/wilderness-medical-trainings-offered-at-holiday/` | `/welcome` | fallback | decision | Follows the WFA page decision. |
| `/senior-citizen-river-rafting/` | `/trip-finder` | section | decision | |
| `/strengthening-family-bonds-on-multi-generational-trips/` | `/trip-finder` | section | decision | |
| `/family-river-rafting-river-games-splish-splash-and-laugh/` | `/specialty#youth-family` | section | decision | |
| `/things-to-do-around-green-river-utah/` | `/contact` | section | decision | Follows the Getting Here decision. |
| `/green-river-utah-things-to-do-and-places-to-explore/` | `/contact` | section | decision | Same. |
| `/vernal-utah-things-to-do-and-places-to-explore/` | `/contact` | section | decision | Same. |
| `/bluff-and-blanding-utah-things-to-do-and-places-to-explore/` | `/trips/san-juan-river` | section | decision | Same. |
| `/things-to-eat-drink-and-do-in-moab-utah/` | `/trips/westwater-canyon` | section | decision | Same. |

## Blog posts: catch-all

Every post not listed above lands on the fallback page via the catch-all rule in [[redirects]]. The full list from the 2026-09-04 post sitemap is below so Holiday can mark the 20 to 30 posts they want migrated; each one they pick moves up into the table above with its new `/blog/<slug>`.

<details>
<summary>Posts covered by the catch-all (as of 2026-09-04)</summary>

- `/utah-river-rafting-wild-and-scenic-green-river/`
- `/of-legends-and-men-3-years-without-dee/`
- `/six-decades-of-river-rats-celebrate-dee-holladay/`
- `/the-university-of-dee/`
- `/summer-goals-forged-by-the-desert/`
- `/whitewater-dories-rare-birds/`
- `/be-like-roger-lets-theorize/`
- `/whats-in-your-ammo-can-part-two/`
- `/the-sound-of-silence-dinosaur-national-monument/`
- `/the-magic-of-wild-and-scenic-rivers/`
- `/dont-bust-the-crust-what-is-cryptobiotic-soil-and-why-we-need-to-protect-it/`
- `/green-goes-the-running-of-rivers-in-utah/`
- `/water-is-stronger-than-rock-erosion-in-the-american-west/`
- `/katie-woods-the-renaissance-woman-you-want-on-every-trip/`
- `/meet-suze-woolf-facilitator-for-the-womens-watercolor-workshop/`
- `/critters-on-the-river/`
- `/is-whitewater-rafting-scary-simple-ways-to-conquer-your-fears/`
- `/if-i-only-knew-then-what-i-know-now-preparing-pro-tips-ii/`
- `/top-10-health-benefits-of-white-water-rafting/`
- `/river-sentinel-the-great-blue-heron/`
- `/10-epic-river-adventures-your-guide-to-the-best-whitewater-rafting-in-the-us/`
- `/swap-screen-time-for-stream-time-natures-cure-to-burnout/`
- `/rapid-connections-how-rivers-bend-time/`
- `/top-five-reasons-start-planning-river-rafting-vacation/`
- `/river-trip-packing-checklist-for-painters-artists/`
- `/river-workout-how-to-stay-active-on-your-holiday/`
- `/natural-team-building-how-rivers-turn-strangers-into-crews/`
- `/run-it-again-the-joy-of-re-running-rivers/`
- `/the-connection-between-us/`
- `/why-you-should-choose-an-overnight-rafting-trip/`
- `/how-to-stand-up-for-your-public-lands-this-fall/`
- `/gear-review-its-the-balm/`
- `/perfect-utah-road-trip-itinerary-what-to-do-before-and-after-your-adventure/`
- `/colorado-road-trip-ideas-before-or-after-your-holiday-river-trip/`
- `/find-your-flow-and-tap-your-toes/`
- `/the-gift-that-keeps-on-giving-new-year-new-you/`
- `/pat-lynch-the-hermit-of-echo-park-and-the-yampa-river/`
- `/the-role-of-bears-in-the-ecosystem/`
- `/herm-hoops-the-life-of-a-legend/`
- `/colorado-river-agriculture/`
- `/hre-spotlight-belknap-river-guides/`
- `/rhapsody-river-foam/`
- `/an-interview-with-author-melissa-sevigny/`
- `/hre-boat-names-rivers-of-the-colorado-plateau/`
- `/idaho-river-rafting-the-story-behind-lantz-bar-in-the-salmon-river-canyon/`
- `/going-against-the-flow-tracing-the-travels-of-denis-julien/`
- `/water-rights-for-rivers/`
- `/the-wisdom-of-a-river-rat/`
- `/why-a-sarong-is-so-right-for-river-travel/`
- `/collected-river-poems-by-gregory-hobbs/`
- `/utah-desert-springtime-wildflowers-are-here/`
- `/guide-tales-kim-crumbo-humble-legend/`
- `/getting-to-know-the-flaming-gorge-dam/`
- `/buzz-holmstrom-thing/`
- `/colorful-river-characters-salmon-rivers-polly-bemis/`
- `/returning-rapids-project-effects-from-a-dropping-lake-powell/`
- `/recommended-reading-materials-for-white-water-rafting/`
- `/five-romantic-river-activities-love/`
- `/evil-weeds-and-post-apocalyptic-permaculture/`
- `/what-do-river-guides-put-in-their-ammo-can/`
- `/lithium-mining-along-the-colorado-river/`
- `/river-spirits/`
- `/giving-to-living-rivers-an-interview-with-john-weisheit/`
- `/whered-the-salmon-river-get-its-name/`
- `/last-mountain-man/`
- `/5-reasons-to-go-late-season-whitewater-river-rafting/`
- `/colorado-river-ghost-stories/`
- `/how-to-stay-cool-on-your-summer-rafting-adventure/`
- `/pockets-life-living-legacy-desert-potholes/`
- `/top-5-reasons-to-go-river-rafting-in-september/`
- `/william-ashley-pioneer-dinosaur-river-runner/`
- `/the-best-time-to-go-river-rafting/`
- `/flood-cycle-trees/`
- `/costumes-on-the-river/`
- `/river-rafting-solo/`
- `/the-benefits-of-savoring/`
- `/all-about-the-bano-or-how-do-you-go-to-the-bathroom-on-a-river-trip/`
- `/saved-by-the-rodent-beavers-build-hope-for-the-west/`
- `/a-long-distance-connection-on-the-green-river-josie-ben-morris/`
- `/unwritten-histories-remarkable-life-josie-bassett/`
- `/white-tailed-prairie-dogs-suicide-runners/`
- `/the-story-behind-john-wesley-powells-boat-names/`
- `/colorado-river-songs/`
- `/foot-rot-avoid-it-at-all-costs/`
- `/social-trails-how-they-form-and-why-they-are-harmful/`
- `/clear-the-path-free-the-snake-the-fight-of-idahos-salmon/`
- `/trees-desert-pinyon-vs-juniper/`
- `/idaho-river-rafting-the-confluence-of-two-of-idahos-greatest-rivers/`
- `/some-of-our-favorite-river-quotes/`
- `/steelhead-rainbow-trout-and-the-river/`
- `/wild-woman-whitewater-story-georgie-white/`
- `/my-trip-down-the-zambezi-river/`
- `/eddied-out-going-against-the-flow/`
- `/a-little-natural-history-bighorn-sheep/`
- `/connecting-rivers-and-mountains/`
- `/seven-river-songs/`
- `/top-10-adventure-influencers-to-follow-on-instagram/`
- `/hope-dark-hope-behind-dam/`
- `/ownership-utah-riverbeds-explained-monty-python/`
- `/anatomy-of-a-drying-river/`
- `/its-all-good-in-the-hoodie/`
- `/susan-munroes-book-recommendations-the-weekly-worm/`

</details>

## Existing WordPress redirects (verified 2026-09-04)

Holiday already maintains redirects on the old site. Each of these currently points at another **bikeraft.com** page, so at cutover it becomes a two-hop chain unless the rule is retargeted to the new site. Rows marked "retarget" above cover the ones that are also in the audit; the rest are listed here so Karen's export can be reconciled against the map. Ask Karen for the full rule list from the redirect tool; this is only what a spot check found.

| Old path | Currently redirects to (bikeraft.com) | Should become |
|---|---|---|
| `/top-five-reasons-to-bike-the-white-rim-trail/` | `/insiders-guide-to-biking-utahs-white-rim-trail/` | `/rivers/white-rim` |
| `/green-river-rafting-through-desolation-canyon-trip-reviews/` | `/reviews/` | `/rivers/desolation` |
| `/green-river-rafting-through-lodore-canyon-trip-reviews/` | `/reviews/` | `/trips/gates-of-lodore` |
| `/yampa-river-rafting-holiday-river-expeditions-trip-reviews/` | `/reviews/` | `/rivers/yampa` |
| `/grand-canyon-trips-before-you-go/` | `/grand-canyon-rafting/` | same as `/grand-canyon-rafting/` (decision) |
| `/contact-us/` | `/contact-holiday-river-expeditions/` | `/contact` |
| `/boats-buddha-and-the-blues-cataract-canyon-with-bad-brad-wheeler/` | `/utah-white-water-rafting/cataract-canyon/` | `/trips/cataract-canyon` |
| `/specialty-river-rafting-trips/meditation-and-sound-baths-on-the-green-river/` | `/boats-buddha-…/` (already a chain) | `/trips/cataract-canyon` |
| `/lodore-canyon-rafting-and-yoga-with-seek-studio/` | `/womens-river-rafting-yoga-trip/` | `/specialty#womens` |
| `/affinity-based-trips/lgbtq-westwater-canyon-family-rafting-trip/` | `/affinity-based-trips/` | `/specialty#affinity` |
| `/music-river-rafting-trips-in-ut-co/pickpockets-bluegrass-band-on-the-green-river/` | `/dark-sky-stargazing-trip-series/lodore-canyon-stargazing-trip/` | `/specialty#stargazing` |
| `/my-trip?%2Finquire%2Frequest-a-catalog` | `/my-trip/?%2Finquire%2Frequest-a-catalog` | `/contact` (decision) |

Three audit URLs already return 404 on the old site and are noted inline: `/national-parks/`, `/packing-list-for-our-multi-day-river-trips/`, `/vernal-utah-before-you-go/`.

## Catch-all

| Old path | New target | Kind | Status | Note |
|---|---|---|---|---|
| `/*` | `/welcome` | fallback | pending | Last rule. Enabled only at cutover, after the exclusions in [[redirects]] and both bikeraft.com blockers are cleared. |

## Related

- [[redirects]] — strategy, per-domain rules, cutover order
- [[site-audit]] — February inventory of the old site
- [[architecture]] — the new site's routes
- [[environments]] — production cutover checklist
