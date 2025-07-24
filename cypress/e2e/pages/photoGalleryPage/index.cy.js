import runTestsForPage from '#cypress/support/helpers/runTestsForPage';
import { PHOTO_GALLERY_PAGE } from '../../../../src/app/routes/utils/pageTypes';
import canonicalArticleTests from './testsForCanonicalOnly';

const tests = [canonicalArticleTests];

const smokeTestSuites = [
  {
    path: '/afaanoromoo/oduu-41217768',
    service: 'afaanoromoo',
    runforEnv: 'local',
    tests,
  },
];

const nonSmokeTestSuites = [
  {
    path: '/afaanoromoo/oduu-41217768',
    service: 'afaanoromoo',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/afrique/region-39269126',
    service: 'afrique',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/amharic/42743191',
    service: 'amharic',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/arabic/art-and-culture-38260491',
    service: 'arabic',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/azeri/azerbaijan-44208474',
    service: 'azeri',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/bengali/news-38827173',
    service: 'bengali',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/burmese/media-47680015',
    service: 'burmese',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/gahuza/amakuru-43894701',
    service: 'gahuza',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/gujarati/international-41345658',
    service: 'gujarati',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/hindi/india-50198153',
    service: 'hindi',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/igbo/afirika-49666505',
    service: 'igbo',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/indonesia/indonesia-41635759',
    service: 'indonesia',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/indonesia/indonesia-41635759',
    service: 'indonesia',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/japanese/features-and-analysis-42786589',
    service: 'japanese',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/korean/features-41397333',
    service: 'korean',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/kyrgyz/world-40847556',
    service: 'kyrgyz',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/kyrgyz/world-40847556',
    service: 'kyrgyz',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/marathi/india-42894522',
    service: 'marathi',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/mundo/deportes-36935058',
    service: 'mundo',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/mundo/noticias-23147451',
    service: 'mundo',
    runforEnv: 'test',
    tests,
  },
  {
    path: '/mundo/noticias-23147451',
    service: 'mundo',
    runforEnv: 'test',
    tests,
  },
  {
    path: '/nepali/news-50627370',
    service: 'nepali',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/pashto/arts-and-literature-50230813',
    service: 'pashto',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/persian/magazine-49281981',
    service: 'persian',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/persian/23104784',
    service: 'persian',
    runforEnv: 'test',
    tests,
  },
];

const testSuites = Cypress.env('SMOKE') ? smokeTestSuites : nonSmokeTestSuites;

runTestsForPage({
  pageType: PHOTO_GALLERY_PAGE,
  testSuites,
});
