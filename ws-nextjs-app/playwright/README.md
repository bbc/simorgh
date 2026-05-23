# Playwright E2E Guide (ws-nextjs-app)

This guide explains how to set up and run Playwright tests for the Next.js app.

## Scope

- Test runner: `@playwright/test`
- Config file: `ws-nextjs-app/playwright.config.ts`
- Test root (from config): `ws-nextjs-app/playwright`

This is intentionally general so additional page types can be added over time.

## Prerequisites

1. Use the correct Node version for this repo.
2. Install dependencies from repo root:

```
yarn install
```

3. Install Playwright browsers once:

```
cd ws-nextjs-app
npx playwright install --with-deps chromium
```

If you plan to run real Chrome channel tests:

```
npx playwright install chrome
```

## Environment model

Playwright uses `APP_ENV` to select base URL in `playwright.config.ts`:

- `local` -> `http://localhost:7081`
- `test` -> `https://www.test.bbc.com`
- `live` -> `https://www.bbc.com`

Default script behavior is local unless another script sets `APP_ENV`.

## Running tests

From `ws-nextjs-app`:

- Run all Playwright tests (local):

```
yarn playwright:e2e
```

- Run all Playwright tests in headed Chrome (local):

```
yarn playwright:e2e:chrome
```

- Run all Playwright tests against test/live environments:

```
yarn playwright:e2e:test
yarn playwright:e2e:live
```

- Run a single file:

```
yarn playwright:e2e playwright/pageTypes/<pageType>/<file>.spec.ts
```

- List discovered tests without running:

```
yarn playwright:e2e --list
```

- Filter by test name:

```
yarn playwright:e2e --grep "404"
```

## Local server expectations

Local runs use `http://localhost:7081`. If tests fail to connect, start the app first.

Development mode:

```
yarn dev
```

Production-like mode:

```
yarn build
yarn start
```

Then run Playwright in a second terminal.

## Debugging failures

Current config keeps traces on failure (`trace: retain-on-failure`).

- Open HTML report:

```
npx playwright show-report
```

- Open trace file (if available):

```
npx playwright show-trace <path-to-trace.zip>
```

## Adding new page types

To add coverage for a new page type:

1. Create a folder under `ws-nextjs-app/playwright/pageTypes/<pageType>/`.
2. Add one or more `*.spec.ts` files.
3. Reuse shared helpers/data where practical.
4. Keep test naming clear and service-aware.
5. Verify discovery:

```
yarn playwright:e2e --list
```

Optional: add convenience scripts in `ws-nextjs-app/package.json` for frequently run specs.

## CI notes

A Playwright workflow exists under `.github/workflows/` to run Playwright page type tests on pull requests. Keep CI commands aligned with the scripts in `ws-nextjs-app/package.json`.
