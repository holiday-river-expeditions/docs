# Trip Finder

A plain-English guide to the "Find Your Trip" wizard: what it is, which parts Holiday can change in the Studio, which parts need a developer, how it decides on a trip, and where its information comes from. The technical notes for developers are at the end.

**The short version:** a visitor answers a few questions and the site picks the trip it thinks fits best, plus two runners-up. The questions, the answer buttons, the photos, and how much each question counts all live in Sanity under **Trip Finder**, so Holiday can rewrite them at will. The facts about each trip that the matcher compares against live on each Trip document's **Trip Finder** tab. The arithmetic that turns those into a score is code.

## 1. What it is and how to see it

The wizard lives at [/trip-finder](https://website-phi-six-25.vercel.app/trip-finder). Each question is a full-screen photo with a handful of answer buttons and a skip link. Every answer button is an ordinary link that adds one word to the page address, so a half-finished wizard can be shared, the browser's Back button works, and it needs no JavaScript.

It is live for every visitor: the homepage has a "Find Your Trip" band with the first question already on it, a floating "Find Your Trip" pill follows visitors around the site, and the homepage hero button goes wherever the Studio's Homepage → Hero CTA Link points (set it to `/trip-finder` to send people straight in).

## 2. What Holiday can change without a developer

### The questions: Studio → Trip Finder

The Studio sidebar has a pinned **Trip Finder** entry (next to Homepage and Site Settings). It holds the whole wizard in order. Drag questions to reorder them. Remove one and it simply is not asked.

Each question has:

- **Kind.** Which built-in matcher the question feeds. There are six: Who's coming, Youngest age, Rafting or biking, Month, Trip length, Whitewater. Each kind can be used once. This is the only thing that ties a question to code, so it is the one field to leave alone unless you know why you are changing it.
- **Question, Hint line, Short label, Skip button text, Ethos line.** The words on the screen. The short label is what shows in the running trip log ("Youngest: 8–12").
- **Background photo** with alt text. Landscape, at least 3000 pixels wide, hotspot set on the subject.
- **Weight.** How much the question counts toward the pick, 1 to 5. Today the whitewater and age questions weigh 3 and the rest weigh 2.
- **Only ask when… / Skip when…** Two optional rules. "Only ask when Who's coming is kids" makes the age question a follow-up that appears only for families. "Skip when Rafting or biking is bike" hides the whitewater question from bikers. You can change both.
- **Answers.** The buttons, in order. Each has a label, an optional hint, an optional hint shown once the visitor picked biking, a short **Value** that goes into the page address, and one **dial**.

The dial is the number that tells the matcher what the answer means. It changes with the question's kind:

| Kind | Dial | Example |
| --- | --- | --- |
| Whitewater | Target rapid class, 1 to 5 | "Some splash" is 3, "Big whitewater" is 4.5 |
| Youngest age | Youngest guest in years | "8–12" is 8 |
| Trip length | Ideal number of days | "The classic" is 5 |
| Month | The month | "July" is 7 |
| Rafting or biking | A Trip Type document | "Rafting" points at the Rafting trip type |
| Who's coming | none | Only used by the "Only ask when" rule |

Publishing the Trip Finder document updates the test site within a minute, like any other content.

### The facts about each trip: Trip → Trip Finder tab

The matcher compares each answer against facts on the Trip document. These sit on the **Trip Finder** tab (and a couple on Quick Facts and Basics):

| Field | What the matcher does with it |
| --- | --- |
| Trip Type (Basics) | Rafting, Biking, or Combo. A Combo trip scores most of the way for either answer. |
| Duration in days | Compared with the trip-length answer. |
| Minimum Age (Quick Facts) | Compared with the youngest-guest answer. A trip whose minimum the youngest guest fails sinks below every trip that passes. |
| Minimum Age Overrides | Months where the minimum differs, such as Cataract being 8 but 16 in May and June. |
| Max Rapid Class | Compared with the whitewater answer. Also shows in the quick facts bar. |
| Season (months) | Which months the trip runs. Compared with the month answer. |
| Craft Types | If a trip offers two or more boats including an inflatable kayak, it earns a small bonus on the whitewater question because guests can pick their own thrill level. |
| Arctic Trip ID (Booking) | Links the trip to Arctic so the results can show the next open date. Not used for matching. |

Leaving a field empty is safe. The matcher treats a missing fact as unknown and scores it in the middle rather than ruling the trip out. But a trip with empty fields cannot win on those questions either, so filling them in is how a trip starts showing up as a match.

**The values on the six current trips are placeholders** entered by Darius to get the wizard working. Minimum ages for Westwater, Lodore, and Yampa and the Yampa season window in particular need Holiday's confirmation.

## 3. What still needs a developer

- **A new kind of question.** "What's your budget?" would need new arithmetic and a new trip field to compare against. Anything else about a question is editable.
- **The arithmetic.** How a dial plus a trip fact becomes a score (section 4). Five small formulas, kept in code on purpose so a typo in the Studio cannot silently break matching.
- **The safety net.** The site keeps a built-in copy of today's questions. If the Trip Finder document is ever empty or invalid, the wizard uses that copy instead of showing a blank page, and the logic panel says so.

## 4. How a pick is made

In words: every question the visitor actually answered gives each trip a score from 0 to 1. Those scores are averaged, with heavier questions counting more. Skipped questions are left out entirely, so skipping never hurts a trip. The highest average is the best match and the next two are the runners-up. If even the best score is low, the page stops calling it a "Best Match" and leads with the phone number instead.

The numbers, for anyone who wants them:

- **Whitewater:** 1 minus the distance between the target class and the trip's Max Rapid Class, divided by 3. A target of 3 against a Class IV trip scores 0.67. Two or more craft types including an inflatable kayak add 0.15.
- **Youngest age:** 1 if the trip's minimum age (for the chosen month, if any) allows the youngest guest, otherwise 0, and the trip drops below every clean fit.
- **Trip length:** 1 minus the distance between the ideal days and the trip's duration, divided by 3.
- **Month:** 1 if the trip runs that month, 0.4 if it runs the month before or after, otherwise 0.
- **Rafting or biking:** 1 for a matching trip type, 0.7 for a Combo trip, 0.2 for the wrong type. Never 0, so a mismatch is still ranked rather than hidden.
- **Unknown facts** score 0.5.
- **Ties** go to the trip with more known facts, then alphabetically.
- **Best Match threshold** is 0.35 (Studio → Trip Finder → Tuning). The page also needs at least two real answers before it will claim a best match.
- **Results shown** is 3 (same Tuning tab).

## 5. Where the information comes from

| | Sanity | Arctic Reservations |
| --- | --- | --- |
| Supplies | The questions and every fact the matcher reads | The next open departure date and seats left, shown on each result |
| Affects the ranking | Yes, entirely | No, never |
| Joined on | | The trip's Arctic Trip ID, matched to Arctic's trip type id |
| If it is down | The wizard falls back to the built-in questions | The results still render, with the phone number in place of dates |

Both are read fresh on every visit, in parallel. Pages are cached for 60 seconds, and a Studio publish clears the cache immediately, so edits appear within about a minute.

## 6. The logic panel

For anyone who wants to see the reasoning rather than take it on trust, there is a panel that shows it. Turn on **Trip finder logic panel** in the demo panel ([[demo-panel-guide]]) and open the wizard. Under every question and under the results you will see:

- where the questions came from (the Studio document, or the built-in fallback);
- what the visitor has answered so far, what each answer asks the matcher for, and which rules are in play;
- every trip in the catalog in ranked order, each expandable into a per-question table of what was asked for, what the trip's fact is, the score, and the reason line;
- which facts came from Sanity and what Arctic returned;
- which trips are missing facts, as a to-do list;
- the settings in use.

Because every answer is a link, the panel updates with each click.

## 7. Known gaps

- All six trips carry placeholder matching values (section 2).
- Only six trips are in Sanity. The other twenty or so bookable Arctic trips do not exist on the site yet, so the wizard is choosing among six.
- Two facts are written twice: **Season** (words, on Quick Facts) and **Season (months)** (numbers, on Trip Finder), and likewise **Duration Label** and **Duration**. The words are what visitors read and the numbers are what the matcher uses. Keep them in step by hand.
- Ideas from the 2026-08-27 sync not yet built: a default fallback trip (3-day Westwater) when nothing fits, letting a visitor pick more than one answer, and specialty trips as a matching signal.
- The panel's markup ships to every visitor and is hidden by a style rule, like every demo switch. That is fine on the unlisted test site and worth a second look before a real domain goes live.

## Technical notes

- Questions: Sanity document type `tripFinderSpec` (singleton, `website/src/sanity/schemas/trip-finder-spec.ts`), read by `tripFinderSpecQuery`, validated with Zod and normalised in `src/lib/trip-finder-spec.ts`. `resolveTripFinderSpec()` returns the live spec or `DEFAULT_TRIP_FINDER_SPEC` from `src/lib/trip-finder.ts`, and never throws.
- Logic: `src/lib/trip-finder.ts`. Pure functions, every one taking the spec first: URL parsing, step and progress rules, `scoreTrips()`. The formula constants are the exported `SCORING` object. Each `TripMatch` carries a per-question `breakdown`.
- Route: `src/app/trip-finder/page.tsx`, ISR with `revalidate = 60`. Fetches the spec and the catalog on every step, and Arctic departures only on results.
- Components: `TripFinderWizard`, `TripFinderResults`, `TripFinderEntry` (homepage), `TripFinderFab` (floating pill, the only client component), `TripFinderLogicPanel` (gated by the `finder-logic` flag). The `trip-finder` entry-point flag was retired 2026-09-04.
- Seed: `scripts/seed-trip-finder-spec.mjs` writes the singleton from the in-code default and uploads the background photos. Run with `node --experimental-strip-types`. Idempotent.
- Tests: `src/lib/trip-finder.test.ts`, `src/lib/trip-finder-spec.test.ts`, `src/components/ui/TripFinderLogicPanel.test.tsx`, `src/app/trip-finder/page.test.tsx`, `e2e/trip-finder.spec.ts`, and two entries in `e2e/a11y.spec.ts`.

## Related

- [[demo-panel-guide]] — turning on the logic panel
- [[sanity-editor-guide]] — the Studio in general, and the Trip document's tabs
- [[architecture]] — where the route and the content models sit
- [[arctic-api-endpoints]] — the Arctic calls behind the availability line
