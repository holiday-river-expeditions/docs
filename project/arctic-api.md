# Arctic Reservations Integration

## Overview
Holiday River currently uses Arctic Reservations for booking, embedded as iframes in the WordPress site. The iframes are slow, bad for SEO, and provide a poor user experience. We're replacing them with a native UI built against the Arctic REST API.

## API Details

- **Base URL**: `/api/rest/`
- **Auth**: OAuth 2.0 — two options:
  - User-based OAuth 2.0 (authorization code flow)
  - Installation API keys (server-to-server — Client ID/Secret + API username/password)
- **Public (unauthenticated) API**: Trip search, availability queries, booking initiation — used by their JavaScript widget
- **Authenticated API**: Scoped by access level — some endpoints are read-only, others are read/write (see Access Scopes below)

## Key Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/api/rest/trip` | Trip/tour management |
| `/api/rest/triptype` | Trip type definitions |
| `/api/rest/trippricing` | Trip pricing levels |
| `/api/rest/tripaddon` | Trip add-ons |
| `/api/rest/reservation` | Reservation management |
| `/api/rest/person` | Guest management (nested: emailaddress, phonenumber, notes) |
| `/api/rest/schedule` | Guide/trip schedules *(out of scope for current build)* |
| `/api/rest/guide` | Guide management *(out of scope for current build)* |
| `/api/rest/rental` | Rental equipment |
| `/api/rest/invoice` | Invoice management |
| `/api/rest/evaluation` | Evaluation/survey responses |
| `/api/rest/inquiry` | Inquiry management |
| `/api/rest/account` | Account information |

## Developer Resources

- GitHub org: https://github.com/arcticres
- PHP/JS wrapper: https://github.com/arcticres/arctic-api
- API docs (early stage): https://github.com/arcticres/arctic-api-docs
- Wiki: https://github.com/arcticres/arctic-api/wiki
- Packagist: https://packagist.org/packages/arctic/arctic2api (PHP, v1.0.0)
- Support: https://support.arcticreservations.com/
- API Explorer (logged in): `https://holidayriver.arcticres.com/api/rest/trip`

## Support Policy

- Arctic's **built-in integrations** (e.g., the first MailChimp integration) are supported by Arctic — they maintain these.
- **Custom API integrations** (anything we build) are **unsupported**. The API is available as part of the Summit Edition, but Arctic does not support the connections or applications built on it. It's our responsibility to troubleshoot and maintain.
- Arctic provides guidance on available endpoints but not implementation support.
- **Implications for us**: We need robust error handling, monitoring, Zod validation on all responses, and resilient fallback UI since we can't rely on Arctic for debugging.

## Credential Setup

Self-service — no need to contact Arctic support.

1. Go to **Settings > API Access** and click the pencil icon next to **Manage API Clients**
2. On the Browse API Clients page, click the green **"+ Create API Client"** button
3. Enter a **name** for the client and set **Enable** to yes
4. Select the **access level**:
   - **Administrator (System-Wide)** — full read/write (default, recommended by Arctic for most use cases)
   - **User** — read/write on most endpoints, scoped to standard user permissions
   - **Read-only** / **Read-only with Financial Data** — strictly read-only across all endpoints (no write access on any endpoint, including persons, reservations, tasks, and inquiries)
5. Click **Submit**
6. Arctic will display credentials for both **Basic** and **OAuth 2.0** connections
7. **Save credentials immediately** — passwords are shown only once and cannot be retrieved later

### Access Scopes

> **Correction (2026-02-16):** Per Morgan at Arctic support, "Read-only" access levels (including Read-only with Financial Data) are **strictly read-only** across all endpoints — no write access at all. At least **User level** access is required for any write operations.

**Read-only / Read-only with Financial Data:**
- Read-only across all endpoints (trips, persons, reservations, invoices, etc.)
- No write access on any endpoint — viewing only

**User:**
- Read/write on most endpoints (persons, reservations, tasks, inquiries, etc.)
- Sufficient for the cart-building booking flow (write cart items, persons, reservations)
- Cannot write activities (the `activity` endpoint is read-only even at higher access levels)

> **Note:** "User" here refers to an API client permission tier configured in Arctic's admin panel (Settings > API Access), not a guest-facing account. The `hre-website` API client authenticates server-to-server via OAuth 2.0 — website visitors never interact with Arctic directly. Our Next.js API routes proxy all Arctic communication. No Arctic account creation is required for guests.

**Administrator (System-Wide):**
- Full read/write across all endpoints

## Integration Approach

1. **Server-side API proxy** — Next.js API routes proxy Arctic API calls, keeping credentials secure
2. **Trip sync** — Pull trip data from Arctic on build + ISR (Incremental Static Regeneration) for freshness
3. **Open seats** — Server component fetches real-time availability, displays dynamically
4. **Booking flow** — Hybrid approach: native UI for browsing/selection, Arctic handoff for checkout
   - Step 1: Select dates & party size (our UI)
   - Step 2: Choose add-ons (our UI)
   - Step 3: Add items to Arctic cart via API
   - Step 4: Hand off to Arctic for guest info, pre-purchase questions, payment & confirmation (popup/new window, styled via Arctic's Custom HTML Header)
5. **Trip detail pages** — Link Arctic trip ID to Sanity content so CMS content + live availability display together

## Integration Strategy

### API Client

| Client | Access Level | Purpose |
|--------|-------------|---------|
| `hre-website` | User | All website needs: trip sync, availability, cart-building, guest management |

Rationale: **User level** is the minimum access that enables write operations. We need write access for the cart-building booking flow (add items to cart, create/update persons and reservations). Read-only levels don't allow any writes. Administrator is more access than we need — User level is sufficient and avoids unnecessary privilege.

### Resilience (since integration is unsupported)

- **Zod validation** on all API responses to catch undocumented schema changes
- **Retry with exponential backoff** for transient failures
- **Fallback UI** ("Contact us for availability") when API is unreachable
- **Next.js ISR caching** to reduce API call volume and survive brief outages

### Phase 3 Sequence

1. Create API client in Arctic admin (`hre-website`, User level)
2. Store credentials in Vercel env vars (`ARCTIC_*`)
3. Build typed API client in `src/lib/arctic/`
4. Read-only endpoints first (trips, availability)
5. Open seats page
6. Cart-building flow (add items to cart, create persons/reservations via API)
7. Arctic checkout handoff (popup/new window styled via Custom HTML Header)

## Booking Flow Options

Per Morgan at Arctic support (2026-02-16), the API **cannot process payments** and **cannot write activities**. Two checkout approaches:

1. **Cart + handoff (preferred)**: Use API to add items to a cart, then send guest to Arctic's checkout page to complete payment. Can open in a popup/new window styled to feel like Holiday via Arctic's Custom HTML Header (Settings > Guest-facing Sites > Settings).
2. **Direct handoff**: Guest picks a date on our site, then goes to Arctic iframe to add guests, answer pre-purchase questions, and complete checkout.

**Decision: Option 1 (cart + handoff).** This gives us the most control over the browsing/selection experience while letting Arctic handle payment securely.

## Guide Info — Out of Scope

Lauren confirmed Holiday doesn't use Arctic's guide system for operations. Tim Gaylord would need to buy in before guide features become relevant. Guide/schedule endpoints remain available in the API for future use but are **not part of the current build**.

## Sandbox / Testing

No sandbox environment available. A secondary dev installation would cost $489/mo and require building out test data — not worth it. Arctic recommends using a "test" trip that isn't an actual offering.

**Our approach:** Mock Arctic responses in tests, focus test coverage on Holiday-side logic. Optionally use a test trip in Arctic for manual/integration testing.

## Activities

The `activity` endpoint is **read-only** even at higher access levels — cannot write activities via API. Activities are managed by Holiday staff in the Arctic dashboard. No admin features for activities on the website.

## Action Items

- [x] ~~Contact Arctic Reservations support to obtain API credentials~~ — resolved: self-service via Settings > API Access
- [x] ~~Confirm whether Arctic handles payment processing or if we need Stripe on our side~~ — resolved: Arctic does not handle payment via API. Checkout hands off to Arctic (cart API + redirect). No Stripe needed.
- [x] Create API client in Arctic admin (`hre-website`, User level) — done 2026-08-10 (Darius); OAuth credentials in `.env.local`, Basic set saved as fallback
- [x] Test API endpoints to understand response shapes — done 2026-08-10 against the live API (see Verified API Behavior below)
- [x] Build typed API client in `src/lib/arctic/` — done 2026-08-10 (read-only slice)
- [ ] Add `ARCTIC_*` env vars to Vercel (paste raw values — no escaping needed there, unlike `.env.local`)
- [ ] Test Arctic Custom HTML Header for checkout popup styling (cart phase)

## Verified API Behavior (live, 2026-08-10)

Everything below was confirmed against `holidayriver.arcticres.com`, not just the docs:

- **Token endpoint**: `POST /api/rest/oauth/application/token`, form-encoded body `client_id, client_secret, grant_type=password, username, password`. **The response is form-encoded too** (`access_token=...&token_type=bearer&expires_in=3600&refresh_token=...`), not JSON. `expires_in` is 3600s.
- **Requests**: `Authorization: Bearer <token>`, `Accept: application/json`. A 403 means the token expired — re-auth and retry once (mirrors Arctic's own PHP wrapper).
- **List envelope**: `{start, page, number, total, entries: [...]}`. Errors come as `{error, details}`, sometimes with HTTP 200.
- **Query language works as documented**: `GET /api/rest/trip?query=triptypeid IN (37, 38) AND orenable = TRUE AND canceled = FALSE AND start >= "2026-08-10" ORDER BY start`.
- **`trip` = a departure** (start date, `openings`, `remainingopenings`, `onlinebookingurl`); **`triptype` = the product** ("Cataract Canyon 5 day"). Sanity's `arcticTripId` holds trip-**type** id(s), comma-separated when one page covers several variants (e.g. `"37,38"` for Cataract 5-day + 6-day). Mapping for all 6 seeded trips set 2026-08-10.
- **`orenable` on a departure marks it publicly bookable.** Private charters carry `orenable = false` — filtering on `orenable = TRUE` hides them. A charter Holiday enables for online booking (e.g. the Chamberlain charter) shows up, which is correct: the site mirrors Arctic config.
- **`onlinebookingurl`** currently points at bikeraft.com's `/my-trip?%2Freserve%2Ft<id>-<slug>` reserve flow — used as the interim per-departure Book link until our cart + handoff replaces it.
- **`.env.local` gotcha**: Next's dotenv parser treats `#` as a comment and expands `$VAR` (even in single quotes, via dotenv-expand). Secrets containing either must be double-quoted with `\$` escapes. Documented in `.env.example`. Vercel env vars take raw values — do NOT escape there.

## Verified Cart API Behavior (live probe, 2026-08-10, approved by Darius)

Full cart lifecycle exercised against production (test cart created + emptied; carts are abandonable and hold no seats):

- **Guest site base**: `https://holidayriver-guest-site-1.arcticres.com` (discovered from the iframe embed on bikeraft.com/my-trip; the plain `holidayriver.arcticres.com` origin 302s guests to an admin login). Direct non-iframe paths work: `/reserve/t{id}-{slug}` → redirects to `/reserve/t{id}-{slug}/{id}/book`.
- **Pricing levels**: `GET /api/rest/triptype/{id}/pricinglevel` (sub-resource — the flat `/api/rest/trippricing` endpoint 404s). Entries: `{id, name ("Adult"), description ("Adults 19-64"), uniquename ("DS5day Regular Rate"), amount ("1680.00"), showonline, deleted, default, invoicesubitems[]}` — subitems carry fees (e.g. $2 State Fee).
- **Cart form field names**: `pl_` + slugified `uniquename` (lowercase, runs of non-alphanumerics → `_`): `pl_ds5day_regular_rate=2`. NOT the numeric level id — `pl_{id}` fails with `add_failed` "Please provide the guest and/or add-on counts".
- **Book**: `POST {guest}/reserve/api/book/{departureId}` form-encoded → `{success, cart: {id, sessid, createdon, lastactivity}, item: {id, name, description, summary(html), image, is_available, is_ready, quantity, cost}, checkout, interstitial}`. `cost` includes fees/taxes (1325.00 base → 1449.31). `checkout` and `interstitial` are ready-made URLs carrying the sessid.
- **List**: `GET {guest}/cart/api/item?cartid&sessid` → `{success, cart: {..., items: []}}`. **Delete**: `DELETE {guest}/cart/api/item/{itemId}?cartid&sessid`.
- **Carted seats do NOT decrement `remainingopenings`** — availability only moves at checkout. Sold-out races are caught by Arctic at checkout; our pre-book re-check is friendly messaging, not enforcement.
- **`orminimumguests` = 0 on all 11 mapped types** — no minimum-party UI needed. **`orcutoff` = 48:00:00 everywhere** — online booking closes 48h before departure; UI must show "Call to Book" inside that window. **`orname`** holds the clean public name ("Cataract Canyon") — use for display fallbacks.

## Built (read-only slice, 2026-08-10)

- `src/lib/arctic/` — `config.ts` (env + graceful unconfigured detection), `client.ts` (token cache, retry/backoff, 403 re-auth, Zod on every payload), `types.ts` (lenient schemas), `trips.ts` (fetchers returning null on any failure so pages fall back to a phone CTA).
- Trip detail pages: "Dates & Availability" section (`AvailabilitySection` + `DepartureList`) with seat-count urgency badges and per-departure Book links.
- `/open-seats`: all public upcoming departures grouped by trip, linked to Sanity trip pages via the `arcticTripId` mapping. Footer "Trip Dates" and `/book` point here.
- Unit tests mock fetch per the no-sandbox decision (`src/lib/arctic/client.test.ts`).

**Not built yet (cart phase)**: cart-building flow, Arctic checkout handoff, availability badges on trip cards sitewide.

## Notes
- Documentation is early stage ("Stay tuned!" per their repo)
- PHP wrapper exists but is PHP-only — we'll use the REST API directly from TypeScript, server-side
- Public/unauthenticated API can be used for initial development before credentials arrive
- Wiki has pages on caching, error handling, querying, and the public cart API
- Custom API integrations are unsupported by Arctic — we own maintenance and troubleshooting

## Related
- [[architecture]] — How Arctic fits into the site data flow
- [[tech-stack]] — Overall technology decisions
