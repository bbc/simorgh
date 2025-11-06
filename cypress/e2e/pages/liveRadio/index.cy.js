import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import e2eTests from './tests';
import testsForAllPages from '../testsForAllPages';
import testsForAllCanonicalPages from '../testsForAllCanonicalPages';
import { setUserIDCookie } from '../../specialFeatures/atiAnalytics/helpers';
import { assertPageView } from '../../specialFeatures/atiAnalytics/assertions';
import {
  assertRadioScheduleComponentClick,
  assertRadioScheduleComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/radioSchedule';

const pageType = 'liveRadio';

const tests = [e2eTests, testsForAllPages, testsForAllCanonicalPages];

const testSuites = [
  {
    path: '/afaanoromoo/bbc_afaanoromoo_radio/liveradio',
    service: 'afaanoromoo',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/afrique/bbc_afrique_radio/liveradio',
    service: 'afrique',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/amharic/bbc_amharic_radio/liveradio',
    service: 'amharic',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/arabic/bbc_arabic_radio/liveradio',
    service: 'arabic',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/burmese/bbc_burmese_radio/liveradio',
    service: 'burmese',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/dari/bbc_dari_radio/liveradio',
    service: 'dari',
    runforEnv: ['test'],
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/liveradio',
    service: 'gahuza',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/hausa/bbc_hausa_radio/liveradio',
    service: 'hausa',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/korean/bbc_korean_radio/liveradio',
    service: 'korean',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/nepali/bbc_nepali_radio/liveradio',
    service: 'nepali',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/pashto/bbc_pashto_radio/liveradio',
    service: 'pashto',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/somali/bbc_somali_radio/liveradio',
    service: 'somali',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/swahili/bbc_swahili_radio/liveradio',
    service: 'swahili',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/tigrinya/bbc_tigrinya_radio/liveradio',
    service: 'tigrinya',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/uzbek/bbc_uzbek_radio/liveradio',
    service: 'uzbek',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
];

const atiAnalyticsTestSuites = [
  {
    path: '/hausa/bbc_hausa_radio/liveradio',
    runforEnv: ['local', 'live'],
    service: 'hausa',
    pageIdentifier: 'hausa.bbc_hausa_radio.liveradio.page',
    siteId: 51,
    applicationType: 'responsive',
    contentType: 'player-live',
    useReverb: true,
    tests: [
      assertPageView,
      assertRadioScheduleComponentView,
      assertRadioScheduleComponentClick,
    ],
  },
];

runTestsForPage({
  pageType,
  testSuites,
});

runTestsForPage({
  pageType: 'liveRadio',
  testSuites: atiAnalyticsTestSuites,
  beforeAll: [setUserIDCookie],
  testIsolation: true,
});
