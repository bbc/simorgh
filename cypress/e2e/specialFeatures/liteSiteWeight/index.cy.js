import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';

import assertPageWeight from './assertions/liteSiteWeight';

const tests = [assertPageWeight];
const liteTestSuites = [
  {
    path: '/hindi.lite',
    service: 'hindi',
    runforEnv: 'local',
    pageType: 'Home',
    tests,
  },
  {
    path: '/mundo/articles/cddylv9g8z0o.lite',
    runforEnv: 'local',
    pageType: 'Optimo Article',
    tests,
  },
  {
    path: '/nepali/bbc_nepali_radio/liveradio.lite',
    runforEnv: 'local',
    pageType: 'Live Radio',
    tests,
  },
  {
    path: '/arabic/media-53135426.lite',
    runforEnv: 'local',
    pageType: 'CPS Media Article with Live Stream',
    tests,
  },
  {
    path: '/mundo/popular/read.lite',
    runforEnv: 'local',
    pageType: 'Most Read',
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/programmes/p0340x2m.lite',
    runforEnv: 'local',
    pageType: 'On Demand Audio - Brand',
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/w3ct7wjx.lite',
    runforEnv: 'local',
    pageType: 'On Demand Audio - Episode',
    tests,
  },
  {
    path: '/gahuza/podcasts/p07yh8hb.lite',
    runforEnv: 'local',
    pageType: 'Podcast - Brand',
    tests,
  },
  {
    path: '/gahuza/podcasts/p07yh8hb/p094vs2n.lite',
    runforEnv: 'local',
    pageType: 'Podcast - Episode',
    tests,
  },
  {
    path: '/persian/media-49522521.lite',
    runforEnv: 'local',
    pageType: 'CPS Media Article with Live Stream',
    tests,
  },
  {
    path: '/hausa/articles/c4nvy27mervo.lite',
    runforEnv: 'local',
    pageType: 'Optimo Media Article',
    tests,
  },
  {
    path: '/arabic/art-and-culture-38260491.lite',
    runforEnv: 'local',
    pageType: 'CPS Photo Gallery (PGL)',
    tests,
  },
  {
    path: '/mundo/noticias-56669604.lite',
    runforEnv: 'local',
    pageType: 'CPS Story (STY)',
    tests,
  },
  {
    path: '/hindi/topics/cm5m26q8qxpt.lite',
    runforEnv: 'local',
    pageType: 'Topic',
    tests,
  },
  {
    path: '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz.lite',
    runforEnv: 'local',
    pageType: 'On Demand TV - Brand',
    tests,
  },
  {
    path: '/urdu/bbc_urdu_tv/tv/w172xtwkxr1xtlz.lite',
    runforEnv: 'local',
    pageType: 'On Demand TV - Episode',
    tests,
  },
];

runTestsForPage({
  testSuites: [...liteTestSuites],
  testIsolation: true,
});
