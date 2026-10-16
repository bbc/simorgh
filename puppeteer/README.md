# Puppeteer tests

These are a small part of all our E2E tests, which are written up [here](https://github.com/bbc/simorgh/blob/latest/cypress/README.md).

We only put E2Es here when they cannot be done in Cypress (due to its functional limitations).

Puppeteer 25 and its browser-management packages are ESM-only. The Puppeteer project in `jest.config.js` uses the SWC compiler supplied by `next/jest`, like the root unit-test projects. Its resolved `transformIgnorePatterns` replace Next's default dependency exclusions with an allowlist for `puppeteer`, `puppeteer-core` and `@puppeteer/browsers`, so these packages can run in Jest's CommonJS-compatible test environment.
