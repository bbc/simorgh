import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import e2eTests from './tests';
import testsForAllCanonicalPages from '../testsForAllCanonicalPages';
import { setUserIDCookie } from '../../specialFeatures/atiAnalytics/helpers';
import { assertPageView } from '../../specialFeatures/atiAnalytics/assertions';

const pageType = 'onDemandTV';

const tests = [e2eTests, testsForAllCanonicalPages];
const testSuites = [
  {
    path: '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz', // Brand
    service: 'afrique',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/afrique/bbc_afrique_tv/tv/w172xtjgc2szrpv', // Episode
    service: 'afrique',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/burmese/bbc_burmese_tv/tv_programmes/w13xttn3', // Brand
    service: 'burmese',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/burmese/bbc_burmese_tv/tv/w172xsxl59y5hdw', // Episode
    service: 'burmese',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/gujarati/bbc_gujarati_tv/tv_programmes/w13xttqr', // Brand
    service: 'gujarati',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/gujarati/bbc_gujarati_tv/tv/w172xtmhvnb7snj', // Episode
    service: 'gujarati',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/hausa/bbc_hausa_tv/tv_programmes/w13xttn0', // Brand
    service: 'hausa',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/hausa/bbc_hausa_tv/tv/w172yjj83ptptnj', // Episode
    service: 'hausa',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/hindi/bbc_hindi_tv/tv_programmes/w13xttlw', // Brand
    service: 'hindi',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/hindi/bbc_hindi_tv/tv/w172xtp13fld5cp', // Episode
    service: 'hindi',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_tv/tv_programmes/w13xttqx', // Brand
    service: 'kyrgyz',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_tv/tv/w172xtpn0bwv562', // Episode
    service: 'kyrgyz',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4', // Brand
    service: 'pashto',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/pashto/bbc_pashto_tv/tv/w172xtq7x8660m1', // Episode
    service: 'pashto',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/persian/bbc_persian_tv/tv_programmes/w13xttnr', // Brand
    service: 'persian',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/persian/bbc_persian_tv/tv/w172xt4lj9yflqx', // Episode
    service: 'persian',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/somali/bbc_somali_tv/tv_programmes/w13xttqt', // Brand
    service: 'somali',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/somali/bbc_somali_tv/tv/w172xtqvt5hrd9z', // Episode
    service: 'somali',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/swahili/bbc_swahili_tv/tv_programmes/w13xttt3', // Brand
    service: 'swahili',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/swahili/bbc_swahili_tv/tv/w172xcqlzkvx00n', // Episode
    service: 'swahili',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/tamil/bbc_tamil_tv/tv_programmes/w13xttmy', // Brand
    service: 'tamil',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/tamil/bbc_tamil_tv/tv/w172xtv73yzc6mv', // Episode
    service: 'tamil',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/telugu/bbc_telugu_tv/tv_programmes/w13xttld', // On Demand Brand
    service: 'telugu',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/telugu/bbc_telugu_tv/tv/w172xtxyt9k8y6p', // On Demand Episode
    service: 'telugu',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/ukrainian/bbc_ukrainian_tv/tv_programmes/w13xttp9', // Brand
    service: 'ukrainian',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/ukrainian/bbc_ukrainian_tv/tv/w172xtvv0w8tq9m', // Episode
    service: 'ukrainian',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/ukrainian/bbc_ukrainian_tv/tv/w172xct4hclz27g', // Episode
    service: 'ukrainian',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/urdu/bbc_urdu_tv/tv_programmes/w13xttn1', // Brand
    service: 'urdu',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/urdu/bbc_urdu_tv/tv/w172xtwfxsl890n', // Episode
    service: 'urdu',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/uzbek/bbc_uzbek_tv/tv_programmes/w13xttqv', // Brand
    service: 'uzbek',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/uzbek/bbc_uzbek_tv/tv/w172xtx1tpwq8tz', // Episode
    service: 'uzbek',
    runforEnv: ['test', 'live'],
    tests,
  },
];

const atiAnalyticsTestSuites = [
  {
    path: '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz',
    runforEnv: ['local', 'test', 'live'],
    service: 'afrique',
    pageIdentifier: 'afrique.bbc_afrique_tv.tv_programmes.w13xttmz.page',
    siteId: 3,
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [assertPageView],
  },
  {
    path: '/afrique/bbc_afrique_tv/tv/w3ct05mp',
    runforEnv: ['local', 'test', 'live'],
    service: 'afrique',
    pageIdentifier: 'afrique.bbc_afrique_tv.tv.w3ct05mp.page',
    siteId: 3,
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [assertPageView],
  },
];

const liteTestSuites = testSuites.map(testSuite => {
  return {
    ...testSuite,
    path: `${testSuite.path}.lite`,
    tests: [e2eTests],
  };
});

runTestsForPage({
  pageType,
  testSuites: [...testSuites, ...liteTestSuites],
});

runTestsForPage({
  pageType,
  testSuites: atiAnalyticsTestSuites,
  beforeAll: [setUserIDCookie],
  testIsolation: true,
});
