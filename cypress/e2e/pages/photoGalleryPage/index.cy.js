import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import { testsThatAlwaysRunForAllPages as testsForAllPages } from '../testsForAllPages';
import { testsThatFollowSmokeTestConfigForAllCanonicalPages as testsForAllCanonicalPages } from '../testsForAllCanonicalPages';
import { testsThatFollowSmokeTestConfigForAllAMPPages as testsForAllAMPPages } from '../testsForAllAMPPages';
import { PHOTO_GALLERY_PAGE } from '../../../../src/app/routes/utils/pageTypes';
import getOptimizelyKey from '../../../support/helpers/getOptimizelyKey';

const tests = [
  testsForAllPages,
  testsForAllCanonicalPages,
  testsForAllAMPPages,
];

const canonicalSmokeTestSuites = [
  {
    path: '/afaanoromoo/oduu-41217768',
    service: 'afaanoromoo',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/pidgin/50913502',
    service: 'pidgin',
    runforEnv: 'live',
    tests,
  },
  {
    path: '/pidgin/sport-23252855',
    service: 'pidgin',
    runforEnv: ['test', 'local'],
    tests,
  },
  {
    path: '/pidgin/sport-23252855',
    service: 'pidgin',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/thai/thailand-49950038',
    service: 'thai',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/zhongwen/trad/chinese-news-49065935',
    service: 'zhongwen',
    runforEnv: 'local',
    tests,
  },
];

const canonicalNonSmokeTestSuites = [
  {
    path: '/afaanoromoo/oduu-41217768',
    service: 'afaanoromoo',
    runforEnv: ['local', 'test', 'live'],
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
  {
    path: '/portuguese/geral-40302633',
    service: 'portuguese',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/punjabi/india-42928885',
    service: 'punjabi',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/russian/features-45782775',
    service: 'russian',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/serbian/lat/srbija-46748932',
    service: 'serbian',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/sinhala/world-37657374',
    service: 'sinhala',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/somali/war-45947544',
    service: 'somali',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/swahili/habari-48185450',
    service: 'swahili',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/tamil/global-47758688',
    service: 'tamil',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/telugu/india-42321552',
    service: 'telugu',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/tigrinya/news-49944566',
    service: 'tigrinya',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/turkce/haberler-dunya-50924340',
    service: 'turkce',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/ukrainian/features-41278900',
    service: 'ukrainian',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/urdu/pakistan-48242478',
    service: 'urdu',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/uzbek/central-asia-46716844',
    service: 'uzbek',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/vietnamese/world-48605529',
    service: 'vietnamese',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/yoruba/media-50970014',
    service: 'yoruba',
    runforEnv: 'local',
    tests,
  },
];

const canonicalTestSuites = Cypress.env('SMOKE')
  ? canonicalSmokeTestSuites
  : canonicalNonSmokeTestSuites;

const ampTestSuites = [...canonicalTestSuites].map(testSuite => {
  return {
    ...testSuite,
    path: `${testSuite.path}.amp`,
    tests: [testsForAllAMPPages],
  };
});

const liteTestSuites = canonicalTestSuites
  .filter(({ service }) => !['news', 'sport', 'newsround'].includes(service))
  .map(testSuite => {
    return {
      ...testSuite,
      path: `${testSuite.path}.lite`,
      tests,
    };
  });

describe('PGL', () => {
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
    pageType: PHOTO_GALLERY_PAGE,
    testSuites: [...canonicalTestSuites, ...ampTestSuites, ...liteTestSuites],
  });
});
