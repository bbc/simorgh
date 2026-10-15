# Puppeteer tests

These are a small part of all our E2E tests, which are written up [here](https://github.com/bbc/simorgh/blob/latest/cypress/README.md).

We only put E2Es here when they cannot be done in Cypress (due to its functional limitations).

Puppeteer 25 and its browser-management packages are ESM-only. The Puppeteer project in `jest.config.js` transforms these packages with Babel to keep them compatible with the existing Jest test setup.
