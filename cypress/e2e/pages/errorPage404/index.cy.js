import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import testsForAllPages from './tests';
import ampTests from './testsForAMPOnly';
import canonicalTests from './testsForCanonicalOnly';
import { ERROR_PAGE } from '../../../../src/app/routes/utils/pageTypes';
import liteTests from '../articles/testsForLiteOnly';

const tests = [testsForAllPages, canonicalTests, ampTests];

const canonicalTestSuites = [
  {
    path: '/arabic/articles/c123456abcdo',
    service: 'arabic',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/news/articles/cxvxrj8tvppo',
    service: 'news',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/kyrgyz/articles/c123456abcdo',
    service: 'kyrgyz',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/mundo/articles/c123456abcdo',
    service: 'mundo',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/persian/articles/cxvxrj8tvppo',
    service: 'persian',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/pidgin/articles/cxvxrj8tvppo',
    service: 'pidgin',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/serbian/articles/cabcdefghijo/cyr',
    service: 'serbian',
    runforEnv: 'local',
    variant: 'cyr',
    tests,
  },
  {
    path: '/serbian/articles/cabcdefghijo/lat',
    service: 'serbian',
    runforEnv: 'local',
    variant: 'lat',
    tests,
  },
  {
    path: '/russian/articles/c123456abcdo',
    service: 'russian',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/ukrainian/articles/c123456abcdo',
    service: 'ukrainian',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/zhongwen/articles/cabcdefghijo/simp',
    service: 'zhongwen',
    runforEnv: 'local',
    variant: 'simp',
    tests,
  },
  {
    path: '/zhongwen/articles/cabcdefghijo/trad',
    service: 'zhongwen',
    runforEnv: 'local',
    variant: 'trad',
    tests,
  },
];

const canonicalTestSuitesToRun = canonicalTestSuites.filter(
  testSuite => testSuite.service !== 'news',
);

const ampTestSuites = [...canonicalTestSuites].map(testSuite => {
  return {
    ...testSuite,
    path: `${testSuite.path}.amp`,
  };
});

const liteTestSuitesToRun = canonicalTestSuites.map(testSuite => {
  return {
    ...testSuite,
    path: `${testSuite.path}.lite`,
    tests: [liteTests],
  };
});

runTestsForPage({
  failOnStatusCode: false,
  pageType: ERROR_PAGE,
  testSuites: [
    ...canonicalTestSuitesToRun,
    ...ampTestSuites,
    ...liteTestSuitesToRun,
  ],
});
