import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';

import assertPageWeight from './assertions/liteSiteWeight';

const tests = [assertPageWeight];

const runforEnv = 'local';

const testSuites = [
  {
    path: '/hindi.lite',
    service: 'hindi',
    runforEnv,
    pageType: 'Home',
    tests,
  },
  {
    path: '/nepali/bbc_nepali_radio/liveradio.lite',
    runforEnv,
    pageType: 'Live Radio',
    tests,
  },
  {
    path: '/mundo/popular/read.lite',
    runforEnv,
    pageType: 'Most Read',
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/programmes/p0340x2m.lite',
    runforEnv,
    pageType: 'On Demand Audio - Brand',
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/w3ct7wjx.lite',
    runforEnv,
    pageType: 'On Demand Audio - Episode',
    tests,
  },
  {
    path: '/gahuza/podcasts/p07yh8hb.lite',
    runforEnv,
    pageType: 'Podcast - Brand',
    tests,
  },
  {
    path: '/gahuza/podcasts/p07yh8hb/p094vs2n.lite',
    runforEnv,
    pageType: 'Podcast - Episode',
    tests,
  },
  {
    path: '/hindi/topics/cm5m26q8qxpt.lite',
    runforEnv,
    pageType: 'Topic',
    tests,
  },
  {
    path: '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz.lite',
    runforEnv,
    pageType: 'On Demand TV - Brand',
    tests,
  },
  {
    path: '/urdu/bbc_urdu_tv/tv/w172xtwfxsl890n.lite',
    runforEnv,
    pageType: 'On Demand TV - Episode',
    tests,
  },
];

runTestsForPage({
  testSuites,
  testIsolation: true,
});
