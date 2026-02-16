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
- [ ] Create API client in Arctic admin (`hre-website`, User level)
- [ ] Test public API endpoints to understand response shapes for TypeScript types
- [ ] Build typed API client in `src/lib/arctic/`
- [ ] Test Arctic Custom HTML Header for checkout popup styling

## Notes
- Documentation is early stage ("Stay tuned!" per their repo)
- PHP wrapper exists but is PHP-only — we'll use the REST API directly from TypeScript, server-side
- Public/unauthenticated API can be used for initial development before credentials arrive
- Wiki has pages on caching, error handling, querying, and the public cart API
- Custom API integrations are unsupported by Arctic — we own maintenance and troubleshooting

## Related
- [[architecture]] — How Arctic fits into the site data flow
- [[tech-stack]] — Overall technology decisions
