# How our Cypress tests work
We have a very bespoke approach to testing. We split our tests in 3 sections: Application, Pages and specialFeatures (features that cannot be tested in a single page visit). 

We only run smoke tests (a subset of all tests) in CI and CD, but have a regular [cron job](https://en.wikipedia.org/wiki/Cron) that runs all e2e tests in this directory against localhost, test.bbc.com and www.bbc.com.

## [Config used in the tests](../support/config)
It's important to familiarise yourself with the service.js config before writing e2e tests. Within there we define which combinations of services and pageTypes should be tested, what the paths to test on are and whether something should be tested while only smoke testing.

## Application
Here we test things that aren't pages such as manifest files and service workers. NB we don't test the .json endpoint for each page here because it's an implicit part of every 'page' test.

## Pages
This is where the overwhelming majority of e2es live. 
Key points:
 - Files in the base of the directory run on all page types.
 - There is a directory per page type where each page's custom test are written.
 - The index.js of each page type directory must use the [runTestsForPage function](../support/runTestsForPage.js), this reduces the number of page visits to 1 visit to the canonical page and 1 visit to the amp version of the same page.

## Special Features
There are features on pages that cannot be tested in one page visit. The only such example is cookie banner/GDPR logic testing. It is not envisaged that any other tests would be added here.

