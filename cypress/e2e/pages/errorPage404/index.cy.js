import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import testsForAllPages from './tests';
import ampTests from './testsForAMPOnly';
import canonicalTests from './testsForCanonicalOnly';
import { ERROR_PAGE } from '../../../../src/app/routes/utils/pageTypes';

const tests = [testsForAllPages, canonicalTests, ampTests];

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
    path: '/serbian/articles/cdkvrw4gplqo/cyr',
    service: 'serbian',
    runforEnv: ['local', 'live'],
    variant: 'cyr',
    tests,
  },
  {
    path: '/serbian/articles/cdkvrw4gplqo/lat',
    service: 'serbian',
    runforEnv: ['local', 'live'],
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
