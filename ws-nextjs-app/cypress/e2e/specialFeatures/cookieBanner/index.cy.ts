import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import runCanonicalTests from './testsForCanonicalOnly';

const canonicalTests = [runCanonicalTests];

const smokeTestSuites = [
  {
    path: '/thai/articles/czx7w3zyme1o', // Article
    service: 'thai',
    runforEnv: 'live',
    tests: canonicalTests,
  },
  {
    path: '/thai', // Home Page
    service: 'thai',
    runforEnv: ['local', 'test', 'live'],
    tests: canonicalTests,
  },
  {
    path: '/thai/popular/read', // Most Read
    service: 'thai',
    runforEnv: ['local', 'test', 'live'],
    tests: canonicalTests,
  },
  {
    path: '/thai/international-51285795', // CPS MAP with video clip
    service: 'thai',
    runforEnv: 'live',
    tests: canonicalTests,
  },
  {
    path: '/thai/thailand-49950038', // CPS PGL
    service: 'thai',
    runforEnv: ['local', 'live'],
    tests: canonicalTests,
  },
  {
    path: '/thai/articles/c442rl3md0eo', // Article
    service: 'thai',
    runforEnv: ['local', 'test'],
    tests: canonicalTests,
  },
  {
    path: '/thai/international-23252840', // CPS PGL
    service: 'thai',
    runforEnv: 'test',
    tests: canonicalTests,
  },
];

const nonSmokeTestSuites = [
  {
    path: '/mundo/articles/ce7p1pw7165o',
    service: 'mundo',
    runforEnv: 'live',
    tests: canonicalTests,
  },
  {
    path: '/mundo',
    service: 'mundo',
    runforEnv: ['local', 'test', 'live'],
    tests: canonicalTests,
  },
  {
    path: '/mundo/popular/read',
    service: 'mundo',
    runforEnv: ['local', 'test', 'live'],
    tests: canonicalTests,
  },
  {
    path: '/mundo/media-52123665',
    service: 'mundo',
    runforEnv: 'live',
    tests: canonicalTests,
  },
  {
    path: '/mundo/articles/ce42wzqr2mko',
    service: 'mundo',
    runforEnv: ['local', 'test'],
    tests: canonicalTests,
  },
  {
    path: '/mundo/media-23283126',
    service: 'mundo',
    runforEnv: ['local', 'test'],
    tests: canonicalTests,
  },
  {
    path: '/pashto/bbc_pashto_radio/liveradio', // Live Radio,
    service: 'pashto',
    runforEnv: ['local', 'test', 'live'],
    tests: canonicalTests,
  },
  {
    path: '/pashto/multimedia/2016/08/160827_gn_southafrica_female_farmer', // TC2 MAP
    service: 'pashto',
    runforEnv: 'live',
    tests: canonicalTests,
  },
  {
    path: '/pashto/world-52873295', // CPS STY
    service: 'pashto',
    runforEnv: 'live',
    tests: canonicalTests,
  },
  {
    path: '/pashto/arts-and-literature-50230813', // PGL
    service: 'pashto',
    runforEnv: ['live', 'local'],
    tests: canonicalTests,
  },
  {
    path: '/pashto/bbc_pashto_radio/programmes/p0340yr4', // On Demand Radio Brand
    service: 'pashto',
    runforEnv: ['live', 'test'],
    tests: canonicalTests,
  },
  {
    path: '/pashto/world/2016/09/160921_tc2_testmap1?renderer_env=test', // TC2 MAP
    service: 'pashto',
    runforEnv: ['local', 'test'],
    tests: canonicalTests,
  },
  {
    path: '/pashto/23289748', // CPS STY
    service: 'pashto',
    runforEnv: ['local', 'test'],
    tests: canonicalTests,
  },
  {
    path: '/pashto/23092924', // CPS PGL
    service: 'pashto',
    runforEnv: 'test',
    tests: canonicalTests,
  },
  {
    path: '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4', // On Demand TV Brand
    service: 'pashto',
    runforEnv: ['local', 'test'],
    tests: canonicalTests,
  },
  {
    path: '/pashto/bbc_pashto_radio/w3ct2694', // On Demand Radio Episode
    service: 'pashto',
    runforEnv: 'local',
    tests: canonicalTests,
  },
];

const testSuites = Cypress.env('SMOKE') ? smokeTestSuites : nonSmokeTestSuites;

if (!Cypress.env('SKIP_EU')) {
  runTestsForPage({
    pageType: 'all',
    testSuites,
  });
}
