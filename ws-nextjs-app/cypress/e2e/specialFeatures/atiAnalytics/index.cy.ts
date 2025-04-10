/* eslint-disable import/no-relative-packages */
import { LIVE_PAGE } from '../../../../../src/app/routes/utils/pageTypes';
import { assertPageView } from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions';
import {
  assertScrollableNavigationComponentView,
  assertScrollableNavigationComponentClick,
} from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions/navigation';
import { assertLiteSiteCTAComponentClick } from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions/liteSiteCta';

import runTestsForPage from '../../../support/helpers/runTestsForPage';

const canonicalTestSuites = [
  {
    path: '/burmese/live/ckg19998pldt',
    runforEnv: ['local', 'live'],
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
    ],
  },
];

const liteTestSuites = canonicalTestSuites.map(testSuite => {
<<<<<<< HEAD
  const liteSiteTests = testSuite.tests.filter(
    test =>
      // Exclude component click tests, as component click support is not supported on all components yet
      !test.name.toLowerCase().includes('click'),
  );
=======
  const isBurmese = testSuite.service === 'burmese';
  const liteSiteTests = [assertPageView, ...(isBurmese ? [assertLiteSiteCTAComponentClick] : [])];

>>>>>>> origin

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
