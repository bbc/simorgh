import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import e2eTests from './tests';

const pageType = 'onDemandTV';

const tests = [e2eTests];
const testSuites = [
  {
    path: '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz', // Brand
    service: 'afrique',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz.lite', // Brand
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
    path: '/afrique/bbc_afrique_tv/tv/w172xtjgc2szrpv.lite', // Episode
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
    path: '/burmese/bbc_burmese_tv/tv_programmes/w13xttn3.lite', // Brand
    service: 'burmese',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/burmese/bbc_burmese_tv/tv/w172xsxl59y5hdw', // Episode
    service: 'burmese',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/burmese/bbc_burmese_tv/tv/w172xsxl59y5hdw.lite', // Episode
    service: 'burmese',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/burmese/bbc_burmese_tv/tv/w172xbmg65lczy0', // Episode
    service: 'burmese',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/burmese/bbc_burmese_tv/tv/w172xbmg65lczy0.lite', // Episode
    service: 'burmese',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/gujarati/bbc_gujarati_tv/tv_programmes/w13xttqr', // Brand
    service: 'gujarati',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/gujarati/bbc_gujarati_tv/tv_programmes/w13xttqr.lite', // Brand
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
    path: '/gujarati/bbc_gujarati_tv/tv/w172xtmhvnb7snj.lite', // Episode
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
    path: '/hausa/bbc_hausa_tv/tv_programmes/w13xttn0.lite', // Brand
    service: 'hausa',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/hausa/bbc_hausa_tv/tv/w172xtnf6j8vmwq', // Episode
    service: 'hausa',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/hausa/bbc_hausa_tv/tv/w172xtnf6j8vmwq.lite', // Episode
    service: 'hausa',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/hausa/bbc_hausa_tv/tv/w172yjj7rfhxp1p', // Episode
    service: 'hausa',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/hausa/bbc_hausa_tv/tv/w172yjj7rfhxp1p.lite', // Episode
    service: 'hausa',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/hindi/bbc_hindi_tv/tv_programmes/w13xttlw', // Brand
    service: 'hindi',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/hindi/bbc_hindi_tv/tv_programmes/w13xttlw.lite', // Brand
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
    path: '/hindi/bbc_hindi_tv/tv/w172xtp13fld5cp.lite', // Episode
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
    path: '/kyrgyz/bbc_kyrgyz_tv/tv_programmes/w13xttqx.lite', // Brand
    service: 'kyrgyz',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_tv/tv/w172xtpn0bwv562', // Episode
    service: 'kyrgyz',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_tv/tv/w172xtpn0bwv562.lite', // Episode
    service: 'kyrgyz',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_tv/tv/w172xcgmgcj9864', // Episode
    service: 'kyrgyz',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_tv/tv/w172xcgmgcj9864.lite', // Episode
    service: 'kyrgyz',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4', // Brand
    service: 'pashto',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4.lite', // Brand
    service: 'pashto',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/pashto/bbc_pashto_tv/tv/w172xtq7x8660m1', // Episode
    service: 'pashto',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/pashto/bbc_pashto_tv/tv/w172xtq7x8660m1.lite', // Episode
    service: 'pashto',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/pashto/bbc_pashto_tv/tv/w172xcldhhrhmcf', // Episode
    service: 'pashto',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/pashto/bbc_pashto_tv/tv/w172xcldhhrhmcf.lite', // Episode
    service: 'pashto',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/persian/bbc_persian_tv/tv_programmes/w13xttnr', // Brand
    service: 'persian',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/persian/bbc_persian_tv/tv_programmes/w13xttnr.lite', // Brand
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
    path: '/persian/bbc_persian_tv/tv/w172xt4lj9yflqx.lite', // Episode
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
    path: '/somali/bbc_somali_tv/tv_programmes/w13xttqt.lite', // Brand
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
    path: '/somali/bbc_somali_tv/tv/w172xtqvt5hrd9z.lite', // Episode
    service: 'somali',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/somali/bbc_somali_tv/tv/w172xtqvt5hrd9z.lite', // Episode
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
    path: '/swahili/bbc_swahili_tv/tv_programmes/w13xttt3.lite', // Brand
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
    path: '/swahili/bbc_swahili_tv/tv/w172xcqlzkvx00n.lite', // Episode
    service: 'swahili',
    runforEnv: ['test', 'live'],
    tests,
  },
  // {
  //   path: '/swahili/bbc_swahili_tv/tv/w172xcqnsxfj1bk', // Episode
  //   service: 'swahili',
  //   runforEnv: 'local',
  //   tests,
  // },
  // {
  //   path: '/swahili/bbc_swahili_tv/tv/w172xcqnsxfj1bk.lite', // Episode
  //   service: 'swahili',
  //   runforEnv: 'local',
  //   tests,
  // },
  {
    path: '/tamil/bbc_tamil_tv/tv_programmes/w13xttmy', // Brand
    service: 'tamil',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/tamil/bbc_tamil_tv/tv_programmes/w13xttmy.lite', // Brand
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
    path: '/tamil/bbc_tamil_tv/tv/w172xtv73yzc6mv.lite', // Episode
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
    path: '/telugu/bbc_telugu_tv/tv_programmes/w13xttld.lite', // On Demand Brand
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
    path: '/telugu/bbc_telugu_tv/tv/w172xtxyt9k8y6p.lite', // On Demand Episode
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
    path: '/ukrainian/bbc_ukrainian_tv/tv_programmes/w13xttp9.lite', // Brand
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
    path: '/ukrainian/bbc_ukrainian_tv/tv/w172xtvv0w8tq9m.lite', // Episode
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
    path: '/ukrainian/bbc_ukrainian_tv/tv/w172xct4hclz27g.lite', // Episode
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
    path: '/urdu/bbc_urdu_tv/tv_programmes/w13xttn1.lite', // Brand
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
    path: '/urdu/bbc_urdu_tv/tv/w172xtwfxsl890n.lite', // Episode
    service: 'urdu',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/urdu/bbc_urdu_tv/tv/w172xtwkxr1xtlz', // Episode
    service: 'urdu',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/urdu/bbc_urdu_tv/tv/w172xtwkxr1xtlz.lite', // Episode
    service: 'urdu',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/uzbek/bbc_uzbek_tv/tv_programmes/w13xttqv', // Brand
    service: 'uzbek',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/uzbek/bbc_uzbek_tv/tv_programmes/w13xttqv.lite', // Brand
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
  {
    path: '/uzbek/bbc_uzbek_tv/tv/w172xtx1tpwq8tz.lite', // Episode
    service: 'uzbek',
    runforEnv: ['test', 'live'],
    tests,
  },
];

const liteTestSuites = testSuites.map(testSuite => {
  return {
    ...testSuite,
    path: `${testSuite.path}.lite`,
  };
});

runTestsForPage({
  pageType,
  testSuites,
  liteTestSuites,
  tests,
});
