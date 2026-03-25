# Arctic Integration — Competitor Analysis

> How other outfitters integrate Arctic Reservations into their websites. Research conducted 2026-03-05 to inform Holiday's checkout design.

## Context

Holiday's current site (bikeraft.com) uses Arctic Reservations via iframe — slow, bad for SEO, poor UX. The new site will use a **cart + handoff** approach: native UI for browsing/selection, Arctic cart API to build the order, then redirect to Arctic's checkout for payment. This research looks at how peer outfitters handle the same problem.

Justin (Holiday's content manager) flagged OARS and ARTA as the best examples. Findings below.

## ARTA River Trips (arta.org) — Best Arctic iframe integration

**Trip browsing:**
- Card-based layout: river name, duration, difficulty (e.g., "Class III"), starting price, hero image
- Organized by region (Oregon, California, Idaho, Utah & Colorado) and experience type (Multi-day, Single-day, High Adventure, Group, Specialty)
- Each card has "Book Now" and "Learn More" buttons

**Arctic integration:**
- Embeds Arctic's scheduling/pricing widget (`#arctic-iframe` / `.schedule-pricing-iframe`) directly on trip detail pages
- Guests select dates and begin booking without leaving the page
- The iframe sits inline alongside trip content — not a popup or separate page
- Pointer events and scroll anchoring are handled to make the iframe feel native
- Sticky/fixed positioning keeps the booking widget accessible while scrolling

**Guest portal:**
- `reservations.arta.org` — Arctic's guest-facing site for managing existing reservations
- Login via personalized email link (no account creation required)
- Group organizers invite others who create sub-reservations, fill out their own forms, and pay individually

**Takeaway:** ARTA does the iframe approach well. The inline schedule/pricing widget on trip pages is the key UX win — guests see availability in context. But it's still an iframe, so styling is limited and the experience breaks on smaller screens.

## OARS (oars.com) — Likely NOT using Arctic

**Trip browsing:**
- WordPress with mega-menu navigation
- Trip detail pages show dates in a tabbed interface (e.g., "13 Days" / "14 Days")
- Departure dates and prices listed chronologically by year
- Strong "Request More Info" form (Gravity Forms) alongside booking

**Booking flow:**
- "Book Now" links to a custom OARS reservation platform (`oars.com/gc-res/...`) — not Arctic
- OARS has been documented using TourTools for booking since at least 2012
- No Arctic Reservations iframe, widget, or branding visible anywhere on the site

**Takeaway:** OARS is not an Arctic reference. Justin may have been thinking of a different outfitter, or OARS may use Arctic for back-office operations only. Worth clarifying with him. That said, OARS's tabbed date display and "Request More Info" form alongside "Book Now" is a good UX pattern to consider.

## Arizona Raft Adventures (azraft.com) — Arctic guest portal on subdomain

**Trip browsing:**
- Comparison-focused: four adventure categories (Classic, Motor, All-Paddle, Specialty)
- Strong "Compare Rafting Trips" page for side-by-side evaluation
- Duration (6–16 days), difficulty, and age requirements on each trip

**Booking flow:**
- Primary CTA is phone booking (800-786-7238) — no visible Arctic iframe or widget on the main site
- "Shop" link in header navigation

**Arctic guest portal:**
- `mytrip.azraft.com` — separate Arctic-powered site
- Branded in Arizona Raft's colors (burgundy accents on white)
- Two entry points: "Browse Trips" for new bookings, login for existing reservations
- Guests can browse trips, manage reservations, complete registration, submit waivers, access trip documents (maps, packing lists)
- Clean, professional UI with live chat support

**Takeaway:** Arizona Raft keeps Arctic completely separate from their marketing site. The guest portal is well-branded but lives on its own subdomain. This is the most common Arctic pattern — and the one Holiday currently uses (poorly). Their trip comparison page is worth studying for our trip finder UX.

## Other Arctic Clients

From Arctic's client reviews page:
- **Wet Planet Whitewater** (White Salmon, WA) — "The online reservation module is awesome, simple, and well organized!"
- **Rivers and Oceans** (Flagstaff, AZ) — Uses Arctic for automated guest communication
- **Northwest Rafting Company** (Hood River, OR) — Takes online payments and collects customer info through Arctic
- **River Drifters** (Maupin, OR), **Mild to Wild** (Durango, CO), **Steamboat Powdercats** (Steamboat Springs, CO) — also Arctic clients

## Arctic's Integration Options

From Arctic's own documentation:

1. **Full guest site iframe embed** — Embed the entire Arctic guest-facing site in an iframe on a dedicated page (e.g., "/reservations"). Arctic handles all booking, registration, and payment. Customizable fonts/colors. Requires SSL and PCI compliance.
2. **Single landing page iframe** — Embed just one piece (e.g., a specific trip's booking widget) rather than the full portal.
3. **API integration** (Summit Edition only) — Build a custom front-end against Arctic's REST API. This is what Holiday is doing.

## Implications for Holiday

Holiday's planned approach — native UI for browsing/selection, Arctic cart API, styled checkout popup — goes further than any competitor we found:

| | Holiday (planned) | ARTA | Arizona Raft | Holiday (current) |
|---|---|---|---|---|
| Trip browsing | Native (Next.js + Sanity) | Native (WordPress) | Native (custom) | Native (WordPress) |
| Date/availability | Native UI via Arctic API | Arctic iframe inline | Phone/email | Arctic iframe |
| Cart building | Arctic cart API | Arctic iframe | Phone/email | Arctic iframe |
| Checkout/payment | Arctic popup (styled) | Arctic iframe | Phone/email | Arctic iframe |
| Guest portal | TBD | Arctic subdomain | Arctic subdomain | Arctic subdomain |

**Key design decisions this informs:**
- The inline schedule/pricing widget (ARTA's approach) is the UX bar to beat — guests should see availability without leaving the trip page
- Our native implementation should match or exceed ARTA's inline experience since we're building against the API directly
- Trip comparison (Arizona Raft's pattern) is worth considering for our trip finder
- "Request More Info" alongside "Book Now" (OARS pattern) is a good fallback for high-consideration trips like multi-day Grand Canyon runs
- The checkout popup needs careful styling via Arctic's Custom HTML Header to feel native

## Sources
- [OARS](https://www.oars.com/)
- [ARTA River Trips](https://www.arta.org/)
- [Arizona Raft Adventures](https://azraft.com/)
- [Arizona Raft Guest Portal](https://mytrip.azraft.com/)
- [Arctic Reservations](https://www.arcticreservations.com/)
- [Arctic Features](https://www.arcticreservations.com/features.php)
- [Arctic Client Reviews](https://www.arcticreservations.com/reviews.php)
- [Arctic iframe Embedding Guide](https://support.arcticreservations.com/index.php?pg=kb.page&id=190)

## Related
- [[arctic-api]] — Holiday's Arctic API integration plan
- [[design-review]] — Current site analysis
- [[open-decisions]] — Payment processing decision (resolved: cart + handoff)
