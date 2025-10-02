/* eslint-disable import/no-relative-packages */
import { LIVE_PAGE } from '../../../../../src/app/routes/utils/pageTypes';
import { assertPageView } from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions';
import { setUserIDCookie } from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/helpers';

import {
  assertScrollableNavigationComponentView,
  assertScrollableNavigationComponentClick,
} from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions/navigation';
import { assertLiteSiteSummaryComponentToMainSiteClick } from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions/liteSiteSummary';

import runTestsForPage from '../../../support/helpers/runTestsForPage';

const canonicalTestSuites = [
  {
    path: '/burmese/live/ckg19998pldt',
    runforEnv: ['local', 'live'],
    service: 'burmese',
    pageIdentifier: 'live_coverage.ckg19998pldt.page',
    siteId: 35,
    applicationType: 'responsive',
    contentType: 'live-coverage',
    componentTrackingContentType: LIVE_PAGE,
    useReverb: true,
    tests: [
      assertPageView,
      assertScrollableNavigationComponentView,
      assertScrollableNavigationComponentClick,
    ],
  },
  {
    path: '/mundo/live/c7dkx155e626t',
    runforEnv: ['local'],
    service: 'mundo',
    pageIdentifier: 'live_coverage.c7dkx155e626t.page',
    siteId: 62,
    applicationType: 'responsive',
    contentType: 'live-coverage',
    componentTrackingContentType: LIVE_PAGE,
    useReverb: true,
    tests: [
      assertPageView,
      assertScrollableNavigationComponentView,
      assertScrollableNavigationComponentClick,
    ],
  },
  {
    path: '/ws/languages',
    runforEnv: ['local', 'test'],
    service: 'ws',
    pageIdentifier: 'ws.languages.page',
    siteId: 64,
    applicationType: 'responsive',
    contentType: 'index-home',
    tests: [assertPageView],
  },
  {
    path: '/ws/languages',
    runforEnv: ['live'],
    service: 'ws',
    pageIdentifier: 'ws.languages.page',
    siteId: 64,
    applicationType: 'responsive',
    contentType: 'static',
    tests: [assertPageView],
  },
];

const liteTestSuites = canonicalTestSuites
  .filter(({ path }) => path !== '/ws/languages')
  .map(testSuite => {
    const liteSiteTests = testSuite.tests.filter(
      test =>
        // Exclude component click tests, as component click support is not supported on all components yet
        !test.name.toLowerCase().includes('click'),
    );

    liteSiteTests.push(assertLiteSiteSummaryComponentToMainSiteClick);

    return {
      ...testSuite,
      path: `${testSuite.path}.lite`,
      applicationType: 'lite',
      useReverb: false,
      tests: [...liteSiteTests],
    };
  });

runTestsForPage({
  testSuites: [...canonicalTestSuites, ...liteTestSuites],
  // @ts-expect-error missing type definitions
  beforeAll: [setUserIDCookie],
  pageType: 'all',
});
