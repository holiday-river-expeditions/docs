# Testing

## Current Suite Size

As of 2026-08-20:

| Suite | Files | Cases |
|-------|-------|-------|
| Vitest (unit + integration) | 6 | 37 |
| Playwright (E2E) | 4 | 7 |

The three E2E specs are `a11y.spec.ts`, `header.spec.ts`, and `home.spec.ts`.

## Running Tests

### Unit & Integration Tests (Vitest)

```bash
pnpm test                              # run all once
pnpm test -- --watch                   # watch mode
pnpm test -- src/path/to/file.test.ts  # run a single file
```

### E2E Tests (Playwright)

```bash
pnpm test:e2e                                      # run all (auto-starts dev server)
pnpm exec playwright test e2e/home.spec.ts          # single file
pnpm exec playwright test --ui                      # interactive UI mode
pnpm exec playwright show-report                    # view HTML report after a run
```

Playwright reuses an already-running dev server on `localhost:3000` when run locally. In CI it starts a fresh one.

## Writing Tests

### Unit / Integration Tests

- **Colocate** test files next to source: `Component.tsx` → `Component.test.tsx`
- **Pattern**: `src/**/*.test.{ts,tsx}`
- **Environment**: jsdom with React Testing Library and jest-dom matchers
- **Setup file**: `src/vitest-setup.ts` registers jest-dom matchers globally

Example (`src/app/page.test.tsx`):

```tsx
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Home from './page';

test('renders the home page', () => {
  render(<Home />);
  expect(
    screen.getByText('Multi-Day Raft and Bike Expeditions in the Heart of Canyon Country'),
  ).toBeInTheDocument();
});
```

Note the homepage H1 is the tagline — **"Multi-Day Raft and Bike Expeditions in the Heart of Canyon Country"** — not the company name. Asserting on `'Holiday River Expeditions'` will not match the heading.

### E2E Tests

- **Location**: `e2e/` directory with `.spec.ts` extension
- **Base URL**: `http://localhost:3000` (Playwright starts the dev server automatically)
- **Browsers**: Chromium only
- **Traces**: captured on first retry for debugging

Example (`e2e/home.spec.ts`):

```ts
import { test, expect } from '@playwright/test';

test('home page loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/holiday river expeditions/i);
});
```

## CI Behavior

One workflow — `.github/workflows/ci.yml` — with two jobs, triggered on push and PRs to `main`, `develop`, and `beta`. Node is pinned to 24 in the workflow. See [[tech-stack]] for the same pipeline described alongside the rest of the stack.

`develop` appears in the trigger list but is not an environment we actually use — [[environments]] only maps `main` (production) and `beta` (stakeholder review). Treat it as leftover config, not a branch to push to.

### Pipeline order

**Job `ci`** — dependency install followed by five gates, in this order:

1. Install dependencies (`pnpm install --frozen-lockfile`)
2. Lint (ESLint)
3. Format check (Prettier — `format:check`)
4. Type-check (`tsc --noEmit`)
5. Unit + integration tests (`vitest run`)
6. Build (`next build`)

**Job `e2e`** — Playwright on chromium, uploading the HTML report as an artifact.

### E2E specifics in CI

- 2 retries on failure
- Single worker (`workers: 1`)
- Playwright HTML report uploaded as artifact (14-day retention)

## Coverage Gaps

Known untested areas as of 2026-08-20 — the booking path is the least-covered code in the repo:

- **No tests on any `/api/*` route handler.** Every route handler under `src/app/api/` is uncovered, despite [[tech-stack]] listing "API route handlers (with mocked Arctic responses)" as an integration-test layer. That layer does not exist yet.
- **No tests on `src/lib/cart-cookie.ts`.** Cart state is serialized through this module on the way to the Arctic handoff, and nothing exercises it.

Both are tracked in [[build-phases]] under known gaps.

## Configuration Files

| File | Purpose |
|------|---------|
| `vitest.config.ts` | Vitest setup — jsdom environment, `@` path alias, setup file |
| `playwright.config.ts` | Playwright setup — browsers, base URL, webServer, retries |
| `src/vitest-setup.ts` | Registers `@testing-library/jest-dom` matchers for Vitest |
| `.github/workflows/ci.yml` | CI pipeline definition |

## Related

- [[tech-stack]] — Technology choices and test layer overview
- [[architecture]] — Project structure showing where tests live
- [[environments]] — Which branches map to which deploys
- [[build-phases]] — Known gaps, including the untested booking path
