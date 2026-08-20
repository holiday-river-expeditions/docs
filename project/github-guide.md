# GitHub Guide for the Website Project

A quick reference for how code moves through GitHub on this project — repos, branches, pull requests, and the checks that run automatically.

## The Two Repos

The project lives in two independent repositories:

| Repo | Contents |
|------|----------|
| `website` | The Next.js app — the public site and the Sanity Studio |
| `docs` | This Obsidian vault, plus the Astro/Starlight app that publishes it |

They are separate repos with separate histories. A change to the site and a change to the docs are always two commits in two places.

## Branch Strategy

- **`main`** — the trunk. Deploys to production on every merge.
- **`feature/*`** — one short-lived branch per piece of work, branched from `main` and merged back via pull request.

Work does not get committed directly to `main`. Branch, open a PR, let CI run, merge.

`beta` also exists as a deploy target for stakeholder review before a production cutover — see [[environments]] for how the branches map to deploys.

## Pull Requests

1. Branch from `main`: `git checkout -b feature/short-description`
2. Commit your work and push the branch.
3. Open a pull request against `main`.
4. Wait for CI to pass, then merge.

Vercel builds a preview deploy for every PR, so you can click through the change on a real URL before it merges.

## What CI Runs on a PR

One workflow — `.github/workflows/ci.yml` — with two jobs. Full detail lives in [[tech-stack]] and [[testing]]; the short version:

**Job `ci`** — install, then lint (ESLint) → format check (Prettier) → type-check (`tsc --noEmit`) → unit and integration tests (Vitest) → build (`next build`).

**Job `e2e`** — Playwright against chromium, with the HTML report uploaded as an artifact.

Any failing step blocks the merge. If the format check is what failed, `pnpm format` locally will usually fix it outright.

## Pre-commit Hooks

The `website` repo runs **husky** + **lint-staged** on every commit, so most CI failures get caught before they leave your machine:

| Files | What runs |
|-------|-----------|
| `*.{ts,tsx,js,jsx}` | `eslint --fix`, then `prettier --write` |
| `*.{json,md,mdx,css,html,yml,yaml,graphql}` | `prettier --write` |

Both hooks rewrite files in place, so a commit may include formatting fixes you did not type. That is expected. The hooks install themselves via the `prepare` script when you run `pnpm install`.

## Issue Tracking

**Issues and decisions are tracked in this vault, not in GitHub Issues.** The GitHub Issues workflow — phase labels, milestones, issue templates, and the project board — was retired on 2026-08-20 and all open issues were closed.

The vault is now the source of truth:

- [[build-phases]] — what is planned, in progress, and done, phase by phase
- [[open-decisions]] — open questions and decisions awaiting input

Tag anything that needs a decision with `#decision-needed` so it surfaces in search.

## Related

- [[build-phases]] — Full breakdown of what's planned in each phase
- [[open-decisions]] — Open questions and decisions that need input
- [[environments]] — Branches, deploy targets, and environment URLs
- [[testing]] — Running the test suites locally
- [[tech-stack]] — Stack versions and the full CI pipeline
