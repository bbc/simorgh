# Cypress tests and our approach to E2E testing

This folder contains all the simorgh application end-to-end (E2E) tests and exclusively uses cypress as a testing framework. At present we run all E2E tests on all builds and deploys to all environments including live.

We aim to keep the code reusable but also to leverage the cypress framework as much as possible, here are some helpful hints. NB we're not perfect we're breaking our own guidelines and need help tidying up and making our tests more scalable.

## Helpful hints

- Use the default cypress commands e.g. cy.get().
- Code reusability is good but ease of understanding is better.
- Use custom cypress commands, see `/support/commands.js`.
- If you're using a let, var or const in any test/helper/command in this repo, you're probably doing it unecessarily, use cypress aliasing or chain requests.
- If trying to reuse tests always use cypress commands. i.e. don't export and import const's within cypress. Config is a sensible exception to this rule.
- Before writing a long/complex test, look to see if similar ones could be reused.
- Once you've written a test consider where else it might be helpful. For example testing a 200 response is useful on all requests and visits, so why not add it there in an additional PR (not in the same one to keep our PRs small and therefore fast to merge).
- Work together to consolidate the tests we have. Between the many tests in this folder are nearly all the tests we need, but are they as routinely used as they could be?
- Write as many tests as you please, but don't make them atomic. i.e. use .and() instead of a second test.
- The runtime of tests matters so make each as fast as you can, avoid repeating expensive things like visit()s and request()s as much as possible.
- Although the runtime of each test matters and making each test not too small is good practice always tend towards full coverage rather than limiting the scope of testing.
- We could write many more best practices but cypress already did: [Cypress.io Best Practices](https://docs.cypress.io/guides/references/best-practices.html)
- Use the scripts from the package.json to run Cypress test locally on LIVE/TEST: https://github.com/bbc/simorgh/blob/latest/package.json#L39#L40

## Beyond this suite of tests

We have two other cypress test suites. One is just a smoke test of our storybook deployment, see in the repo root under `.storybook/cypress`. The second one is for E2Es of 3rd party systems, the success of those tests may or may not be partially dependent on the simorgh application but they definitely include systems we use in a live environment and may break irrespective of the stability of this application. This is in the repo root under `3rdPartyCypress/`.
