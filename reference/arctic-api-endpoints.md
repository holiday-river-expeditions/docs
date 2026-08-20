# Arctic Reservations API — Endpoint Reference

## Base
All endpoints under `/api/rest/`

## Authentication
OAuth 2.0 — exchange Client ID/Secret + API username/password for access token.

Public (unauthenticated) API available for trip search, availability, and booking initiation.

## Access Scopes

> **Correction (2026-02-16):** Per Morgan at Arctic support, "Read-only" access levels (including Read-only with Financial Data) are **strictly read-only** across all endpoints. No write access at all — not even on persons, reservations, tasks, or inquiries. At least **User level** access is required for any write operations.

Endpoint access depends on the API client's access level:
- **Read-only / Read-only with Financial Data** — read-only across all endpoints (no writes)
- **User** — read/write on most endpoints (minimum level for write operations)
- **Administrator (System-Wide)** — full CRUD on all endpoints

The "Scope (Read-only)" column below reflects true read-only behavior. The "Scope (User)" column shows User level access. Note that the `activity` endpoint is **read-only even at higher access levels** — activities cannot be written via API.

## Endpoints

### Trips & Scheduling
| Endpoint | Methods (Admin) | Scope (User) | Scope (Read-only) | Description |
|----------|----------------|-------------|-------------------|-------------|
| `/api/rest/trip` | CRUD | Read/Write | Read | Trip/tour management |
| `/api/rest/triptype` | CRUD | Read/Write | Read | Trip type definitions |
| ~~`/api/rest/trippricing`~~ | — | — | — | **404s — does not exist.** Documented in the wiki but not implemented. Use `/api/rest/triptype/{id}/pricinglevel` instead. |
| `/api/rest/triptype/{id}/pricinglevel` | — | Read | Read | Trip pricing levels — `GET` only, nested under a trip type. This is the working path for pricing. |
| `/api/rest/tripaddon` | CRUD | Read/Write | Read | Trip add-ons |
| `/api/rest/schedule` | CRUD | Read/Write | Read | Guide/trip schedules |

### Reservations & Guests
| Endpoint | Methods (Admin) | Scope (User) | Scope (Read-only) | Description |
|----------|----------------|-------------|-------------------|-------------|
| `/api/rest/reservation` | CRUD | Read/Write | Read | Reservation management |
| `/api/rest/person` | CRUD | Read/Write | Read | Person/guest management |
| `/api/rest/person/<id>/emailaddress` | CRUD | Read/Write | Read | Nested: guest email addresses |
| `/api/rest/person/<id>/phonenumber` | CRUD | Read/Write | Read | Nested: guest phone numbers |
| `/api/rest/person/<id>/notes` | CRUD | Read/Write | Read | Nested: guest notes |
| `/api/rest/inquiry` | CRUD | Read/Write | Read | Inquiry management |

### Operations
| Endpoint | Methods (Admin) | Scope (User) | Scope (Read-only) | Description |
|----------|----------------|-------------|-------------------|-------------|
| `/api/rest/guide` | CRUD | Read/Write | Read | Guide management |
| `/api/rest/rental` | CRUD | Read/Write | Read | Rental equipment |
| `/api/rest/rentalitem` | CRUD | Read/Write | Read | Rental item details |
| `/api/rest/rentalprice` | CRUD | Read/Write | Read | Rental pricing |
| `/api/rest/invoice` | CRUD | Read/Write | Read | Invoice management |

### Other
| Endpoint | Methods (Admin) | Scope (User) | Scope (Read-only) | Description |
|----------|----------------|-------------|-------------------|-------------|
| `/api/rest/businessgroup` | CRUD | Read/Write | Read | Business group management |
| `/api/rest/evaluation` | CRUD | Read/Write | Read | Evaluation/survey responses |
| `/api/rest/tripformresponse` | CRUD | Read/Write | Read | Trip form responses |
| `/api/rest/task` | CRUD | Read/Write | Read | Task management |
| `/api/rest/activity` | CRUD | **Read** | Read | Activity logging *(read-only at all access levels)* |
| `/api/rest/account` | CRUD | Read/Write | Read | Account information |

## CRUD Operations
- **Create** (INSERT)
- **Read** (LOAD / BROWSE)
- **Update**
- **Delete**

## Query Support
- Filtering and querying objects supported (see wiki: Querying Objects)
- Nested resources supported (e.g., person → emailaddress)

## Response Format

Resource endpoints return JSON (send `Accept: application/json`).

> **Correction (verified live 2026-08-10):** the **OAuth token endpoint is the exception — its response is form-encoded, not JSON.** `POST /api/rest/oauth/application/token` returns `access_token=...&token_type=bearer&expires_in=3600&refresh_token=...` as a URL-encoded string. Parsing it as JSON will throw. The request body is form-encoded too. See [[arctic-api]] for the full auth flow, token caching, and the 403-means-expired retry behavior.

## Resources

> **Note:** all four links below resolve to the same wiki root — the original deep links were lost, and the anchors were never recorded. They're of limited use as-is; you'll have to navigate the wiki's own sidebar to find the right page. [[arctic-api]] captures what we actually verified against the live API, and is the more reliable reference.

- Wiki — Querying Objects: https://github.com/arcticres/arctic-api/wiki
- Wiki — Caching: https://github.com/arcticres/arctic-api/wiki
- Wiki — Error Handling: https://github.com/arcticres/arctic-api/wiki
- Wiki — Public Cart API: https://github.com/arcticres/arctic-api/wiki
