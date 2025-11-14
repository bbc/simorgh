import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import { assertPageView } from '../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions';
import mediaPlayerTests from './mediaPlayer';
import pageVisit from './pageVisit';
import keyPoints from './keyPoints';
import testsThatAlwaysRunForAllPages from '../testsForAllPages';
import runTestsForPage from '../../support/helpers/runTestsForPage';
import { setUserIDCookie } from '../specialFeatures/atiAnalytics/helpers';
import {
  assertDropdownNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertScrollableNavigationComponentClick,
  assertScrollableNavigationComponentView,
} from '../specialFeatures/atiAnalytics/assertions/navigation';

const testDetails = {
  pageType: 'live',
  testSuites: [
    {
      path: '/pidgin/live/c7p765ynk9qt',
      id: 'c7p765ynk9qt',
      runforEnv: ['test', 'local'],
      service: 'pidgin',
      tests: [
        testsThatAlwaysRunForAllPages,
        pageVisit,
        mediaPlayerTests,
        keyPoints,
      ],
    },
    {
      path: '/urdu/live/cx2qdkezzzvt',
      id: 'cx2qdkezzzvt',
      runforEnv: ['live'],
      service: 'urdu',
      tests: [testsThatAlwaysRunForAllPages, pageVisit, keyPoints],
    },
  ],
};

const atiAnalyticsTestSuites = {
  pageType: 'live',
  testSuites: [
    {
      path: '/arabic/live/cvp5r6m6mgpt',
      runforEnv: ['local', 'test'],
      service: 'arabic',
      pageIdentifier: 'live_coverage.cvp5r6m6mgpt.page',
      siteId: 5,
      applicationType: 'responsive',
      contentType: 'live-coverage',
      useReverb: true,
      tests: [
        assertPageView,
        assertScrollableNavigationComponentView,
        assertScrollableNavigationComponentClick,
        assertDropdownNavigationComponentView,
        assertDropdownNavigationComponentClick,
      ],
    },
    {
      path: '/pidgin/live/c7p765ynk9qt',
      runforEnv: ['local', 'test'],
      service: 'pidgin',
      pageIdentifier: 'live_coverage.c7p765ynk9qt.page',
      siteId: 70,
      applicationType: 'responsive',
      contentType: 'live-coverage',
      useReverb: true,
      tests: [
        assertPageView,
        assertScrollableNavigationComponentView,
        assertScrollableNavigationComponentClick,
        assertDropdownNavigationComponentView,
        assertDropdownNavigationComponentClick,
      ],
    },
    {
      path: '/urdu/live/cx2qdkezzzvt',
      runforEnv: ['live'],
      service: 'urdu',
      pageIdentifier: 'live_coverage.cx2qdkezzzvt.page',
      siteId: 95,
      applicationType: 'responsive',
      contentType: 'live-coverage',
      useReverb: true,
      tests: [
        assertPageView,
        assertScrollableNavigationComponentView,
        assertScrollableNavigationComponentClick,
        assertDropdownNavigationComponentView,
        assertDropdownNavigationComponentClick,
      ],
    },
  ],
};

describe('Live Page Spec', () => {
  runTestsForPage(testDetails);
});

runTestsForPage({
  pageType: LIVE_PAGE,
  testSuites: atiAnalyticsTestSuites.testSuites,
  beforeAll: [setUserIDCookie],
  testIsolation: true,
});
