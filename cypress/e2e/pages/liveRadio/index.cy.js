import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import e2eTests from './tests';

const pageType = 'liveRadio';

const tests = [e2eTests];

const testSuites = [
  {
    path: '/gahuza/bbc_gahuza_radio/liveradio',
    service: 'gahuza',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/hausa/bbc_hausa_radio/liveradio',
    service: 'hausa',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/indonesia/bbc_indonesian_radio/liveradio',
    service: 'hausa',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/korean/bbc_korean_radio/liveradio',
    service: 'korean',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_radio/liveradio',
    service: 'kyrgyz',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_radio/liveradio',
    service: 'korean',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/nepali/bbc_nepali_radio/liveradio',
    service: 'nepali',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/nepali/bbc_nepali_radio/liveradio',
    service: 'nepali',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/nepali/bbc_nepali_radio/liveradio',
    service: 'nepali',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/pashto/bbc_pashto_radio/liveradio',
    service: 'pashto',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/pashto/bbc_pashto_radio/liveradio',
    service: 'pashto',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/persian/bbc_dari_radio/liveradio',
    service: 'persian',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/somali/bbc_somali_radio/liveradio',
    service: 'somali',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/somali/bbc_somali_radio/liveradio',
    service: 'somali',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/swahili/bbc_swahili_radio/liveradio',
    service: 'swahili',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/swahili/bbc_swahili_radio/liveradio',
    service: 'swahili',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/tamil/bbc_tamil_radio/liveradio',
    service: 'tamil',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/tigrinya/bbc_tigrinya_radio/liveradio',
    service: 'tigrinya',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/urdu/bbc_urdu_radio/liveradio',
    service: 'urdu',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/uzbek/bbc_uzbek_radio/liveradio',
    service: 'uzbek',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/uzbek/bbc_uzbek_radio/liveradio',
    service: 'uzbek',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/afaanoromoo/bbc_afaanoromoo_radio/liveradio',
    service: 'afaanoromoo',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/afaanoromoo/bbc_afaanoromoo_radio/liveradio',
    service: 'afaanoromoo',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/afrique/bbc_afrique_radio/liveradio',
    service: 'afrique',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/amharic/bbc_amharic_radio/liveradio',
    service: 'amharic',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/arabic/bbc_arabic_radio/liveradio',
    service: 'arabic',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/bengali/bbc_bangla_radio/liveradio',
    service: 'bengali',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/bengali/bbc_bangla_radio/liveradio',
    service: 'bengali',
    runforEnv: ['local', 'live'],
    tests,
  },
  {
    path: '/burmese/bbc_burmese_radio/liveradio',
    service: 'burmese',
    runforEnv: ['local', 'live'],
    tests,
  },
];

const testEnvSuites = testSuites.map(testSuite => {
  return {
    ...testSuite,
    path: `${testSuite.path}?renderer_env=live`,
    runforEnv: ['test'],
  };
});

runTestsForPage({
  pageType,
  testSuites: [...testSuites, ...testEnvSuites],
});
