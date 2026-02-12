# Tech Stack

## Decisions

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Language** | TypeScript (strict mode) | Type safety across the entire codebase — components, API clients, CMS types, Arctic API responses |
| **Framework** | Next.js 16 (App Router) | Server components for Arctic API integration, API routes for proxying requests, dynamic routes for trips/blog, native Vercel deployment |
| **CMS** | Sanity | Visual editing studio for non-technical staff, structured content with custom fields (replaces WP custom fields), real-time preview, generous free tier, excellent Next.js integration |
| **Styling** | Tailwind CSS | Rapid responsive development, design system consistency, small bundle size |
| **Hosting** | Vercel | Native Next.js support, global CDN, serverless functions for API proxying, Git-based deploys |
| **Booking** | Arctic Reservations REST API | Replace iframes with native UI — public API for availability/search, authenticated API for reservations |
| **Analytics** | Google Analytics + Meta Pixel (PostHog added later for product analytics) | GA for standard metrics, Meta pixel for retargeting. PostHog added once booking flow is live for conversion/funnel analysis |
| **Testing** | Vitest + Playwright | Vitest for unit/integration tests, Playwright for E2E browser tests |
| **CI/CD** | GitHub Actions | Automated lint, type-check, test, and build on every PR. Deploy previews via Vercel. |
| **Package Manager** | pnpm | Fast, disk-efficient, strict dependency resolution |
| **Database** | None initially | Sanity handles all content, Arctic handles bookings. Add Supabase/Neon PostgreSQL later only if custom data storage needs arise |

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
| **Integration** | Vitest | Sanity query functions, API route handlers (with mocked Arctic responses) |
| **E2E** | Playwright | Critical user flows: browse trips → view details → booking flow, blog navigation, FAQ interaction |

### GitHub Actions CI Pipeline

Runs on every PR and push to `main`:

1. Install dependencies (pnpm)
2. Lint (ESLint)
3. Type-check (tsc --noEmit)
4. Unit + integration tests (vitest run)
5. Build (next build)
6. E2E tests (Playwright — against preview deploy)

### Quality Gates

- **Performance**: Lighthouse CI checks in pipeline, target 90+ scores
- **SEO**: Validate structured data with Google's Rich Results Test
- **Cross-browser**: Playwright tests on Chromium, Firefox, WebKit
- **Accessibility**: axe-core automated checks + manual screen reader testing

## Related
- [[architecture]] — Site structure built on this stack
- [[build-phases]] — How we roll this out incrementally
- [[testing]] — Practical guide to running and writing tests
