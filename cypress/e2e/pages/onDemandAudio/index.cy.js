import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import e2eTests from './tests';

const pageType = 'onDemandAudio';

const tests = [e2eTests];
const testSuites = [
  {
    path: '/afaanoromoo/bbc_afaanoromoo_radio/programmes/w13xttnw', // On Demand Brand
    service: 'afaanoromoo',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: ['/afaanoromoo/bbc_afaanoromoo_radio/w3cszx1y'],
    service: 'afaanoromoo',
    runforEnv: ['local'],
    enabled: true,
    tests,
  },
  {
    path: '/afaanoromoo/bbc_afaanoromoo_radio/w3ct1wc0', // On Demand Episode
    service: 'afaanoromoo',
    runforEnv: ['live'],
    enabled: true,
    tests,
  },
  {
    path: '/afaanoromoo/bbc_afaanoromoo_radio/w3ct1wd4', // On Demand Episode
    service: 'afaanoromoo',
    runforEnv: ['live'],
    enabled: true,
    tests,
  },
  {
    path: '/afrique/bbc_afrique_radio/programmes/p030s6dq', // On Demand Brand,
    service: 'afrique',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/afrique/bbc_afrique_radio/w172y1g3d9108lh', // On Demand Episode
    service: 'afrique',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/afrique/bbc_afrique_radio/w172xqydyfv659p',
    service: 'afrique',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/amharic/bbc_amharic_radio/programmes/w13xttnt', // On Demand Brand,
    service: 'amharic',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/amharic/bbc_amharic_radio/w3ct1lqy', // On Demand Episode
    service: 'amharic',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/amharic/bbc_amharic_radio/w3csz5r9',
    service: 'amharic',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/arabic/bbc_arabic_radio/programmes/p030vh2y', // On Demand Brand
    service: 'arabic',
    runforEnv: 'live',
    enabled: true,
    tests,
  },
  {
    path: '/arabic/bbc_arabic_radio/programmes/p030vh25', // On Demand Brand
    service: 'arabic',
    runforEnv: 'test',
    enabled: true,
    tests,
  },
  {
    path: '/arabic/bbc_arabic_radio/w172y3wn75cm441', // On Demand Episode
    service: 'arabic',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/arabic/bbc_arabic_radio/w3ct01yb', // On Demand Episode
    service: 'arabic',
    runforEnv: ['local'],
    enabled: true,
    tests,
  },
  {
    path: '/arabic/podcasts/p02pc9qc', // Podcast Brand
    service: 'arabic',
    runforEnv: ['local', 'test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/arabic/podcasts/p02pc9qc/p09kwwfs', // Podcast Episode
    service: 'arabic',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/arabic/podcasts/p02pc9qc/p08wtg4d', // Podcast Episode
    service: 'arabic',
    runforEnv: ['local'],
    enabled: true,
    tests,
  },
  {
    path: '/bengali/bbc_bangla_radio/programmes/p030vjwg', // On Demand Brand
    service: 'bengali',
    runforEnv: ['live'],
    enabled: true,
    tests,
  },
  {
    path: '/bengali/bbc_bangla_radio/programmes/p030vjwm', // On Demand Brand
    service: 'bengali',
    runforEnv: ['live'],
    enabled: true,
    tests,
  },
  {
    path: '/bengali/bbc_bangla_radio/w172xwdq2b07ywv', // On Demand Episode
    service: 'bengali',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/bengali/bbc_bangla_radio/w172x0562jxntqx',
    service: 'bengali',
    runforEnv: ['local'],
    enabled: true,
    tests,
  },
  {
    path: '/burmese/bbc_burmese_radio/programmes/p0340rnm', // On Demand Brand
    service: 'burmese',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/burmese/bbc_burmese_radio/w3csz62h', // On Demand Brand
    service: 'burmese',
    runforEnv: ['local'],
    enabled: true,
    tests,
  },
  {
    path: '/burmese/bbc_burmese_radio/w3ct1m6n', // On Demand Episode
    service: 'burmese',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/burmese/podcasts/p02pc9lh', // Podcast brand
    service: 'burmese',
    runforEnv: ['local', 'test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/burmese/podcasts/p02pc9lh/p09kzply', // Podcast Episode
    service: 'burmese',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/burmese/podcasts/p02pc9lh/p0967thw', // Podcast Episode
    service: 'burmese',
    runforEnv: ['local'],
    enabled: true,
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/programmes/p0340x2m', // On Demand Brand
    service: 'gahuza',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/w3ct1v5v', // On Demand Episode
    service: 'gahuza',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/gahuza/podcasts/p07yh8hb', // Podcast Brand
    service: 'gahuza',
    runforEnv: ['local', 'test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/gahuza/podcasts/p07yh8hb/p09km4t4', // Podcast Episode
    service: 'gahuza',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/gahuza/podcasts/p07yh8hb/p094vs2n', // Podcast Episode
    service: 'gahuza',
    runforEnv: ['local'],
    enabled: true,
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/w172x7rkcj6v0vz',
    service: 'gahuza',
    runforEnv: ['local'],
    enabled: true,
    tests,
  },
  {
    path: '/hausa/bbc_hausa_radio/programmes/p030s4mh', // On Demand Brand
    service: 'hausa',
    runforEnv: ['live'],
    enabled: true,
    tests,
  },
  {
    path: '/hausa/bbc_hausa_radio/programmes/p030s4mx', // On Demand Brand
    service: 'hausa',
    runforEnv: ['test'],
    enabled: true,
    tests,
  },
  {
    path: '/hausa/bbc_hausa_radio/w3ct1qzn', // On Demand Episode
    service: 'hausa',
    runforEnv: ['live'],
    enabled: true,
    tests,
  },
  {
    path: '/hausa/bbc_hausa_radio/w3ct1033', // On Demand Episode
    service: 'hausa',
    runforEnv: ['test'],
    enabled: true,
    tests,
  },
  {
    path: '/hausa/podcasts/p08mlgcb', // Podcast Brand
    service: 'hausa',
    runforEnv: ['local', 'test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/hausa/podcasts/p08mlgcb/p09l0fw6', // Podcast Episode
    service: 'hausa',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/hausa/podcasts/p08mlgcb/p095k3hd', // Podcast Episode
    service: 'hausa',
    runforEnv: ['local'],
    enabled: true,
    tests,
  },
  {
    path: '/hausa/bbc_hausa_radio/w3cszrwm',
    service: 'hausa',
    runforEnv: ['local'],
    enabled: true,
    tests,
  },
  {
    path: '/hindi/podcasts/p0552909', // Podcast Brand
    service: 'hindi',
    runforEnv: ['local', 'test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/hindi/podcasts/p0552909/p09kjqjm', // Podcast Episode
    service: 'hindi',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/hindi/podcasts/p0552909/p0964mwl', // Podcast Episode
    service: 'hindi',
    runforEnv: ['local'],
    enabled: true,
    tests,
  },
  {
    path: '/indonesia/bbc_indonesian_radio/programmes/w13xtt0s', // On Demand Brand
    service: 'indonesia',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/indonesia/bbc_indonesian_radio/w172xybnvm6718v', // On Demand Episode
    service: 'indonesia',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/indonesia/podcasts/p02pc9v6', // Podcast Brand
    service: 'indonesia',
    runforEnv: ['local', 'test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/indonesia/podcasts/p02pc9v6/p09l1mhb', // Podcast Episode
    service: 'indonesia',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/indonesia/bbc_indonesian_radio/w172xh267fpn19l', // On Demand Episode
    service: 'indonesia',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/indonesia/podcasts/p02pc9v6/p096mj9z', // Podcast Episode
    service: 'indonesia',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/korean/bbc_korean_radio/programmes/w13xttll', // On Demand Brand
    service: 'korean',
    runforEnv: 'live',
    enabled: true,
    tests,
  },
  {
    path: '/korean/bbc_korean_radio/programmes/w13xttlm', // On Demand Brand
    service: 'korean',
    runforEnv: 'test',
    enabled: true,
    tests,
  },
  {
    path: '/korean/bbc_korean_radio/w3ct1vk5', // On Demand Episode
    service: 'korean',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/korean/bbc_korean_radio/w3ct0kn5',
    service: 'korean',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_radio/programmes/p0340xth', // On Demand Brand
    service: 'kyrgyz',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_radio/w3ct1vw9', // On Demand Episode
    service: 'kyrgyz',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_radio/w3cszwmc',
    service: 'kyrgyz',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/marathi/podcasts/p09431p4', // Podcast Brand
    service: 'marathi',
    runforEnv: ['local', 'test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/marathi/podcasts/p09431p4/p0f1vp21', // Podcast Episode
    service: 'marathi',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/marathi/podcasts/p09431p4/p09bplch', // Podcast Episode
    service: 'marathi',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/nepali/bbc_nepali_radio/programmes/p0340xzt', // On Demand Brand
    service: 'nepali',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/nepali/bbc_nepali_radio/w172xzcfvptk838', // On Demand Episode
    service: 'nepali',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/nepali/podcasts/p02pc9w3/p09j0dm5', // Podcast Episode
    service: 'nepali',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/nepali/podcasts/p02pc9w3', // Podcast Brand
    service: 'nepali',
    runforEnv: ['local', 'test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/nepali/podcasts/p02pc9w3/p086v2bv', // Podcast Episode
    service: 'nepali',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/nepali/bbc_nepali_radio/w172x83pnptp1s8',
    service: 'nepali',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/pashto/bbc_pashto_radio/programmes/p0340yr4', // On Demand Brand
    service: 'pashto',
    runforEnv: 'live',
    enabled: true,
    tests,
  },
  {
    path: '/pashto/bbc_pashto_radio/programmes/p0340ysc', // On Demand Brand
    service: 'pashto',
    runforEnv: 'test',
    enabled: true,
    tests,
  },
  {
    path: '/pashto/bbc_pashto_radio/w3ct26m6', // On Demand Episode
    service: 'pashto',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/pashto/bbc_pashto_radio/w3ct0lz1',
    service: 'pashto',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/persian/bbc_dari_radio/programmes/p0340v0s', // On Demand Brand Dari
    service: 'persian',
    runforEnv: 'live',
    enabled: true,
    tests,
  },
  {
    path: '/persian/bbc_dari_radio/programmes/p0364sj5', // On Demand Brand Dari
    service: 'persian',
    runforEnv: 'test',
    enabled: true,
    tests,
  },
  {
    path: '/persian/bbc_dari_radio/w172y2n5p9pfj6x', // On Demand Episode Dari
    service: 'persian',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/persian/podcasts/p02pc9wf', // Podcast Brand
    service: 'persian',
    runforEnv: ['local', 'test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/persian/podcasts/p02pc9wf/p09knl1v', // Podcast Episode
    service: 'persian',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/persian/bbc_dari_radio/w3csz7mf',
    service: 'persian',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/persian/podcasts/p02pc9wf/p095lyj1', // Podcast Episode
    service: 'persian',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/portuguese/podcasts/p07r3r3t', // Podcast Brand
    service: 'portuguese',
    runforEnv: ['local', 'test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/portuguese/podcasts/p07r3r3t/p09clrrg', // Podcast Episode
    service: 'portuguese',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/portuguese/podcasts/p07r3r3t/p083x9gr', // Podcast Episode
    service: 'portuguese',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/russian/podcasts/p05607v8/p06x0tn3', // Podcast Episode
    service: 'russian',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/russian/podcasts/p05607v8', // Podcast Brand
    service: 'russian',
    runforEnv: ['local', 'test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/russian/podcasts/p05607v8/p06xlzvx', // Podcast Episode
    service: 'russian',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/somali/bbc_somali_radio/programmes/p034117j', // On Demand Brand
    service: 'somali',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/somali/bbc_somali_radio/w172xzzpp131z23', // On Demand Episode
    service: 'somali',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/somali/bbc_somali_radio/w172x90wfxd2qh4',
    service: 'somali',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/swahili/bbc_swahili_radio/programmes/p03411mj', // On Demand Brand
    service: 'swahili',
    runforEnv: ['live'],
    enabled: true,
    tests,
  },
  {
    path: '/swahili/bbc_swahili_radio/programmes/p030s7gh', // On Demand Brand
    service: 'swahili',
    runforEnv: ['test'],
    enabled: true,
    tests,
  },
  {
    path: '/swahili/bbc_swahili_radio/w3ct1y1s', // On Demand Episode
    service: 'swahili',
    runforEnv: ['live', 'test'],
    enabled: true,
    tests,
  },
  {
    path: '/swahili/bbc_swahili_radio/w172x94ky63591m', // On Demand Episode
    service: 'swahili',
    runforEnv: ['local'],
    enabled: true,
    tests,
  },
  {
    path: '/tamil/bbc_tamil_radio/programmes/p03412jh', // On Demand Brand
    service: 'tamil',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/tamil/bbc_tamil_radio/w172y03bbzbnwc0', // On Demand Episode
    service: 'tamil',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/tamil/bbc_tamil_radio/w172x966tn9jwmh',
    service: 'tamil',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/tigrinya/bbc_tigrinya_radio/programmes/w13xttny', // On Demand Brand
    service: 'tigrinya',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/tigrinya/bbc_tigrinya_radio/w3ct1xhz', // On Demand Episode
    service: 'tigrinya',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/tigrinya/bbc_tigrinya_radio/w3cszzz1',
    service: 'tigrinya',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/urdu/bbc_urdu_radio/programmes/p03413l5', // On Demand Brand
    service: 'urdu',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/urdu/bbc_urdu_radio/w172y03qq2blt8p', // On Demand Episode
    service: 'urdu',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/urdu/bbc_urdu_radio/w172y03qq2blt8p', // On Demand Episode
    service: 'urdu',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/uzbek/bbc_uzbek_radio/programmes/p03414fb', // On Demand Brand
    service: 'uzbek',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/uzbek/bbc_uzbek_radio/w172y044spy82mn', // On Demand Episode
    service: 'uzbek',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/uzbek/bbc_uzbek_radio/w172x9f9qjcq3lm',
    service: 'uzbek',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/zhongwen/simp/bbc_cantonese_radio/programmes/p0340tsy', // On Demand Brand
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/zhongwen/simp/bbc_cantonese_radio/w172xwswq9t42v6', // On Demand Episode
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/zhongwen/simp/podcasts/p02pc9xp/p09kpm0x', // Podcast Episode
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/zhongwen/simp/podcasts/p02pc9xp', // Podcast Brand
    service: 'zhongwen',
    runforEnv: ['local', 'test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/zhongwen/simp/bbc_cantonese_radio/w172xn6l7ng41qb', // Brand
    service: 'zhongwen',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/zhongwen/simp/podcasts/p02pc9xp/p0968qrl', // Podcast Episode
    service: 'zhongwen',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/zhongwen/trad/bbc_cantonese_radio/programmes/p0340tsy', // On Demand Brand
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/zhongwen/trad/bbc_cantonese_radio/w172xwswq9t42v6', // On Demand Episode
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/zhongwen/trad/podcasts/p02pc9xp/p09kpm0x', // Podcast Episode
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/zhongwen/trad/podcasts/p02pc9xp', // Podcast Brand
    service: 'zhongwen',
    runforEnv: ['local', 'test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/zhongwen/trad/bbc_cantonese_radio/w172xf3r5x8hw4v', // Brand
    service: 'zhongwen',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
  {
    path: '/zhongwen/trad/podcasts/p02pc9xp/p0968qrl', // Podcast Episode
    service: 'zhongwen',
    runforEnv: 'local',
    enabled: true,
    tests,
  },
];

runTestsForPage({
  pageType,
  testSuites: [...testSuites],
});
