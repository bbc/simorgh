import { LIVE_TV_PAGE } from '#app/routes/utils/pageTypes';
import { assertLiveTvPage } from './assertions';
import runTestsForPage, {
  TestDataType,
} from '../../../support/helpers/runTestsForPage';
import {
  assertPageView,
  assertResonancePageView,
} from '../../specialFeatures/atiAnalytics/assertions';

const testSuites = [
  {
    path: '/dari/watch/bbc_afghan_tv/live',
    service: 'dari',
    pageType: LIVE_TV_PAGE,
    runforEnv: ['local', 'test'],
    tests: [assertLiveTvPage],
  },
] as unknown as TestDataType[];

const atiAnalyticsTestSuites = [
  {
    path: '/arabic/watch/bbc_arabic_tv/live',
    runforEnv: ['live'],
    service: 'arabic',
    pageIdentifier: 'arabic.bbc_arabic_tv.livetv.page',
    siteId: 5,
    applicationType: 'responsive',
    contentType: 'player-live',
    tests: [assertPageView, assertResonancePageView],
  },
] as unknown as TestDataType[];

runTestsForPage({
  testSuites,
  pageType: LIVE_TV_PAGE,
});

runTestsForPage({
  pageType: LIVE_TV_PAGE,
  testSuites: atiAnalyticsTestSuites,
  testIsolation: true,
});
