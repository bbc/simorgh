import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import testsForCanonicalOnly from './testsForCanonicalOnly';
import crossPlatformTests from './tests';
import testsForAllPages from '../testsForAllPages';
import testsForAllCanonicalPages from '../testsForAllCanonicalPages';
import { setUserIDCookie } from '../../specialFeatures/atiAnalytics/helpers';
import { assertPageView } from '../../specialFeatures/atiAnalytics/assertions';
import getPathWithSuffix from '../../../support/helpers/getPathWithSuffix';
import { assertLiteSiteSummaryComponentToMainSiteClick } from '../../specialFeatures/atiAnalytics/assertions/liteSiteSummary';
import {
  assertDropdownNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertScrollableNavigationComponentClick,
  assertScrollableNavigationComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/navigation';
import {
  assertMostReadComponentClick,
  assertMostReadComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/mostRead';

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

const atiAnalyticsTestSuites = [
  {
    path: '/gahuza/popular/read',
    runforEnv: ['local', 'test', 'live'],
    service: 'gahuza',
    pageIdentifier: 'gahuza.popular.read.page',
    siteId: 40,
    applicationType: 'responsive',
    contentType: 'list-datadriven',
    useReverb: true,
    tests: [
      assertPageView,
      assertDropdownNavigationComponentClick,
      assertDropdownNavigationComponentView,
      assertScrollableNavigationComponentView,
      assertScrollableNavigationComponentClick,
      assertMostReadComponentView,
      assertMostReadComponentClick,
    ],
  },
];

const atiAnalyticsAmpTestSuites = atiAnalyticsTestSuites.map(testSuite => {
  return {
    ...testSuite,
    path: getPathWithSuffix({ path: testSuite.path, suffix: '.amp' }),
    useReverb: true,
    applicationType: 'amp',
    tests: [assertPageView],
  };
});

const atiAnalyticsLiteTestSuites = atiAnalyticsTestSuites.map(testSuite => {
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
    tests: [...liteSiteTests],
  };
});

runTestsForPage({
  pageType,
  testSuites: [...testSuites, ...ampTestSuites, ...liteTestSuites],
});

runTestsForPage({
  pageType,
  testSuites: atiAnalyticsTestSuites,
  beforeAll: [setUserIDCookie],
  testIsolation: true,
});

runTestsForPage({
  pageType,
  testSuites: [...atiAnalyticsAmpTestSuites, ...atiAnalyticsLiteTestSuites],
  beforeAll: [setUserIDCookie],
});
