# Third Party Cypress tests

## General approach to end-to-end (E2E) testing

This is documented in [the README in our primary directory of our cypress tests](https://github.com/bbc/simorgh/blob/latest/cypress/README.md).

## This suite of tests

The Simorgh application is not directly audience-facing. We have other third party systems that are visited first on Test and Live environments prior to a user request hitting Simorgh. We want to ensure we have end-to-end tests, that check these systems are working as we expect, but we do not want any failures to prevent us from deploying our own code. This is why this separate [3rdParyCypress directory](https://github.com/bbc/simorgh/tree/latest/3rdPartyCypress) exists.

These are E2Es of third-party systems, the success of those tests may or may not be partially dependent on the Simorgh application but they definitely include systems we use in a live environment and may break irrespective of the stability of this application. This is in under [3rdPartyCypress/](https://github.com/bbc/simorgh/tree/latest/3rdPartyCypress).

## Why is there duplication?

Tests are deliberately duplicated between this directory and the [cypress directory](https://github.com/bbc/simorgh/tree/latest/cypress). We do not want to conflate the tests here and there, these tests are only ever run against live environments, those are designed to run against any environment or more specifically any environment where the simorgh application is definitely the application that's being tested. For example, the current tests here are for error pages, these are served in production by a 3rd party system, so we cannot test our application in a live environment for any kind of error page. This suite therefore is created to ensure the most consistent possible user experience while keeping our build as stable as possible.

## When to write tests in this directory

If you're testing anything in the live environment that isn't a 200 response and 'text/html' content type. Do not run these kinds of tests agains the test environment, there is no expectation that it is stable.
