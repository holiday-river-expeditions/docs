# Tech Stack

## Decisions

| Layer | Choice | Version | Rationale |
|-------|--------|---------|-----------|
| **Language** | TypeScript (strict mode) | `^5.9.3` | Type safety across the entire codebase — components, API clients, CMS types, Arctic API responses |
| **Framework** | Next.js (App Router) | `16.3.0` | Server components for Arctic API integration, API routes for proxying requests, dynamic routes for trips/blog, native Vercel deployment |
| **UI Library** | React | `19.2.3` | Server components, `use` hook, matches Next.js 16 requirements |
| **CMS** | Sanity | `^5.31.1` | Visual editing studio for non-technical staff, structured content with custom fields (replaces WP custom fields), real-time preview, generous free tier, excellent Next.js integration |
| **Styling** | Tailwind CSS | `^4.3.3` | Rapid responsive development, design system consistency, small bundle size |
| **Validation** | Zod | `^4.4.3` | Runtime validation at API boundaries (Arctic responses, route handler inputs) |
| **Hosting** | Vercel | — | Native Next.js support, global CDN, serverless functions for API proxying, Git-based deploys |
| **Booking** | Arctic Reservations REST API | — | Replace iframes with native UI — public API for availability/search, authenticated API for reservations |
| **Analytics** | Google Analytics + Meta Pixel (PostHog added later for product analytics) | — | GA for standard metrics, Meta pixel for retargeting. PostHog added once booking flow is live for conversion/funnel analysis |
| **Testing** | Vitest + Playwright | `^4.1.10` / `^1.62.1` | Vitest for unit/integration tests, Playwright for E2E browser tests |
| **CI/CD** | GitHub Actions | — | Automated lint, format check, type-check, test, and build on every PR. Deploy previews via Vercel. |
| **Package Manager** | pnpm | `10.29.3` | Fast, disk-efficient, strict dependency resolution |
| **Runtime** | Node.js | `24` (CI only) | Pinned in `.github/workflows/ci.yml` only — there is no `engines` field in `package.json` and no `.nvmrc`, so local Node version is unenforced |
| **Database** | None initially | — | Sanity handles all content, Arctic handles bookings. Add Supabase/Neon PostgreSQL later only if custom data storage needs arise |

## TypeScript Strategy

- **Strict mode** enabled (`strict: true` in tsconfig)
- **Sanity types** auto-generated from schemas via `sanity-typegen`
- **Arctic API types** — hand-written TypeScript interfaces for API responses, validated with Zod at runtime boundaries
- **Component props** — all components fully typed, no `any` escape hatches
- **API route handlers** — typed request/response with Zod validation for inputs

## Testing & CI

### Test Layers

| Layer | Tool | Covers |
|-------|------|--------|
| **Unit** | Vitest | Utility functions, data transformers, Arctic API client methods, Zod schemas |
| **Component** | Vitest + React Testing Library | UI components render correctly, handle props, respond to interactions |
| **Integration** | Vitest | Sanity query functions, API route handlers (with mocked Arctic responses) — *the route-handler half of this is aspirational; no `/api/*` handler has tests yet, see [[testing]]* |
| **E2E** | Playwright | Critical user flows: browse trips → view details → booking flow, blog navigation, FAQ interaction |

### GitHub Actions CI Pipeline

One workflow — `.github/workflows/ci.yml` — with two jobs. Triggers on push and PR to `main`, `develop`, and `beta`. Node is pinned to **24** here and nowhere else.

**Job `ci`** — dependency install followed by five gates, in this order:

1. Install dependencies (`pnpm install --frozen-lockfile`)
2. Lint (ESLint)
3. Format check (Prettier — `format:check`)
4. Type-check (`tsc --noEmit`)
5. Unit + integration tests (`vitest run`)
6. Build (`next build`)

**Job `e2e`** — Playwright on chromium, uploading the HTML report as an artifact (14-day retention).

### Quality Gates

- **Performance**: no automated budgets yet — performance optimization and Core Web Vitals are unbuilt Phase 6 work (see [[build-phases]])
- **SEO**: Validate structured data with Google's Rich Results Test
- **Cross-browser**: Playwright runs **chromium only** (`playwright.config.ts` defines no Firefox or WebKit project). Other browsers are manual-QA territory for now.
- **Accessibility**: axe-core automated checks + manual screen reader testing

## Related
- [[architecture]] — Site structure built on this stack
- [[build-phases]] — How we roll this out incrementally
- [[testing]] — Practical guide to running and writing tests
