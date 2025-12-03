import { assertPageView } from '#cypress/e2e/specialFeatures/atiAnalytics/assertions';
import { PHOTO_GALLERY_PAGE } from '#app/routes/utils/pageTypes';
import runTestsForPage, {
  TestDataType,
} from '../../support/helpers/runTestsForPage';
import testsForAllPages from '../testsForAllPages';
import testsForAllCanonicalPages from '../testsForAllCanonicalPages';
import testsForAllAMPPages from '../testsForAllAMPPages';
import liteArticleTests from '../articlePage/testsForLiteOnly';
import { setUserIDCookie } from '../specialFeatures/atiAnalytics/helpers';
import {
  assertDropdownNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertScrollableNavigationComponentClick,
  assertScrollableNavigationComponentView,
} from '../specialFeatures/atiAnalytics/assertions/navigation';

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

const atiAnalyticsTests = [
  assertPageView,
  assertDropdownNavigationComponentView, // Dropdown navigation removed from all pages, as it requires JS
  assertDropdownNavigationComponentClick, // Dropdown navigation removed from all pages, as it requires JS
  assertScrollableNavigationComponentView,
  assertScrollableNavigationComponentClick,
];

const atiAnalyticsTestSuites = [
  {
    path: '/afaanoromoo/oduu-41217768',
    runforEnv: ['live'],
    service: 'afaanoromoo',
    pageIdentifier: 'afaanoromoo.news.photo_gallery.41217768.page',
    siteId: 2,
    applicationType: 'responsive',
    contentType: 'article-photo-gallery',
    useReverb: true,
    tests: [...atiAnalyticsTests],
  },
  {
    path: '/persian/magazine-49281981',
    runforEnv: ['live'],
    service: 'persian',
    pageIdentifier: 'persian.magazine.photo_gallery.49281981.page',
    siteId: 69,
    applicationType: 'responsive',
    contentType: 'article-photo-gallery',
    useReverb: true,
    tests: [...atiAnalyticsTests],
  },
  {
    path: '/pidgin/50913502',
    runforEnv: ['live'],
    service: 'pidgin',
    pageIdentifier: 'pidgin.photo_gallery.50913502.page',
    siteId: 70,
    applicationType: 'responsive',
    contentType: 'article-photo-gallery',
    useReverb: true,
    tests: [...atiAnalyticsTests],
  },
  {
    path: '/thai/thailand-49950038',
    runforEnv: ['local', 'live'],
    service: 'thai',
    pageIdentifier: 'thai.thailand.photo_gallery.49950038.page',
    siteId: 90,
    applicationType: 'responsive',
    contentType: 'article-photo-gallery',
    useReverb: true,
    tests: [...atiAnalyticsTests],
  },
  {
    path: '/zhongwen/trad/chinese-news-49065935',
    runforEnv: ['local', 'live'],
    service: 'zhongwen',
    pageIdentifier: 'zhongwentrad.chinese_news.photo_gallery.49065935.page',
    siteId: 38,
    applicationType: 'responsive',
    contentType: 'article-photo-gallery',
    useReverb: true,
    tests: [...atiAnalyticsTests],
  },
] as unknown as TestDataType[];

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

runTestsForPage({
  pageType: PHOTO_GALLERY_PAGE,
  testSuites: atiAnalyticsTestSuites,
  beforeAll: [setUserIDCookie],
  testIsolation: true,
});
