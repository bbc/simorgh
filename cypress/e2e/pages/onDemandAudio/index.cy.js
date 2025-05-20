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
    path: '/swahili/bbc_swahili_radio/programmes/p03411mj', // On Demand Brand
    service: 'swahili',
    runforEnv: ['live'],
    enabled: true,
    tests,
  },
  {
    path: '/swahili/bbc_swahili_radio/programmes/p030s7gh', // On Demand Brand
    service: 'swahili',
    runforEnv: ['live'],
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
    runforEnv: ['test', 'live'],
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
    runforEnv: ['test', 'live'],
    enabled: true,
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/w172x7rkcj6v0vz',
    service: 'gahuza',
    runforEnv: ['test', 'live'],
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
];

runTestsForPage({
  pageType,
  testSuites: [...testSuites],
});
