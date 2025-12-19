import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import canonicalTests from './testsForCanonicalOnly';
import testsForAllCanonicalPages from '../testsForAllCanonicalPages';
import getPathWithSuffix from '../../../support/helpers/getPathWithSuffix';
import { assertPageView } from '../../specialFeatures/atiAnalytics/assertions';
import {
  assertBillboardComponentView,
  assertBillboardComponentClick,
} from '../specialFeatures/atiAnalytics/assertions/billboard';
import { assertLiteSiteSummaryComponentToMainSiteClick } from '../specialFeatures/atiAnalytics/assertions/liteSiteSummary';
import {
  assertMessageBannerComponentClick,
  assertMessageBannerComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/messageBanner';
import {
  assertMostReadComponentClick,
  assertMostReadComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/mostRead';
import {
  assertDropdownNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertScrollableNavigationComponentClick,
  assertScrollableNavigationComponentView,
} from '../specialFeatures/atiAnalytics/assertions/navigation';
import { assertPortraitVideoCarouselComponentView } from '../specialFeatures/atiAnalytics/assertions/portraitVideoCarousel';
import { assertPortraitVideoModalComponentView } from '../specialFeatures/atiAnalytics/assertions/portraitVideoModal';
import {
  assertRadioScheduleComponentClick,
  assertRadioScheduleComponentView,
} from '../specialFeatures/atiAnalytics/assertions/radioSchedule';
import { setUserIDCookie } from '../specialFeatures/atiAnalytics/helpers';
import urlValidationTest from '../../support/helpers/urlValidationTest';

const tests = [canonicalTests, urlValidationTest, testsForAllCanonicalPages];

const testSuites = [
  {
    path: '/arabic',
    runforEnv: ['local', 'test', 'live'],
    service: 'arabic',
    tests,
  },
  {
    path: '/dari',
    runforEnv: ['local', 'test'],
    service: 'dari',
    tests,
  },
  {
    path: '/kyrgyz',
    runforEnv: ['local', 'test', 'live'],
    service: 'kyrgyz',
    tests,
  },
  {
    path: '/magyarul',
    runforEnv: ['local', 'test'],
    service: 'magyarul',
    tests,
  },
  {
    path: '/polska',
    runforEnv: ['local', 'test', 'live'],
    service: 'polska',
    tests,
  },
  {
    path: '/portuguese',
    runforEnv: ['local', 'test', 'live'],
    service: 'portuguese',
    tests,
  },
  {
    path: '/serbian/lat',
    runforEnv: ['local', 'test', 'live'],
    service: '/serbian/lat',
    tests,
  },
  {
    path: '/serbian/cyr',
    runforEnv: ['local', 'test', 'live'],
    service: '/serbian/cyr',
    tests,
  },
  {
    path: '/uzbek/lat',
    runforEnv: ['local', 'test', 'live'],
    service: '/uzbek/lat',
    tests,
  },
  {
    path: '/uzbek/cyr',
    runforEnv: ['local', 'test', 'live'],
    service: '/uzbek/cyr',
    tests,
  },
];

const atiAnalyticsNavigationComponentTests = [
  assertPageView,
  assertScrollableNavigationComponentView,
  assertScrollableNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertDropdownNavigationComponentClick,
];

const atiAnalyticsTestSuites = [
  {
    path: '/afrique',
    runforEnv: ['local', 'test'],
    service: 'afrique',
    pageIdentifier: 'afrique.page',
    siteId: 3,
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertBillboardComponentView,
      assertBillboardComponentClick,
    ],
  },
  {
    path: '/dari',
    runforEnv: ['local', 'test'],
    service: 'dari',
    pageIdentifier: 'dari.page',
    siteId: 142,
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [...atiAnalyticsNavigationComponentTests],
  },
  {
    path: '/kyrgyz',
    runforEnv: ['local', 'live'],
    service: 'kyrgyz',
    pageIdentifier: 'kyrgyz.page',
    siteId: 58,
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      ...atiAnalyticsNavigationComponentTests,
      assertMessageBannerComponentView,
      assertMessageBannerComponentClick,
      assertMostReadComponentView,
      assertMostReadComponentClick,
    ],
  },
  {
    path: '/magyarul',
    runforEnv: ['local', 'test'],
    service: 'magyarul',
    pageIdentifier: 'magyarul.page',
    siteId: 30,
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [assertPageView],
  },
  {
    path: '/pashto',
    runforEnv: ['local', 'live'],
    service: 'pashto',
    pageIdentifier: 'pashto.page',
    siteId: 68,
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertRadioScheduleComponentView,
      assertRadioScheduleComponentClick,
    ],
  },
  {
    path: '/portuguese',
    runforEnv: ['local'],
    service: 'portuguese',
    pageIdentifier: 'portuguese.page',
    siteId: 33,
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertPortraitVideoCarouselComponentView,
      assertPortraitVideoModalComponentView,
    ],
  },
  {
    path: '/serbian/lat',
    runforEnv: ['local', 'test', 'live'],
    service: 'serbian',
    pageIdentifier: 'serbianlat.page',
    siteId: 81,
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertMostReadComponentView,
      assertMostReadComponentClick,
    ],
  },
  {
    path: '/uzbek/cyr',
    runforEnv: ['test', 'live'],
    service: 'uzbek',
    pageIdentifier: 'uzbekcyr.page',
    siteId: 96,
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertMessageBannerComponentView,
      assertMessageBannerComponentClick,
      assertMostReadComponentView,
    ],
  },
];

let smokeTests = [];

// TEMP: Disable homepage smoke tests on the test environment due to flakiness
if (Cypress.env('SMOKE')) {
  smokeTests = testSuites.map(testSuite => {
    return {
      ...testSuite,
      runforEnv: testSuite.runforEnv.filter(env => env !== 'test'),
    };
  });
}

const atiAnalyticsliteTestSuites = atiAnalyticsTestSuites.map(testSuite => {
  const excludedLiteTests = [
    assertDropdownNavigationComponentView, // Dropdown navigation removed from all pages, as it requires JS
    assertDropdownNavigationComponentClick, // Dropdown navigation removed from all pages, as it requires JS
  ];

  const liteSiteTests = testSuite.tests.filter(
    test => !excludedLiteTests.includes(test),
  );

  // All lite enabled pages should have the Lite Site Summary component
  liteSiteTests.push(assertLiteSiteSummaryComponentToMainSiteClick);

  return {
    ...testSuite,
    path: getPathWithSuffix({ path: testSuite.path, suffix: '.lite' }),
    applicationType: 'lite',
    useReverb: true,
    siteId: testSuite.service === 'magyarul' ? 134 : testSuite.siteId,
    tests: [...liteSiteTests],
  };
});

runTestsForPage({
  pageType: HOME_PAGE,
  testSuites: Cypress.env('SMOKE') ? smokeTests : testSuites,
});

runTestsForPage({
  pageType: HOME_PAGE,
  testSuites: atiAnalyticsTestSuites,
  beforeAll: [setUserIDCookie],
  testIsolation: true,
});

runTestsForPage({
  pageType: HOME_PAGE,
  testSuites: atiAnalyticsliteTestSuites,
  beforeAll: [setUserIDCookie],
});
