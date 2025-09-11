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
//   {
//     path: '/afrique/articles/c123456abcdo',
//     service: 'afrique',
//     runforEnv: 'local',
//     tests,
//   },
//   {
//     path: '/amharic/articles/c123456abcdo',
//     service: 'amharic',
//     runforEnv: 'local',
//     tests,
//   },
//   {
//     path: '/cymrufyw/erthyglau/c123456abcdo',
//     service: 'cymrufyw',
//     runforEnv: 'local',
//     tests,
//   },
//   {
//     path: '/hausa/articles/c123456abcdo',
//     service: 'hausa',
//     runforEnv: 'local',
//     tests,
//   },
//   {
//     path: '/hindi/articles/c123456abcdo',
//     service: 'hindi',
//     runforEnv: 'local',
//     tests,
//   },
//   {
//     path: '/japanese/articles/c123456abcdo',
//     service: 'japanese',
//     runforEnv: 'local',
//     tests,
//   },
//   {
//     path: '/korean/articles/c123456abcdo',
//     service: 'korean',
//     runforEnv: 'local',
//     tests,
//   },
//   {
//     path: '/punjabi/articles/c123456abcdo',
//     service: 'punjabi',
//     runforEnv: 'local',
//     tests,
//   },
//   {
//     path: '/russian/articles/c123456abcdo',
//     service: 'russian',
//     runforEnv: 'local',
//     tests,
//   },
//   {
//     path: '/tamil/articles/c123456abcdo',
//     service: 'tamil',
//     runforEnv: 'local',
//     tests,
//   },
// ];

const canonicalTestSuitesToRun = canonicalTestSuites.filter(
  testSuite => testSuite.service !== 'news',
);

const ampTestSuites = [...canonicalTestSuites].map(testSuite => {
  return {
    ...testSuite,
    path: `${testSuite.path}.amp`,
  };
});

runTestsForPage({
  failOnStatusCode: false,
  pageType: ERROR_PAGE,
  testSuites: [...canonicalTestSuitesToRun, ...ampTestSuites],
});
