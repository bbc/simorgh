# Puppeteer tests

These are a small part of all our E2E tests, which are written up [here](https://github.com/bbc/simorgh/blob/latest/cypress/README.md).

We only put E2Es here when they cannot be done in Cypress (due to its functional limitations).

Puppeteer 25 and its browser-management packages are ESM-only. The `Puppeteer Tests` project in the root `jest.config.ts` uses the SWC compiler supplied by `next/jest`, like the root unit-test projects. Its resolved `transformIgnorePatterns` replace Next's default dependency exclusions with an allowlist for `puppeteer`, `puppeteer-core` and `@puppeteer/browsers`, so these packages can run in Jest's CommonJS-compatible test environment.

Run `yarn test:puppeteer` from the repository root. The command selects only `Puppeteer Tests` and intentionally leaves Node's experimental VM modules flag disabled, which is needed for Puppeteer 25 import compatibility.
