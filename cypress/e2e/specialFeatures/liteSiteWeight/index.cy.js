import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';

import assertPageWeight from './assertions/liteSiteWeight';

const tests = [assertPageWeight];
const liteTestSuites = [
  {
    path: '/hindi.lite?renderer_env=live',
    service: 'hindi',
    runforEnv: 'local',
    pageType: 'Home',
    tests,
  },
  {
    path: '/mundo/articles/cddylv9g8z0o.lite?renderer_env=live',
    runforEnv: 'local',
    pageType: 'Optimo Article',
    tests,
  },
  {
    path: '/nepali/bbc_nepali_radio/liveradio.lite?renderer_env=live',
    runforEnv: 'local',
    pageType: 'Live Radio',
    tests,
  },
  {
    path: '/arabic/media-53135426.lite?renderer_env=live',
    runforEnv: 'local',
    pageType: 'CPS Media Article with Live Stream',
    tests,
  },
  {
    path: '/marathi/popular/read.lite?renderer_env=live',
    runforEnv: 'local',
    pageType: 'Most Read',
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/programmes/p0340x2m.lite?renderer_env=live',
    runforEnv: 'local',
    pageType: 'On Demand Audio - Brand',
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/w3ct1v5v.lite?renderer_env=live',
    runforEnv: 'local',
    pageType: 'On Demand Audio - Episode',
    tests,
  },
  {
    path: '/gahuza/podcasts/p07yh8hb.lite?renderer_env=live',
    runforEnv: 'local',
    pageType: 'Podcast - Brand',
    tests,
  },
  {
    path: '/gahuza/podcasts/p07yh8hb/p094vs2n.lite?renderer_env=live',
    runforEnv: 'local',
    pageType: 'Podcast - Episode',
    tests,
  },
  {
    path: '/tigrinya/news-51249937.lite?renderer_env=live',
    runforEnv: 'local',
    pageType: 'CPS Media Article',
    tests,
  },
  {
    path: '/hausa/articles/clm3n4pdeymo.lite?renderer_env=live',
    runforEnv: 'local',
    pageType: 'Optimo Media Article',
    tests,
  },
  {
    path: '/nepali/news-50627370.lite?renderer_env=live',
    runforEnv: 'local',
    pageType: 'CPS Photo Gallery (PGL)',
    tests,
  },
  {
    path: '/arabic/sports-54278377.lite?renderer_env=live',
    runforEnv: 'local',
    pageType: 'CPS Story (STY)',
    tests,
  },
  {
    path: '/hindi/topics/cm5m26q8qxpt.lite?renderer_env=live',
    runforEnv: 'local',
    pageType: 'Topic',
    tests,
  },
  {
    path: '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz.lite?renderer_env=live',
    runforEnv: 'local',
    pageType: 'On Demand TV - Brand',
    tests,
  },
  {
    path: '/afrique/bbc_afrique_tv/tv/w172xtjgc2szrpv.lite?renderer_env=live',
    runforEnv: 'local',
    pageType: 'On Demand TV - Episode',
    tests,
  },
];

runTestsForPage({
  testSuites: [...liteTestSuites],
  testIsolation: true,
});
