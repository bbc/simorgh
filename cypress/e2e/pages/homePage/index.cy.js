import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import getOptimizelyKey from '../../../support/helpers/getOptimizelyKey';
import canonicalTests from './testsForCanonicalOnly';

const tests = [canonicalTests];

const testSuites = [
  {
    path: '/arabic',
    runforEnv: ['local', 'test', 'live'],
    service: 'arabic',
    tests,
  },
  {
    path: '/kyrgyz',
    runforEnv: ['local', 'test', 'live'],
    service: 'kyrgyz',
    tests,
  },
  {
    path: '/persian',
    runforEnv: 'local',
    service: 'persian',
    tests,
  },
  {
    path: '/pidgin',
    runforEnv: ['local', 'test'],
    service: 'pidgin',
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
  {
    path: '/uzbek/lat',
    runforEnv: ['local', 'test', 'live'],
    service: '/uzbek/lat',
    tests,
  },
  {
    path: '/uzbek/cyr',
    runforEnv: ['local', 'test', 'live'],
    service: '/uzbek/cyr',
    tests,
  },
];

const getTestSuites = () => {
  const serviceToRun = Cypress.env('ONLY_SERVICE');

  if (serviceToRun) {
    return testSuites.filter(({ service }) => service === serviceToRun);
  }

  return testSuites;
};

describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept(
      {
        url: `https://cdn.optimizely.com/datafiles/${getOptimizelyKey()}.json`,
      },
      request => {
        request.reply({ statusCode: 404 });
      },
    ).as('disable-optimizely');
  });

  runTestsForPage({
    pageType: HOME_PAGE,
    testSuites: getTestSuites(),
  });
});
