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

If you plan to run tests against the locally installed Google Chrome browser (rather than the bundled Chromium build), install the Chrome channel too:

```
npx playwright install chrome
```

> "Channel" here is Playwright's term for a specific browser distribution (e.g. `chrome`, `msedge`). By default Playwright runs against its bundled Chromium build; setting a channel switches to a real installed browser instead.

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

## Timezone module generation

Playwright tests import `ws-nextjs-app/utilities/serviceConfigs`, which imports service config files that include timezone side-effect imports such as `#psammead/moment-timezone-include/tz/Africa/Addis_Ababa`.

These timezone files are generated at runtime and are gitignored. Cypress and Next.js generate them through webpack plugin setup. Playwright is not webpack-driven, so the Playwright scripts run a preparation step first:

```
yarn playwright:prepare
```

If you see an error similar to the following, run the prepare script (or use `yarn playwright:e2e`, which includes it automatically):

```
Cannot find module '#psammead/moment-timezone-include/tz/...'
```
