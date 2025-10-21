import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import testsForAllPages from './tests';
import { ERROR_PAGE } from '../../../../src/app/routes/utils/pageTypes';

const tests = [testsForAllPages];

const canonicalTestSuites = [
  {
    path: '/arabic/articles/c123456abcdo',
    service: 'arabic',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/mundo/articles/c123456abcdo',
    service: 'mundo',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/serbian/articles/c123456abcdo/cyr',
    service: 'serbian',
    runforEnv: ['local', 'test', 'live'],
    variant: 'cyr',
    tests,
  },
  {
    path: '/serbian/articles/c123456abcdo/lat',
    service: 'serbian',
    runforEnv: ['local', 'test', 'live'],
    variant: 'lat',
    tests,
  },
  {
    path: '/ukrainian/articles/c123456abcdo',
    service: 'ukrainian',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
];

const ampTestSuites = [...canonicalTestSuites].map(testSuite => {
  return {
    ...testSuite,
    path: `${testSuite.path}.amp`,
  };
});

ampTestSuites.push({
  path: '/news/articles/cxvxrj8tvppo.amp',
  service: 'news',
  runforEnv: ['local', 'test', 'live'],
  tests,
});

runTestsForPage({
  failOnStatusCode: false,
  pageType: ERROR_PAGE,
  testSuites: [...canonicalTestSuites, ...ampTestSuites],
});
