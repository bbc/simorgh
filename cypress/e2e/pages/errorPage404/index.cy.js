import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import testsThatFollowSmokeTestConfig from './tests';
import testsThatFollowSmokeTestConfigForAMPOnly from './testsForAMPOnly';
import testsThatFollowSmokeTestConfigForCanonicalOnly from './testsForCanonicalOnly';
import { ERROR_PAGE } from '../../../../src/app/routes/utils/pageTypes';

const canonicalTests = [
  testsThatFollowSmokeTestConfig,
  testsThatFollowSmokeTestConfigForCanonicalOnly,
  testsThatFollowSmokeTestConfigForAMPOnly,
];

const canonicalSmokeTestSuites = [
  {
    path: '/news/articles/cxvxrj8tvppo?renderer_env=live',
    service: 'news',
    runforEnv: 'local',
    tests: canonicalTests,
  },
  {
    path: '/persian/articles/cxvxrj8tvppo',
    service: 'persian',
    runforEnv: 'local',
    tests: canonicalTests,
  },
  {
    path: '/zhongwen/articles/cabcdefghijo/simp',
    service: 'zhongwen',
    runforEnv: 'local',
    variant: 'simp',
    tests: canonicalTests,
  },
  {
    path: '/zhongwen/articles/cabcdefghijo/trad',
    service: 'zhongwen',
    runforEnv: 'local',
    variant: 'trad',
    tests: canonicalTests,
  },
];

const canonicalNonSmokeTestSuites = [
  {
    path: '/afrique/articles/c123456abcdo',
    service: 'afrique',
    runforEnv: 'local',
    tests: canonicalTests,
  },
  {
    path: '/amharic/articles/c123456abcdo',
    service: 'amharic',
    runforEnv: 'local',
    tests: canonicalTests,
  },
  {
    path: '/arabic/articles/c123456abcdo',
    service: 'arabic',
    runforEnv: 'local',
    tests: canonicalTests,
  },
  {
    path: '/cymrufyw/erthyglau/c123456abcdo',
    service: 'cymrufyw',
    runforEnv: 'local',
    tests: canonicalTests,
  },
  {
    path: '/hausa/articles/c123456abcdo',
    service: 'hausa',
    runforEnv: 'local',
    tests: canonicalTests,
  },
  {
    path: '/hindi/articles/c123456abcdo',
    service: 'hindi',
    runforEnv: 'local',
    tests: canonicalTests,
  },
  {
    path: '/japanese/articles/c123456abcdo',
    service: 'japanese',
    runforEnv: 'local',
    tests: canonicalTests,
  },
  {
    path: '/korean/articles/c123456abcdo',
    service: 'korean',
    runforEnv: 'local',
    tests: canonicalTests,
  },
  {
    path: '/kyrgyz/articles/c123456abcdo',
    service: 'kyrgyz',
    runforEnv: 'local',
    tests: canonicalTests,
  },
  {
    path: '/mundo/articles/c123456abcdo',
    service: 'mundo',
    runforEnv: 'local',
    tests: canonicalTests,
  },
  {
    path: '/pidgin/articles/cxvxrj8tvppo',
    service: 'pidgin',
    runforEnv: 'local',
    tests: canonicalTests,
  },
  {
    path: '/punjabi/articles/c123456abcdo',
    service: 'punjabi',
    runforEnv: 'local',
    tests: canonicalTests,
  },
  {
    path: '/russian/articles/c123456abcdo',
    service: 'russian',
    runforEnv: 'local',
    tests: canonicalTests,
  },
  {
    path: '/tamil/articles/c123456abcdo',
    service: 'tamil',
    runforEnv: 'local',
    tests: canonicalTests,
  },
  {
    path: '/ukrainian/articles/c123456abcdo',
    service: 'ukrainian',
    runforEnv: 'local',
    tests: canonicalTests,
  },
];

const canonicalTestSuites = Cypress.env('SMOKE')
  ? canonicalSmokeTestSuites
  : canonicalNonSmokeTestSuites;

const ampTestSuites = [...canonicalTestSuites].map(testSuite => {
  return {
    ...testSuite,
    path: `${testSuite.path}.amp`,
  };
});

runTestsForPage({
  failOnStatusCode: false,
  pageType: ERROR_PAGE,
  testSuites: [...canonicalTestSuites, ...ampTestSuites],
});
