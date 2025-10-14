import { PHOTO_GALLERY_PAGE } from '#app/routes/utils/pageTypes';
import runTestsForPage from '../../support/helpers/runTestsForPage';
import { testsThatAlwaysRunForAllPages as testsForAllPages } from '../testsForAllPages';
import { testsThatFollowSmokeTestConfigForAllCanonicalPages as testsForAllCanonicalPages } from '../testsForAllCanonicalPages';
import { testsThatFollowSmokeTestConfigForAllAMPPages as testsForAllAMPPages } from '../testsForAllAMPPages';
import liteArticleTests from '../articlePage/testsForLiteOnly';

const tests = [testsForAllPages, testsForAllCanonicalPages];

const canonicalSmokeTestSuites = [
  {
    path: '/pidgin/50913502',
    service: 'pidgin',
    runforEnv: ['live'],
    tests,
  },
  {
    path: '/pidgin/sport-23252855',
    service: 'pidgin',
    runforEnv: ['test', 'local'],
    tests,
  },
  {
    path: '/thai/thailand-49950038',
    service: 'thai',
    runforEnv: ['local'],
    tests,
  },
  {
    path: '/zhongwen/trad/chinese-news-49065935',
    service: 'zhongwen',
    runforEnv: ['local'],
    tests,
  },
];

const canonicalNonSmokeTestSuites = [
  {
    path: '/afaanoromoo/oduu-41217768',
    service: 'afaanoromoo',
    runforEnv: ['live'],
    tests,
  },
  {
    path: '/arabic/art-and-culture-38260491',
    service: 'arabic',
    runforEnv: ['local'],
    tests,
  },
  {
    path: '/indonesia/indonesia-41635759',
    service: 'indonesia',
    runforEnv: ['local'],
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
    runforEnv: ['test'],
    tests,
  },
  {
    path: '/persian/magazine-49281981',
    service: 'persian',
    runforEnv: ['live'],
    tests,
  },
  {
    path: '/persian/23104784',
    service: 'persian',
    runforEnv: ['test'],
    tests,
  },
  {
    path: '/serbian/lat/srbija-46748932',
    service: 'serbian',
    runforEnv: ['local'],
    tests,
  },
];

const canonicalTestSuites = Cypress.env('SMOKE')
  ? canonicalSmokeTestSuites
  : canonicalNonSmokeTestSuites;

const ampTestSuites = canonicalTestSuites.map(testSuite => {
  return {
    ...testSuite,
    path: `${testSuite.path}.amp`,
    tests: [testsForAllPages, testsForAllAMPPages],
  };
});

const liteTestSuites = canonicalTestSuites
  .filter(({ service }) => !['news', 'sport', 'newsround'].includes(service))
  .map(testSuite => {
    return {
      ...testSuite,
      path: `${testSuite.path}.lite`,
      tests: [testsForAllPages, liteArticleTests],
    };
  });

runTestsForPage({
  pageType: PHOTO_GALLERY_PAGE,
  headers: {
    'page-type': 'tc2',
  },
  testSuites: [...canonicalTestSuites, ...ampTestSuites, ...liteTestSuites],
});
