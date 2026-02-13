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
| `/api/rest/schedule` | Guide/trip schedules |
| `/api/rest/guide` | Guide management |
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
   - **Read-only with Financial Data** — read-only access to most endpoints, with read/write limited to persons, reservations, tasks, and inquiries
5. Click **Submit**
6. Arctic will display credentials for both **Basic** and **OAuth 2.0** connections
7. **Save credentials immediately** — passwords are shown only once and cannot be retrieved later

### Access Scopes

The "Read-only with Financial Data" access level provides:

**Read-only:**
- Business groups, accounts, invoices
- Reservations (read)
- Rentals, rental items
- Trips, trip types
- Guides, guide scheduling

**Read/write:**
- Persons
- Reservations (create/update)
- Tasks
- Inquiries

The Administrator (System-Wide) level provides full read/write across all endpoints.

## Integration Approach

1. **Server-side API proxy** — Next.js API routes proxy Arctic API calls, keeping credentials secure
2. **Trip sync** — Pull trip data from Arctic on build + ISR (Incremental Static Regeneration) for freshness
3. **Open seats** — Server component fetches real-time availability, displays dynamically
4. **Booking flow** — Custom multi-step UI calling Arctic API via our proxy:
   - Step 1: Select dates & party size
   - Step 2: Choose add-ons
   - Step 3: Guest information
   - Step 4: Payment & confirmation
5. **Trip detail pages** — Link Arctic trip ID to Sanity content so CMS content + live availability display together

## Integration Strategy

### API Clients

Two clients, following the principle of least privilege:

| Client | Access Level | Purpose |
|--------|-------------|---------|
| `hre-website-sync` | Read-only with Financial Data | Trip sync, availability display, guide info |
| `hre-website-booking` | Administrator (System-Wide) | Booking flow: creating reservations, managing guests |

Rationale: if sync credentials leak, the blast radius is read-only data.

### Resilience (since integration is unsupported)

- **Zod validation** on all API responses to catch undocumented schema changes
- **Retry with exponential backoff** for transient failures
- **Fallback UI** ("Contact us for availability") when API is unreachable
- **Next.js ISR caching** to reduce API call volume and survive brief outages

### Phase 3 Sequence

1. Create API clients in Arctic admin (`hre-website-sync` + `hre-website-booking`)
2. Store credentials in Vercel env vars
3. Build typed API client in `src/lib/arctic/`
4. Read-only endpoints first (trips, availability)
5. Open seats page
6. Booking flow (reservations, persons)

## Action Items

- [x] ~~Contact Arctic Reservations support to obtain API credentials~~ — resolved: self-service via Settings > API Access
- [ ] Create API clients in Arctic admin (`hre-website-sync` + `hre-website-booking`)
- [ ] Confirm whether Arctic handles payment processing or if we need Stripe on our side #decision-needed
- [ ] Test public API endpoints to understand response shapes for TypeScript types
- [ ] Build typed API client in `src/lib/arctic/`

## Notes
- Documentation is early stage ("Stay tuned!" per their repo)
- PHP wrapper exists but is PHP-only — we'll use the REST API directly from TypeScript, server-side
- Public/unauthenticated API can be used for initial development before credentials arrive
- Wiki has pages on caching, error handling, querying, and the public cart API
- Custom API integrations are unsupported by Arctic — we own maintenance and troubleshooting

## Related
- [[architecture]] — How Arctic fits into the site data flow
- [[tech-stack]] — Overall technology decisions
