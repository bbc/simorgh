# Ad Hoc Cypress Tests

## General approach to end-to-end (E2E) testing
This is documented in [the README in the primary directory of our cypress tests](https://github.com/bbc/simorgh/blob/latest/cypress/README.md).

## This suite of tests
The purpose of this test suite is to allow for testing of ad-hoc functionality within the Simorgh application, without affecting the tests which are executed as part of the End-to-End tests in both the Test and Live environments.

## Running Ad Hoc Tests

| Environment | Command                                       | 
| ----------- | --------------------------------------------- |
| local       | `CYPRESS_APP_ENV=local npm run cypress:adhoc` |
| test        | `CYPRESS_APP_ENV=test npm run cypress:adhoc`  |
| live        | `CYPRESS_APP_ENV=live npm run cypress:adhoc`  |

As with the primary Cypress tests, the same [environment variables](https://github.com/bbc/simorgh#environment-variables) can also be used with the `cypress:adhoc` command
