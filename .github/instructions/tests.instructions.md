---
description: "Use when writing or editing Jest unit tests, React component tests, or integration tests in Simorgh. Covers the custom RTL wrapper, service-aware assertions, snapshot policy, and KISS test style."
applyTo: ["**/*.test.{ts,tsx,js,jsx}", "**/*.client.test.{ts,tsx,js,jsx}", "src/integration/**", "src/testHelpers/**"]
---

# Simorgh test conventions

## Imports

- For React component tests **always** import `render`, `screen`, `act`, `waitFor`, etc. from the custom wrapper [src/app/components/react-testing-library-with-providers.tsx](../../src/app/components/react-testing-library-with-providers.tsx). It wires up Service, User, Toggle, EventTracking, Account and Theme providers. **Never** import from `@testing-library/react` directly.
- The wrapper's `render` accepts extra options (e.g. `service`, `toggles`, `pageData`, `bbcOrigin`) — use those instead of manually wrapping with providers.

## Style

- Test the **output**, not the implementation. Prefer queries like `screen.getByRole(...)` / `screen.getByText(...)` and assert on visible markup, attributes, or computed style.
- Keep logic out of tests. No loops, no per-test branching. If you need parameterised cases, use `it.each` with a small data table.
- One behaviour per `it`. Use clear `describe`/`it` titles that read like a sentence.
- Don't mock things you don't need to. Prefer the real component tree under the providers.

## Service-awareness

- When a behaviour varies per service (RTL/LTR, fonts, translations, analytics), add at least one assertion for a non-default service. The Paragraph tests are a good model:

  ```tsx
  render(<Paragraph>Hello</Paragraph>, { service: 'arabic' });
  expect(screen.getByText('Hello')).toHaveStyle({ fontFamily: '...' });
  ```
- Pick services that exercise the variation (e.g. `arabic` for RTL/Arabic script, `mundo` for Latin, `news` for English defaults).

## File layout

- Colocate tests next to the code: `index.test.tsx` beside `index.tsx`.
- Use `*.client.test.{ts,tsx}` for tests that must run in the happy-dom (browser-like) Jest project; default Jest project is jsdom.
- Integration tests live under [src/integration/](../../src/integration/) and run as **three separate Jest projects** (AMP, Canonical, Lite). A single test file may be skipped in some platforms via `testPathIgnorePatterns` in [jest.config.js](../../jest.config.js) — verify your new file is covered by the platform(s) you intend.

## Snapshots

- Avoid large/whole-component snapshots. Snapshot small, intentional pieces only.
- Update snapshots with `yarn test:unit:updatesnapshots` (unit) or `yarn test:integration:updatesnapshots` (integration). Review every diff before committing.

## Generated test files (do not commit)

- `yarn test:linkey` produces `src/app/lib/config/services/*.test.js` files. They are temporary; clean up with `yarn test:linkey:cleanup`. Never commit them.
