import { MOST_READ_PAGE } from '#app/routes/utils/pageTypes';
import runTestsForPage from '../../../support/helpers/runTestsForPage';
import {
  assertMostReadComponentClick,
  assertMostReadComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/mostRead';
import {
  assertDropdownNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertScrollableNavigationComponentClick,
  assertScrollableNavigationComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/navigation';
import { assertLiteSiteSummaryComponentToMainSiteClick } from '../../specialFeatures/atiAnalytics/assertions/liteSiteSummary';
import getPathWithSuffix from '../../../support/helpers/getPathWithSuffix';
import { assertPageView } from '../../specialFeatures/atiAnalytics/assertions';
import testsForAllCanonicalPages from '../../testsForAllCanonicalPages';
import testsForAllPages from '../../testsForAllPages';
import crossPlatformTests from './tests';
import testsForCanonicalOnly from './testsForCanonicalOnly';

const tests = [
  crossPlatformTests,
  testsForCanonicalOnly,
  testsForAllPages,
  testsForAllCanonicalPages,
];

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
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/igbo/popular/read',
    service: 'igbo',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/serbian/cyr/popular/read',
    service: 'serbian',
    variant: 'cyr',
    runforEnv: ['test', 'live'],
    tests,
  },
];

const liteTestSuites = testSuites.map(testSuite => ({
  ...testSuite,
  path: `${testSuite.path}.lite`,
  tests: [crossPlatformTests],
}));

const atiAnalyticsTestSuites = [
  {
    path: '/pidgin/popular/read',
    runforEnv: ['local', 'test', 'live'],
    service: 'pidgin',
    pageIdentifier: 'pidgin.popular.read.page',
    siteId: 70,
    applicationType: 'responsive',
    contentType: 'list-datadriven',
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
    tests: [...liteSiteTests],
  };
});

runTestsForPage({
  pageType: MOST_READ_PAGE,
  testSuites: [...testSuites, ...liteTestSuites],
});

runTestsForPage({
  pageType: MOST_READ_PAGE,
  testSuites: atiAnalyticsTestSuites,
  testIsolation: true,
});

runTestsForPage({
  pageType: MOST_READ_PAGE,
  testSuites: [...atiAnalyticsLiteTestSuites],
});
