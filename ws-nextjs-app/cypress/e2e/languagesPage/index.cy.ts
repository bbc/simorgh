import { assertPageView } from '../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import {
  assertWSLanguagesPageURNLive,
  assertWSLanguagesPageURN,
  assertWSLanguagesPageLocal,
} from './assertions';
import runTestsForPage, {
  TestDataType,
} from '../../support/helpers/runTestsForPage';
import { setUserIDCookie } from '../specialFeatures/atiAnalytics/helpers';

const testSuites = [
  {
    path: '/ws/languages',
    service: 'ws',
    runforEnv: ['local'],
    tests: [assertWSLanguagesPageLocal, assertWSLanguagesPageURN],
  },
  {
    path: '/ws/languages',
    service: 'ws',
    runforEnv: ['test'],
    tests: [assertWSLanguagesPageURN],
  },
  {
    path: '/ws/languages',
    service: 'ws',
    runforEnv: ['live'],
    tests: [assertWSLanguagesPageURNLive],
  },
];

const atiAnalyticsTestSuites = [
  {
    path: '/ws/languages',
    runforEnv: ['local', 'test', 'live'],
    service: 'ws',
    pageIdentifier: 'ws.languages.page',
    siteId: 30,
    applicationType: 'responsive',
    contentType: 'index-home',
    tests: [assertPageView],
  },
] as unknown as TestDataType[];

runTestsForPage({
  testSuites,
  pageType: HOME_PAGE,
});

runTestsForPage({
  pageType: HOME_PAGE,
  testSuites: atiAnalyticsTestSuites,
  beforeAll: [setUserIDCookie],
  testIsolation: true,
});
