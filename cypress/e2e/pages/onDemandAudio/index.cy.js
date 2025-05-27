import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import e2eTests from './tests';

const pageType = 'onDemandAudio';

const tests = [e2eTests];
const testSuites = [
  {
    path: '/afaanoromoo/bbc_afaanoromoo_radio/programmes/w13xttnw', // On Demand Brand
    service: 'afaanoromoo',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: ['/afaanoromoo/bbc_afaanoromoo_radio/w3cszx1y?renderer_env=live'],
    service: 'afaanoromoo',
    runforEnv: ['local'],
    tests,
  },
  {
    path: '/afaanoromoo/bbc_afaanoromoo_radio/w3ct1wc0', // On Demand Episode
    service: 'afaanoromoo',
    runforEnv: ['live'],
    tests,
  },
  {
    path: '/afaanoromoo/bbc_afaanoromoo_radio/w3ct1wd4', // On Demand Episode
    service: 'afaanoromoo',
    runforEnv: ['live'],
    tests,
  },
  {
    path: '/afrique/bbc_afrique_radio/programmes/p030s6dq', // On Demand Brand,
    service: 'afrique',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/afrique/bbc_afrique_radio/w172y1g3d9108lh', // On Demand Episode
    service: 'afrique',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/afrique/bbc_afrique_radio/w172xqydyfv659p?renderer_env=live',
    service: 'afrique',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/amharic/bbc_amharic_radio/programmes/w13xttnt', // On Demand Brand,
    service: 'amharic',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/amharic/bbc_amharic_radio/w3ct1lqy', // On Demand Episode
    service: 'amharic',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/amharic/bbc_amharic_radio/w3csz5r9?renderer_env=live',
    service: 'amharic',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/arabic/bbc_arabic_radio/programmes/p030vh2y', // On Demand Brand
    service: 'arabic',
    runforEnv: 'live',
    tests,
  },
  {
    path: '/arabic/bbc_arabic_radio/programmes/p030vh25', // On Demand Brand
    service: 'arabic',
    runforEnv: 'test',
    tests,
  },
  {
    path: '/arabic/bbc_arabic_radio/w172y3wn75cm441', // On Demand Episode
    service: 'arabic',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/arabic/bbc_arabic_radio/w3ct01yb?renderer_env=live', // On Demand Episode
    service: 'arabic',
    runforEnv: ['local'],
    tests,
  },
  {
    path: '/arabic/podcasts/p02pc9qc?renderer_env=live', // Podcast Brand
    service: 'arabic',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/arabic/podcasts/p02pc9qc/p09kwwfs', // Podcast Episode
    service: 'arabic',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/arabic/podcasts/p02pc9qc/p08wtg4d?renderer_env=live', // Podcast Episode
    service: 'arabic',
    runforEnv: ['local'],
    tests,
  },
  {
    path: '/bengali/bbc_bangla_radio/programmes/p030vjwg', // On Demand Brand
    service: 'bengali',
    runforEnv: ['live'],
    tests,
  },
  {
    path: '/bengali/bbc_bangla_radio/programmes/p030vjwm', // On Demand Brand
    service: 'bengali',
    runforEnv: ['live'],
    tests,
  },
  {
    path: '/bengali/bbc_bangla_radio/w172xwdq2b07ywv', // On Demand Episode
    service: 'bengali',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/bengali/bbc_bangla_radio/w172x0562jxntqx?renderer_env=live',
    service: 'bengali',
    runforEnv: ['local'],
    tests,
  },
  {
    path: '/burmese/bbc_burmese_radio/programmes/p0340rnm', // On Demand Brand
    service: 'burmese',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/burmese/bbc_burmese_radio/w3csz62h?renderer_env=live', // On Demand Brand
    service: 'burmese',
    runforEnv: ['local'],
    tests,
  },
  {
    path: '/burmese/bbc_burmese_radio/w3ct1m6n', // On Demand Episode
    service: 'burmese',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/burmese/podcasts/p02pc9lh?renderer_env=live', // Podcast brand
    service: 'burmese',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/burmese/podcasts/p02pc9lh/p09kzply', // Podcast Episode
    service: 'burmese',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/burmese/podcasts/p02pc9lh/p0967thw?renderer_env=live', // Podcast Episode
    service: 'burmese',
    runforEnv: ['local'],
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/programmes/p0340x2m', // On Demand Brand
    service: 'gahuza',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/w3ct1v5v', // On Demand Episode
    service: 'gahuza',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/gahuza/podcasts/p07yh8hb?renderer_env=live', // Podcast Brand
    service: 'gahuza',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/gahuza/podcasts/p07yh8hb/p09km4t4', // Podcast Episode
    service: 'gahuza',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/gahuza/podcasts/p07yh8hb/p094vs2n?renderer_env=live', // Podcast Episode
    service: 'gahuza',
    runforEnv: ['local'],
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/w172x7rkcj6v0vz?renderer_env=live',
    service: 'gahuza',
    runforEnv: ['local'],
    tests,
  },
  {
    path: '/hausa/bbc_hausa_radio/programmes/p030s4mh', // On Demand Brand
    service: 'hausa',
    runforEnv: ['live'],
    tests,
  },
  {
    path: '/hausa/bbc_hausa_radio/programmes/p030s4mx', // On Demand Brand
    service: 'hausa',
    runforEnv: ['test'],
    tests,
  },
  {
    path: '/hausa/bbc_hausa_radio/w3ct1qzn', // On Demand Episode
    service: 'hausa',
    runforEnv: ['live'],
    tests,
  },
  {
    path: '/hausa/bbc_hausa_radio/w3ct1033', // On Demand Episode
    service: 'hausa',
    runforEnv: ['test'],
    tests,
  },
  {
    path: '/hausa/podcasts/p08mlgcb?renderer_env=live', // Podcast Brand
    service: 'hausa',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/hausa/podcasts/p08mlgcb/p09l0fw6', // Podcast Episode
    service: 'hausa',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/hausa/podcasts/p08mlgcb/p095k3hd?renderer_env=live', // Podcast Episode
    service: 'hausa',
    runforEnv: ['local'],
    tests,
  },
  {
    path: '/hausa/bbc_hausa_radio/w3cszrwm?renderer_env=live',
    service: 'hausa',
    runforEnv: ['local'],
    tests,
  },
  {
    path: '/hindi/podcasts/p0552909?renderer_env=live', // Podcast Brand
    service: 'hindi',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/hindi/podcasts/p0552909/p09kjqjm', // Podcast Episode
    service: 'hindi',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/hindi/podcasts/p0552909/p0964mwl?renderer_env=live', // Podcast Episode
    service: 'hindi',
    runforEnv: ['local'],
    tests,
  },
  {
    path: '/indonesia/bbc_indonesian_radio/programmes/w13xtt0s', // On Demand Brand
    service: 'indonesia',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/indonesia/bbc_indonesian_radio/w172xybnvm6718v', // On Demand Episode
    service: 'indonesia',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/indonesia/podcasts/p02pc9v6?renderer_env=live', // Podcast Brand
    service: 'indonesia',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/indonesia/podcasts/p02pc9v6/p09l1mhb', // Podcast Episode
    service: 'indonesia',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/indonesia/bbc_indonesian_radio/w172xh267fpn19l?renderer_env=live', // On Demand Episode
    service: 'indonesia',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/indonesia/podcasts/p02pc9v6/p096mj9z?renderer_env=live', // Podcast Episode
    service: 'indonesia',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/korean/bbc_korean_radio/programmes/w13xttll', // On Demand Brand
    service: 'korean',
    runforEnv: 'live',
    tests,
  },
  {
    path: '/korean/bbc_korean_radio/programmes/w13xttlm', // On Demand Brand
    service: 'korean',
    runforEnv: 'test',
    tests,
  },
  {
    path: '/korean/bbc_korean_radio/w3ct1vk5', // On Demand Episode
    service: 'korean',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/korean/bbc_korean_radio/w3ct0kn5?renderer_env=live',
    service: 'korean',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_radio/programmes/p0340xth', // On Demand Brand
    service: 'kyrgyz',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_radio/w3ct1vw9', // On Demand Episode
    service: 'kyrgyz',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_radio/w3cszwmc?renderer_env=live',
    service: 'kyrgyz',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/marathi/podcasts/p09431p4?renderer_env=live', // Podcast Brand
    service: 'marathi',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/marathi/podcasts/p09431p4/p0f1vp21', // Podcast Episode
    service: 'marathi',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/marathi/podcasts/p09431p4/p09bplch?renderer_env=live', // Podcast Episode
    service: 'marathi',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/nepali/bbc_nepali_radio/programmes/p0340xzt', // On Demand Brand
    service: 'nepali',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/nepali/bbc_nepali_radio/w172xzcfvptk838', // On Demand Episode
    service: 'nepali',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/nepali/podcasts/p02pc9w3/p09j0dm5', // Podcast Episode
    service: 'nepali',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/nepali/podcasts/p02pc9w3', // Podcast Brand
    service: 'nepali',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/nepali/podcasts/p02pc9w3/p086v2bv?renderer_env=live', // Podcast Episode
    service: 'nepali',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/nepali/bbc_nepali_radio/w172x83pnptp1s8?renderer_env=live',
    service: 'nepali',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/pashto/bbc_pashto_radio/programmes/p0340yr4', // On Demand Brand
    service: 'pashto',
    runforEnv: 'live',
    tests,
  },
  {
    path: '/pashto/bbc_pashto_radio/programmes/p0340ysc', // On Demand Brand
    service: 'pashto',
    runforEnv: 'test',
    tests,
  },
  {
    path: '/pashto/bbc_pashto_radio/w3ct26m6', // On Demand Episode
    service: 'pashto',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/pashto/bbc_pashto_radio/w3ct0lz1?renderer_env=live',
    service: 'pashto',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/persian/bbc_dari_radio/programmes/p0340v0s', // On Demand Brand Dari
    service: 'persian',
    runforEnv: 'live',
    tests,
  },
  {
    path: '/persian/bbc_dari_radio/programmes/p0364sj5', // On Demand Brand Dari
    service: 'persian',
    runforEnv: 'test',
    tests,
  },
  {
    path: '/persian/bbc_dari_radio/w172y2n5p9pfj6x', // On Demand Episode Dari
    service: 'persian',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/persian/podcasts/p02pc9wf?renderer_env=live', // Podcast Brand
    service: 'persian',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/persian/podcasts/p02pc9wf/p09knl1v', // Podcast Episode
    service: 'persian',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/persian/bbc_dari_radio/w3csz7mf?renderer_env=live',
    service: 'persian',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/persian/podcasts/p02pc9wf/p095lyj1?renderer_env=live', // Podcast Episode
    service: 'persian',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/portuguese/podcasts/p07r3r3t?renderer_env=live', // Podcast Brand
    service: 'portuguese',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/portuguese/podcasts/p07r3r3t/p09clrrg', // Podcast Episode
    service: 'portuguese',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/portuguese/podcasts/p07r3r3t/p083x9gr?renderer_env=live', // Podcast Episode
    service: 'portuguese',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/russian/podcasts/p05607v8/p06x0tn3', // Podcast Episode
    service: 'russian',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/russian/podcasts/p05607v8?renderer_env=live', // Podcast Brand
    service: 'russian',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/russian/podcasts/p05607v8/p06xlzvx?renderer_env=live', // Podcast Episode
    service: 'russian',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/somali/bbc_somali_radio/programmes/p034117j', // On Demand Brand
    service: 'somali',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/somali/bbc_somali_radio/w172xzzpp131z23', // On Demand Episode
    service: 'somali',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/somali/bbc_somali_radio/w172x90wfxd2qh4?renderer_env=live',
    service: 'somali',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/swahili/bbc_swahili_radio/programmes/p03411mj', // On Demand Brand
    service: 'swahili',
    runforEnv: ['live'],
    tests,
  },
  {
    path: '/swahili/bbc_swahili_radio/programmes/p030s7gh', // On Demand Brand
    service: 'swahili',
    runforEnv: ['test'],
    tests,
  },
  {
    path: '/swahili/bbc_swahili_radio/w3ct1y1s', // On Demand Episode
    service: 'swahili',
    runforEnv: ['live', 'test'],
    tests,
  },
  {
    path: '/swahili/bbc_swahili_radio/w172x94ky63591m?renderer_env=live', // On Demand Episode
    service: 'swahili',
    runforEnv: ['local'],
    tests,
  },
  {
    path: '/tamil/bbc_tamil_radio/programmes/p03412jh', // On Demand Brand
    service: 'tamil',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/tamil/bbc_tamil_radio/w172y03bbzbnwc0', // On Demand Episode
    service: 'tamil',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/tamil/bbc_tamil_radio/w172x966tn9jwmh?renderer_env=live',
    service: 'tamil',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/tigrinya/bbc_tigrinya_radio/programmes/w13xttny', // On Demand Brand
    service: 'tigrinya',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/tigrinya/bbc_tigrinya_radio/w3ct1xhz', // On Demand Episode
    service: 'tigrinya',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/tigrinya/bbc_tigrinya_radio/w3cszzz1?renderer_env=live',
    service: 'tigrinya',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/urdu/bbc_urdu_radio/programmes/p03413l5', // On Demand Brand
    service: 'urdu',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/urdu/bbc_urdu_radio/w172y03qq2blt8p', // On Demand Episode
    service: 'urdu',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/urdu/bbc_urdu_radio/w172y03qq2blt8p?renderer_env=live', // On Demand Episode
    service: 'urdu',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/uzbek/bbc_uzbek_radio/programmes/p03414fb', // On Demand Brand
    service: 'uzbek',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/uzbek/bbc_uzbek_radio/w172y044spy82mn', // On Demand Episode
    service: 'uzbek',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/uzbek/bbc_uzbek_radio/w172x9f9qjcq3lm?renderer_env=live',
    service: 'uzbek',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/zhongwen/simp/bbc_cantonese_radio/programmes/p0340tsy', // On Demand Brand
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/zhongwen/simp/bbc_cantonese_radio/w172xwswq9t42v6', // On Demand Episode
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/zhongwen/simp/podcasts/p02pc9xp/p09kpm0x', // Podcast Episode
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/zhongwen/simp/podcasts/p02pc9xp?renderer_env=live', // Podcast Brand
    service: 'zhongwen',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/zhongwen/simp/bbc_cantonese_radio/w172xn6l7ng41qb?renderer_env=live', // Brand
    service: 'zhongwen',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/zhongwen/simp/podcasts/p02pc9xp/p0968qrl?renderer_env=live', // Podcast Episode
    service: 'zhongwen',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/zhongwen/trad/bbc_cantonese_radio/programmes/p0340tsy', // On Demand Brand
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/zhongwen/trad/bbc_cantonese_radio/w172xwswq9t42v6', // On Demand Episode
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/zhongwen/trad/podcasts/p02pc9xp/p09kpm0x', // Podcast Episode
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/zhongwen/trad/podcasts/p02pc9xp?renderer_env=live', // Podcast Brand
    service: 'zhongwen',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/zhongwen/trad/bbc_cantonese_radio/w172xf3r5x8hw4v?renderer_env=live', // Brand
    service: 'zhongwen',
    runforEnv: 'local',
    tests,
  },
  {
    path: '/zhongwen/trad/podcasts/p02pc9xp/p0968qrl?renderer_env=live', // Podcast Episode
    service: 'zhongwen',
    runforEnv: 'local',
    tests,
  },
];

runTestsForPage({
  pageType,
  testSuites,
});
