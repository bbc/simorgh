import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import runTestsForPage from '../../support/helpers/runTestsForPage';
import { testsThatAlwaysRunForAllPages as testsForAllPages } from '../testsForAllPages';
import { testsThatFollowSmokeTestConfigForAllCanonicalPages as testsForAllCanonicalPages } from '../testsForAllCanonicalPages';
import { testsThatFollowSmokeTestConfigForAllAMPPages as testsForAllAMPPages } from '../testsForAllAMPPages';
import ampArticleTests from './testsForAMPOnly';
import canonicalArticleTests from './testsForCanonicalOnly';
import liteTests from '../articlePage/testsForLiteOnly';
import getPathWithSuffix from '../../support/helpers/getPathWithSuffix';

const canonicalTests = [
  testsForAllPages,
  testsForAllCanonicalPages,
  canonicalArticleTests,
];

const ampTests = [testsForAllPages, testsForAllAMPPages, ampArticleTests];

const canonicalSmokeTestSuites = [
  {
    path: '/hausa/labarai-51622389', // CPS MAP with video clip,
    service: 'hausa',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/hausa/23269030', // CPS MAP with video clip
    service: 'hausa',
    runforEnv: ['test'],
    tests: canonicalTests,
  },
  {
    path: '/persian/media-49522521', // CPS MAP with live stream
    service: 'persian',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/persian/world-51497110', // CPS MAP with video clip
    service: 'persian',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/persian/tv-and-radio-51780528', // CPS MAP with audio clip
    service: 'persian',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/persian/iran-23231114', // CPS MAP with audio clip
    service: 'persian',
    runforEnv: ['test'],
    tests: canonicalTests,
  },
  {
    path: '/persian/iran-23231114', // CPS MAP with audio clip
    service: 'persian',
    runforEnv: ['local'],
    tests: canonicalTests,
  },
];

const canonicalNonSmokeTestSuites = [
  {
    path: '/afrique/media-52121324', // CPS MAP
    service: 'afrique',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/afrique/region-23278969', // CPS MAP
    service: 'afrique',
    runforEnv: ['test'],
    tests: canonicalTests,
  },
  {
    path: '/amharic/news-51270657', // CPS MAP with video clip
    service: 'amharic',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/amharic/news-23263266', // CPS MAP with video clip
    service: 'amharic',
    runforEnv: ['test'],
    tests: canonicalTests,
  },
  {
    path: '/arabic/media-53135426', // CPS video
    service: 'arabic',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/arabic/world-23278971', // CPS audio
    service: 'arabic',
    runforEnv: ['test'],
    tests: canonicalTests,
  },
  {
    path: '/hindi/media-53139567',
    service: 'hindi',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/hindi/23201477', // CPS video
    service: 'hindi',
    runforEnv: ['test'],
    tests: canonicalTests,
  },
  {
    path: '/russian/av/media-45527896', // CPS video with redirect
    service: 'russian',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/russian/av/media-23320267', // CPS video with redirect
    service: 'russian',
    runforEnv: ['test'],
    tests: canonicalTests,
  },
  {
    path: '/serbian/cyr/srbija-52895074', // CPS video
    service: 'serbian',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/serbian/cyr/23279016', // CPS video
    service: 'serbian',
    runforEnv: ['test'],
    tests: canonicalTests,
  },
  {
    path: '/serbian/lat/srbija-52895074', // CPS video
    service: 'serbian',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/serbian/lat/23279016', // CPS video
    service: 'serbian',
    runforEnv: ['test'],
    tests: canonicalTests,
  },
  {
    path: '/swahili/gnb-51703829', // CPS MAP with video clip
    service: 'swahili',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/tigrinya/news-23263262', // CPS MAP with video clip
    service: 'tigrinya',
    runforEnv: ['test'],
    tests: canonicalTests,
  },
  {
    path: '/urdu/entertainment-51584098', // CPS MAP with audio clip
    service: 'urdu',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/zhongwen/simp/world-53107744', // CPS video
    service: 'zhongwen',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/zhongwen/simp/uk-23283128', // CPS Audio
    service: 'zhongwen',
    runforEnv: ['test'],
    tests: canonicalTests,
  },
  {
    path: '/zhongwen/trad/world-53107744', // CPS video
    service: 'zhongwen',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/zhongwen/trad/uk-23283128', // CPS Audio
    service: 'zhongwen',
    runforEnv: ['test'],
    tests: canonicalTests,
  },
];

// TC2 MAPs  do not support AMP pages
const tc2CanonicalTestSuites = Cypress.env('SMOKE')
  ? [
      {
        path: '/hausa/multimedia/2016/07/160714_tc2_audiomap?renderer_env=test', // TC2 MAP with audio clip
        service: 'hausa',
        runforEnv: ['test'],
        tests: canonicalTests,
      },
    ]
  : [
      {
        path: '/afrique/institutionelles/2015/07/150714_hissene_habre_explainer', // TC2 MAP
        service: 'afrique',
        runforEnv: ['live'],
        tests: canonicalTests,
      },
      {
        path: '/afrique/nos_emissions/2016/06/160622_tc2_testmap1?renderer_env=test', // TC2 MAP
        service: 'afrique',
        runforEnv: ['test'],
        tests: canonicalTests,
      },
      {
        path: '/arabic/multimedia/2016/06/160601_qatar_sewika_smoking', // TC2 video
        service: 'arabic',
        runforEnv: ['live'],
        tests: canonicalTests,
      },
      {
        path: '/arabic/worldnews/2015/11/151120_t_arabic_av?renderer_env=test', // TC2 video
        service: 'arabic',
        runforEnv: ['test'],
        tests: canonicalTests,
      },
      {
        path: '/hindi/multimedia/2015/09/150921_what_is_innovation_ms', // TC2 video
        service: 'hindi',
        runforEnv: ['live'],
        tests: canonicalTests,
      },
      {
        path: '/hindi/sport/2016/08/160822_tc2_testmap1?renderer_env=test', // TC2 video
        service: 'hindi',
        runforEnv: ['test'],
        tests: canonicalTests,
      },
      {
        path: '/russian/multimedia/2012/04/120411_v_titanic_last_survivor', // TC2 video
        service: 'russian',
        runforEnv: ['live'],
        tests: canonicalTests,
      },
      {
        path: '/russian/news/2016/05/160510_tc2_testmap3?renderer_env=test', // TC2 video
        service: 'russian',
        runforEnv: ['test'],
        tests: canonicalTests,
      },
      {
        path: '/swahili/medianuai/2016/05/160517_apatae_fatacky', // TC2 MAP with video clip
        service: 'swahili',
        runforEnv: ['live'],
        tests: canonicalTests,
      },
      {
        path: '/swahili/michezo/2016/07/160713_tc2_testmap2?renderer_env=test', // TC2 MAP with audio clip
        service: 'swahili',
        runforEnv: ['test'],
        tests: canonicalTests,
      },
      {
        path: '/urdu/multimedia/2014/11/141104_hindu_riaz_kq', // TC2 MAP with video clip
        service: 'urdu',
        runforEnv: ['live'],
        tests: canonicalTests,
      },
      {
        path: '/zhongwen/simp/multimedia/2016/06/160608_vid_gaokao_voxpop', // TC2 video
        service: 'zhongwen',
        runforEnv: ['live'],
        tests: canonicalTests,
      },
      {
        path: '/zhongwen/simp/multimedia/2016/11/161107_tc2_testmap1?renderer_env=test', // TC2 Video
        service: 'zhongwen',
        runforEnv: ['test'],
        tests: canonicalTests,
      },
      {
        path: '/zhongwen/trad/multimedia/2016/06/160608_vid_gaokao_voxpop', // TC2 video
        service: 'zhongwen',
        runforEnv: ['live'],
        tests: canonicalTests,
      },
    ];

const canonicalTestSuites = Cypress.env('SMOKE')
  ? canonicalSmokeTestSuites
  : canonicalNonSmokeTestSuites;

const ampTestSuites = canonicalTestSuites.map(testSuite => {
  return {
    ...testSuite,
    path: getPathWithSuffix({ path: testSuite.path, suffix: '.amp' }),
    tests: [...ampTests],
  };
});

const liteTestSuites = Cypress.env('SMOKE')
  ? canonicalTestSuites
      .filter(
        ({ service }) => !['news', 'sport', 'newsround'].includes(service),
      )
      .map(testSuite => {
        return {
          ...testSuite,
          path: `${testSuite.path}.lite`,
          tests: [liteTests],
        };
      })
  : [];

// SKIPPED: The following tests have been skipped as the media asset route hasn't yet been migrated.
describe.skip(`Media Asset Page Skipped until routes have been migrated`, () => {
  runTestsForPage({
    pageType: MEDIA_ASSET_PAGE,
    testSuites: [
      ...canonicalTestSuites,
      ...tc2CanonicalTestSuites,
      ...ampTestSuites,
      ...liteTestSuites,
    ],
  });
});
