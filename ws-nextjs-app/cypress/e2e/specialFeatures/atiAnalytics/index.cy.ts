/* eslint-disable import/no-relative-packages */
import { LIVE_PAGE } from '../../../../../src/app/routes/utils/pageTypes';
import { assertPageView } from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions';
import {
  assertScrollableNavigationComponentView,
  assertScrollableNavigationComponentClick,
} from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions/navigation';
import {
  assertShareComponentView,
  assertShareComponentClick,
} from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions/share';
import {
  assertLiveMediaComponentView,
  assertLiveMediaComponentClick,
} from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions/liveMedia';

import runTestsForPage from '../../../support/helpers/runTestsForPage';

const canonicalTestSuites = [
  {
    path: '/burmese/live/ckg19998pldt',
    runforEnv: ['live'],
    service: 'burmese',
    pageIdentifier: 'live_coverage.ckg19998pldt.page',
    applicationType: 'responsive',
    contentType: 'live-coverage',
    componentTrackingContentType: LIVE_PAGE,
    useReverb: true,
    tests: [
      assertPageView,
      assertScrollableNavigationComponentView,
      assertScrollableNavigationComponentClick,
      assertShareComponentView,
      assertShareComponentClick,
    ],
  },
  {
    path: '/mundo/live/c7dkx155e626t',
    runforEnv: ['local', 'test'],
    service: 'mundo',
    pageIdentifier: 'live_coverage.c7dkx155e626t.page',
    applicationType: 'responsive',
    contentType: 'live-coverage',
    componentTrackingContentType: LIVE_PAGE,
    useReverb: true,
    tests: [
      assertPageView,
      assertScrollableNavigationComponentView,
      assertScrollableNavigationComponentClick,
      assertLiveMediaComponentView,
      assertLiveMediaComponentClick,
      assertShareComponentView,
      assertShareComponentClick,
    ],
  },
  {
    path: '/pidgin/live/c7p765ynk9qt',
    runforEnv: ['local', 'test'],
    service: 'pidgin',
    pageIdentifier: 'live_coverage.c7p765ynk9qt.page',
    applicationType: 'responsive',
    contentType: 'live-coverage',
    componentTrackingContentType: LIVE_PAGE,
    useReverb: true,
    tests: [
      assertPageView,
      assertScrollableNavigationComponentView,
      assertScrollableNavigationComponentClick,
      assertShareComponentView,
      assertShareComponentClick,
    ],
  },
];

const liteTestSuites = canonicalTestSuites.map(testSuite => {
  const liteSiteTests = [assertPageView];

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
  testIsolation: true,
  pageType: 'all',
});
