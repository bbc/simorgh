import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import crossPlatformTests from './tests';
import { TOPIC_PAGE } from '../../../../src/app/routes/utils/pageTypes';
import urlValidationTest from '../../../support/helpers/urlValidationTest';
import testsForAllCanonicalPages from '../testsForAllCanonicalPages';
import getPathWithSuffix from '../../../support/helpers/getPathWithSuffix';
import { assertLiteSiteSummaryComponentToMainSiteClick } from '../../specialFeatures/atiAnalytics/assertions/liteSiteSummary';
import { setUserIDCookie } from '../../specialFeatures/atiAnalytics/helpers';
import { assertPageView } from '../../specialFeatures/atiAnalytics/assertions';
import {
  assertDropdownNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertScrollableNavigationComponentClick,
  assertScrollableNavigationComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/navigation';
import {
  assertMessageBannerComponentClick,
  assertMessageBannerComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/messageBanner';

const tests = [
  crossPlatformTests,
  urlValidationTest,
  testsForAllCanonicalPages,
];

const testSuites = [
  {
    path: '/arabic/topics/cwr9j7nv58nt',
    service: 'arabic',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/persian/topics/cw9qgeqd1zqt',
    service: 'persian',
    runforEnv: ['test', 'live'],
    tests: [urlValidationTest],
  },
  {
    path: '/pidgin/topics/c95y35941vrt',
    service: 'pidgin',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/portuguese/topics/cx2ggnx4j72t',
    service: 'portuguese',
    runforEnv: ['test', 'live'],
    tests: [urlValidationTest],
  },
  {
    path: '/serbian/topics/c1gd303q6y6t/lat',
    service: 'serbian',
    runforEnv: ['local', 'test', 'live'],
    tests,
    variant: 'lat',
  },
  {
    path: '/ukrainian/topics/c61k92vrqz6t', // ukrainian in Russian
    service: 'ukrainian',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/uzbek/topics/c8y949r98pgt/cyr',
    service: 'uzbek',
    runforEnv: ['local', 'test', 'live'],
    tests,
    variant: 'cyr',
  },
  {
    path: '/uzbek/topics/c8y949r98pgt/lat',
    service: 'uzbek',
    runforEnv: ['local', 'test', 'live'],
    tests,
    variant: 'lat',
  },
];

const atiAnalyticsTestSuites = [
  {
    path: '/marathi/topics/c1wmk63rjkvt',
    runforEnv: ['local', 'live'],
    service: 'marathi',
    pageIdentifier: 'marathi.topics.c1wmk63rjkvt.page',
    siteId: 59,
    applicationType: 'responsive',
    contentType: 'index-category',
    tests: [assertPageView],
  },
  {
    path: '/portuguese/topics/cx2ggnx4j72t',
    runforEnv: ['test', 'live'],
    service: 'portuguese',
    pageIdentifier: 'portuguese.topics.cx2ggnx4j72t.page',
    siteId: 33,
    applicationType: 'responsive',
    contentType: 'index-category',
    tests: [
      assertPageView,
      assertScrollableNavigationComponentView,
      assertScrollableNavigationComponentClick,
      assertDropdownNavigationComponentView,
      assertDropdownNavigationComponentClick,
      assertMessageBannerComponentView,
      assertMessageBannerComponentClick,
    ],
  },
];

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
    siteId: testSuite.siteId,
    tests: [...liteSiteTests],
  };
});

runTestsForPage({
  pageType: TOPIC_PAGE,
  testSuites,
});

runTestsForPage({
  pageType: TOPIC_PAGE,
  testSuites: atiAnalyticsTestSuites,
  beforeAll: [setUserIDCookie],
  testIsolation: true,
});

runTestsForPage({
  pageType: TOPIC_PAGE,
  testSuites: atiAnalyticsLiteTestSuites,
  beforeAll: [setUserIDCookie],
});
