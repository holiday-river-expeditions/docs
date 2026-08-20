# Domain Name Research

> **Superseded — the domain is now `holidayriver.com`.** This file records the February 2026 research, whose central finding about `holidayriver.com` ("connection refused, would require acquisition") was overtaken on **2026-04-09 when Lauren purchased holidayriver.com** (see [[2026-04-09-homepage-mockups-review]]). The recommendation below for `holidayriverexpeditions.com` rested entirely on `holidayriver.com` being unavailable, so it no longer holds. Kept for the alternatives evaluation and the SEO reasoning, both of which are still useful. Current decision: [[open-decisions#Domain]].

## Decision (2026-04-09): holidayriver.com

Short, memorable, and now owned outright. `holidayriverexpeditions.com` is also owned and becomes a redirect to it, alongside `bikeraft.com`.

---

## Original Research (2026-02-11)

### Recommendation at the time: holidayriverexpeditions.com

Based on research conducted 2026-02-11, `holidayriverexpeditions.com` was the best *available* option — because `holidayriver.com` appeared unobtainable.

### Findings

#### holidayriverexpeditions.com
- **Already owned by Holiday** — at the time, redirected (301) to bikeraft.com
- Exact brand-name match for SEO and recognition
- Matches third-party listings on TripAdvisor, Yelp, Google, and adventure.travel
- Zero acquisition cost or risk

#### holidayriver.com
- ~~Connection refused — likely registered by a third party but inactive~~
- ~~Would require acquisition (cost and outcome uncertain)~~
- ~~Shorter, but sacrifices brand clarity~~
- **Acquired 2026-04-09 by Lauren.** The registration was indeed inactive and the acquisition succeeded. This is now the primary domain.

### Other Alternatives Considered

None of these were owned and all would have required acquisition.

**Short & clean**
- `holidayexpeditions.com` — drops "river" so less brand-specific; could work but loses geographic identity
- `holidayrivers.com` — plural feels off for a single-company brand; potential confusion with the singular

**Descriptive / action-oriented**
- `holidayrivertrips.com` — clear intent, decent SEO for "river trips"; slightly generic
- `holidayrafting.com` — strong for rafting SEO but excludes non-rafting trips (hiking, horseback)
- `floatholiday.com` — creative, but not immediately recognizable as Holiday River Expeditions
- `raftholiday.com` — same issue as above; sounds like a generic activity rather than a brand

**Modern / brandable**
- `holidayriver.co` — short and clean; `.co` is less trusted by some audiences and easy to mistype as `.com`
- `holidayriver.travel` — industry-relevant TLD; less familiar to general consumers
- `holidayriver.adventures` — descriptive TLD; long overall and uncommon extension

**With prefix/suffix**
- `goholidayriver.com` — action-oriented; "go" prefix is a proven pattern (e.g., godaddy); adds length
- `holidayriverco.com` — clean, modern feel; risk of confusion with `holidayriver.co`

## SEO Reasoning (still applies)

The branded-search argument that favored an exact-match domain now works in `holidayriver.com`'s favor too, since `holidayriverexpeditions.com` redirects to it and preserves the exact-match signal:

1. **Exact brand match** — customers searching "Holiday River Expeditions" land on the brand's own property either way
2. **SEO advantage** — branded searches resolve to one canonical destination
3. **Professional and trustworthy** — fits a company with 60+ years of history

## Additional Notes

- `bikeraft.com` and `holidayriverexpeditions.com` both become 301 redirects to `holidayriver.com`
- Moving the primary domain off `bikeraft.com` aligns with the brand pivot away from biking toward rafting-first positioning
- All existing third-party profiles (TripAdvisor, Yelp, Google Business) already reference "Holiday River Expeditions" by name — worth updating their linked URLs at cutover
- ⚠️ The old site is still a live dependency: `bikeraft.com` serves interim trip/river photos (see [[photo-upload-checklist]]) and Arctic's `onlinebookingurl` still points at bikeraft.com's reserve flow (see [[arctic-api]]). Both must be resolved **before** bikeraft.com is redirected or torn down.

## Related
- [[open-decisions]] — Domain decision status
- [[environments]] — Production cutover checklist
