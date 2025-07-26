import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import { testsThatAlwaysRunForAllPages as testsForAllPages } from '../testsForAllPages';
import { testsThatFollowSmokeTestConfigForAllCanonicalPages as testsForAllCanonicalPages } from '../testsForAllCanonicalPages';
// import { testsThatFollowSmokeTestConfigForAllAMPPages as testsForAllAMPPages } from '../testsForAllAMPPages';
import { PHOTO_GALLERY_PAGE } from '../../../../src/app/routes/utils/pageTypes';

const canonicalTests = [testsForAllPages, testsForAllCanonicalPages];

const canonicalSmokeTestSuites = [
  {
    path: '/afaanoromoo/oduu-41217768',
    service: 'afaanoromoo',
    runforEnv: ['local', 'test', 'live'],
    canonicalTests,
  },
];

const canonicalNonSmokeTestSuites = [
  {
    path: '/afaanoromoo/oduu-41217768',
    service: 'afaanoromoo',
    runforEnv: ['local', 'test', 'live'],
    canonicalTests,
  },
  {
    path: '/afrique/region-39269126',
    service: 'afrique',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/amharic/42743191',
    service: 'amharic',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/arabic/art-and-culture-38260491',
    service: 'arabic',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/azeri/azerbaijan-44208474',
    service: 'azeri',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/bengali/news-38827173',
    service: 'bengali',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/burmese/media-47680015',
    service: 'burmese',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/gahuza/amakuru-43894701',
    service: 'gahuza',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/gujarati/international-41345658',
    service: 'gujarati',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/hindi/india-50198153',
    service: 'hindi',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/igbo/afirika-49666505',
    service: 'igbo',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/indonesia/indonesia-41635759',
    service: 'indonesia',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/indonesia/indonesia-41635759',
    service: 'indonesia',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/japanese/features-and-analysis-42786589',
    service: 'japanese',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/korean/features-41397333',
    service: 'korean',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/kyrgyz/world-40847556',
    service: 'kyrgyz',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/kyrgyz/world-40847556',
    service: 'kyrgyz',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/marathi/india-42894522',
    service: 'marathi',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/mundo/deportes-36935058',
    service: 'mundo',
    runforEnv: ['local', 'live'],
    canonicalTests,
  },
  {
    path: '/mundo/noticias-23147451',
    service: 'mundo',
    runforEnv: 'test',
    canonicalTests,
  },
  {
    path: '/mundo/noticias-23147451',
    service: 'mundo',
    runforEnv: 'test',
    canonicalTests,
  },
  {
    path: '/nepali/news-50627370',
    service: 'nepali',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/pashto/arts-and-literature-50230813',
    service: 'pashto',
    runforEnv: 'local',
    canonicalTests,
  },
  {
    path: '/persian/magazine-49281981',
    service: 'persian',
    runforEnv: ['local', 'live'],
    canonicalTests,
  },
  {
    path: '/persian/23104784',
    service: 'persian',
    runforEnv: 'test',
    canonicalTests,
  },
];

const canonicalTestSuites = Cypress.env('SMOKE')
  ? canonicalSmokeTestSuites
  : canonicalNonSmokeTestSuites;

// const ampTestSuites = [
//   ...canonicalTestSuites,
//   ...ampOnlyNonSmokeTestSuites,
// ].map(testSuite => {
//   return {
//     ...testSuite,
//     path: `${testSuite.path}.amp`,
//     tests: [...ampTests],
//   };
// });

// const liteTestSuites = canonicalTestSuites
//   .filter(({ service }) => !['news', 'sport', 'newsround'].includes(service))
//   .map(testSuite => {
//     return {
//       ...testSuite,
//       path: `${testSuite.path}.lite`,
//       tests: [liteTests],
//     };
//   });

// describe('storyPage', () => {
//   beforeEach(() => {
//     cy.intercept(
//       {
//         url: `https://cdn.optimizely.com/datafiles/${getOptimizelyKey()}.json`,
//       },
//       request => {
//         request.reply({ statusCode: 404 });
//       },
//     ).as('disable-optimizely');
//   });

runTestsForPage({
  pageType: PHOTO_GALLERY_PAGE,
  testSuites: [...canonicalTestSuites],
});
// });
