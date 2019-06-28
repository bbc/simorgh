# 3rd Party cypress tests

## General approach to E2E testing
This is documented in the primary directory of our cypress tests in `../cypress/README.md`.


## This suite of tests
These are E2Es of 3rd party systems, the success of those tests may or may not be partially dependent on the simorgh application but they definitely include systems we use in a live environment and may break irrespective of the stability of this application. This is in the repo root under `3rdPartyCypress/`.

## Weirdness
Tests are deliberately duplicated between this directory and the `../cypress/` directory. We do not want to conflate the tests here and there, these tests are only ever run against live environments, those are designed to run against any environment or more specifically any environment where the simorgh application is definitely the application that's being tested. For example, the current tests here are for error pages, these are served in production by a 3rd party system, so we cannot test our application in a live environment for any kind of error page. This suite therefore is created to ensure the most consistent possible user experience while keeping our build as stable as possible.
