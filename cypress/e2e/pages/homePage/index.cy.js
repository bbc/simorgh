import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import canonicalTests from './testsForCanonicalOnly';
import testsForAllPages from '../testsForAllPages';
import urlValidationTest from '../../../support/helpers/urlValidationTest';

const tests = [canonicalTests, testsForAllPages, urlValidationTest];

const testSuites = [
  {
    path: '/arabic',
    runforEnv: ['local', 'test', 'live'],
    service: 'arabic',
    tests,
  },
  {
    path: '/dari',
    runforEnv: ['local', 'test'],
    service: 'dari',
    tests,
  },
  {
    path: '/polska',
    runforEnv: ['local', 'test', 'live'],
    service: 'polska',
    tests,
  },
  {
    path: '/portuguese',
    runforEnv: ['local', 'test', 'live'],
    service: 'portuguese',
    tests,
  },
  {
    path: '/serbian/lat',
    runforEnv: ['local', 'test', 'live'],
    service: '/serbian/lat',
    tests,
  },
  {
    path: '/serbian/cyr',
    runforEnv: ['local', 'test', 'live'],
    service: '/serbian/cyr',
    tests,
  },
];

let smokeTests = [];

// TEMP: Disable homepage smoke tests on the test environment due to flakiness
if (Cypress.env('SMOKE')) {
  smokeTests = testSuites.map(testSuite => {
    return {
      ...testSuite,
      runforEnv: testSuite.runforEnv.filter(env => env !== 'test'),
    };
  });
}

runTestsForPage({
  pageType: HOME_PAGE,
  testSuites: Cypress.env('SMOKE') ? smokeTests : testSuites,
});
