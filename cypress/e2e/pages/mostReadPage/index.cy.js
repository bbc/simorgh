import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import testsForCanonicalOnly from './testsForCanonicalOnly';
import crossPlatformTests from './tests';
import testsForAllPages from '../testsForAllPages';
import testsForAllCanonicalPages from '../testsForAllCanonicalPages';

const pageType = 'mostReadPage';
const tests = [
  crossPlatformTests,
  testsForCanonicalOnly,
  testsForAllPages,
  testsForAllCanonicalPages,
];

/**
 * Use a selection of services to ensure Most Read page renders as expected
 * arabic: RTL service
 * igbo: small service, only 5 items displayed
 * pidgin: LTR service
 * serbian: service with variant
 */
const testSuites = [
  {
    path: '/pidgin/popular/read',
    service: 'pidgin',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/arabic/popular/read',
    service: 'arabic',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/igbo/popular/read',
    service: 'igbo',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/serbian/cyr/popular/read',
    service: 'serbian',
    variant: 'cyr',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
];

const ampTestSuites = testSuites.map(testSuite => {
  return {
    ...testSuite,
    path: `${testSuite.path}.amp`,
    tests: [crossPlatformTests],
  };
});

const liteTestSuites = testSuites.map(testSuite => {
  return {
    ...testSuite,
    path: `${testSuite.path}.lite`,
    tests: [crossPlatformTests],
  };
});

runTestsForPage({
  pageType,
  testSuites: [...testSuites, ...ampTestSuites, ...liteTestSuites],
});
