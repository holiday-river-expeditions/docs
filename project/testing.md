# Testing

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
  expect(screen.getByText('Holiday River Expeditions')).toBeInTheDocument();
});
```

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

GitHub Actions runs both suites on push and PRs to `main`, `develop`, and `beta`.

### Pipeline order

1. Install dependencies (`pnpm install --frozen-lockfile`)
2. Lint (ESLint)
3. Format check (Prettier)
4. Typecheck (`tsc --noEmit`)
5. Unit tests (`pnpm test`)
6. Build (`next build`)
7. E2E tests (separate job, Chromium only)

### E2E specifics in CI

- 2 retries on failure
- Single worker (`workers: 1`)
- Playwright HTML report uploaded as artifact (14-day retention)

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
