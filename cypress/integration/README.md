# How our Cypress tests work

First see [our best practices](https://github.com/bbc/simorgh/blob/latest/cypress/README.md#best-practises).

We have a very bespoke approach to testing. We split our tests in 3 sections: Application, Pages and Special Features (features that cannot be tested in a single page visit).

We only run a subset of these integrations tests in CI and CD (those we always run are called smoke tests), but have a regular [cron job](https://en.wikipedia.org/wiki/Cron) that runs all integration tests (a.k.a. e2e tests) in this directory against localhost, test.bbc.com and www.bbc.com.

If you would like to run e2e tests as it runs on the cron pass this env variable to cypress `CYPRESS_SMOKE=false`, so your script could be something like `CYPRESS_SMOKE=false npm run test:e2e`.

## [Config used in the tests](../support/config)

It's important to familiarise yourself with the service.js config before writing e2e tests. Within there we define which combinations of services and page types should be tested, what the paths to test on are and whether something should be tested while only smoke testing.

## [Application](./application)

Here we test things that aren't pages such as manifest files and service workers. NB we don't test the .json endpoint for each page here because it's an implicit part of every 'page' test.

## [Pages](./pages)

This is where the overwhelming majority of e2es live.
Key points:

- The index.js of each page type directory must use the [runTestsForPage function](../support/helpers/runTestsForPage.js), this:
  - reduces the number of page visits to one visit to the canonical page and one visit to the [AMP](https://amp.dev/) version of the same page.
  - runs tests on every service automatically based on the service:page type combinations found in the [services config file](../support/config/services.js).
- Files in the base of the pages directory run on all page types (as their naming suggests.
- There is a directory per page type where each page's custom tests are written, the naming convention with each is exactly the same as every other one and should be kept this way for ease of comprehension.
- In all cases tests should be written at the 'highest' possible level. The importance of this is that it tends our tests written to the highest possible level of coverage with the smallest possible amount of code. This means when writing a test you should write it based on this order of preference:
  - testsForALLPages.js
  - testsForALLAMPPages.js or testsForAllCanonicalPages.js
  - /[pageName]/tests.js
  - /[pageName]/testsForAMPOnly.js or /[pageName]/testsForCanonicalOnly.js
- Inside each of the files in the list above there are three sets of tests:
  - **testsThatAlwaysRun** - as the name implies these will always run, use this sparingly because by default it will run for every service, page type and platform (canonical, AMP)! This is useful for features that vary between services.
    - We recommend using conditional logic to select just the services/pagetypes that are necessary. e.g. only run ATI analytics tests on `afaanoromoo, cymrufyw, japanese, naidheachdan, news` instead of all 44 services, since these cover all variants.
  - **testsThatFollowSmokeTestConfig** - this is where most tests will go. These will only run on PRs if the `smoke` value is `true` for that service/pageType combination. [services config file](../support/config/services.js)
  - **testsThatNeverRunDuringSmokeTesting** - this is for tests that are very CPU intensive, long running or low priority. It's a good place for testing layout or page-width variants.
  - Similarly the same kind of logic applies to the tests that run for all pages, and the naming conventions appends ForAllPages, ForAllCanonicalPages or ForAllPages e.g. **testsThatNeverRunDuringSmokeTestingForAllPages**

NB Despite all these rules, we don't favour highly abstracted tests, duplication of tests is preferred where it gives the same test coverage and enhances readability.

## [Special Features](./specialFeatures)

There are features on pages that cannot be tested in one page visit. The only such example is cookie banner/GDPR logic testing. It is not envisaged that any other tests would be added here.

## Consequences of smoke testing

As a subset of the integration tests are run at all time outside of a cron job, there is a chance of tests failing in the cron job but not failing anywhere else. This will usually be a result of a branch being merged into the default (latest) branch, but can also be due to changes in data in the environment the tests fail in (fixture data locally, test and live env data in those environments respectively).

Investigations of such failures are handled by an internal 'Core pod', it is their discretion whether to patch it themselves, ask the implementor who introduced the regression to fix their own work or they may choose to revert the PR. You will not be consulted about the decision to revert, but you will be promptly notified. The stability of latest is more important than any single PR as dozens of people's work depends on it. But, as a general rule we always try to fix-forwards as we wish to 'move fast and break things', but hopefully not in the same way twice.
