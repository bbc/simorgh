// import runTestsForPage from '../../../support/helpers/runTestsForPage';
import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import { testsThatFollowSmokeTestConfig } from './tests';
import {
  // testsThatAlwaysRunForAMPOnly,
  testsThatFollowSmokeTestConfigForAMPOnly,
} from './testsForAMPOnly';
import {
  testsThatAlwaysRunForCanonicalOnly,
  testsThatFollowSmokeTestConfigForCanonicalOnly,
  testsThatNeverRunDuringSmokeTestingForCanonicalOnly,
} from './testsForCanonicalOnly';

const pageType = 'storyPage';
const tests = [
  testsThatAlwaysRunForCanonicalOnly,
  testsThatFollowSmokeTestConfig,
  testsThatFollowSmokeTestConfigForCanonicalOnly,
  testsThatFollowSmokeTestConfigForAMPOnly,
  testsThatNeverRunDuringSmokeTestingForCanonicalOnly, // todo: sthis is skipped now - shall I jsut remove it
  // todo: AMP Only tests seem to call most-read assertions and they fail, not sure when they should be run
  // testsThatAlwaysRunForAMPOnly,
];
const testSuites = [
  // gahuza has enabled = true and smoke = false.
  {
    path: '/gahuza/amakuru-52821373',
    service: 'gahuza',
    runforEnv: 'live',
    tests,
  },
  {
    path: '/gahuza/23307435',
    service: 'gahuza',
    runforEnv: ['local', 'test'],
    tests,
  },
  {
    path: '/hausa/labarai-54292969',
    service: 'hausa',
    runforEnv: 'live',
    tests,
  },
  {
    path: '/hausa/labarai-23190660',
    service: 'hausa',
    runforEnv: ['local', 'test'],
    tests,
  },
  // igbo has enabled = true and smoke = false.
  {
    path: '/igbo/afirika-52816709',
    service: 'igbo',
    runforEnv: 'live',
    tests,
  },
  {
    path: '/igbo/afirika-23252735',
    service: 'igbo',
    runforEnv: ['local', 'test'],
    tests,
  },
  // has enabled = true and smoke = false.
  {
    path: '/indonesia/dunia-53413801',
    service: 'indonesia',
    runforEnv: 'live',
    tests,
  },
  // has enabled = true and smoke = false.
  {
    path: '/kyrgyz/kyrgyzstan-52891593',
    service: 'kyrgyz',
    runforEnv: 'live',
    tests,
  },
  {
    path: '/kyrgyz/23292889',
    service: 'kyrgyz',
    runforEnv: 'test',
    tests,
  },
  // has enabled = true and smoke = true.
  {
    path: '/mundo/noticias-54274735',
    service: 'mundo',
    runforEnv: 'live',
    tests,
  },
  {
    path: '/mundo/noticias-66171332',
    service: 'mundo',
    runforEnv: 'live',
    tests,
  },
  {
    path: '/mundo/23263889',
    service: 'mundo',
    runforEnv: ['test', 'local'],
    tests,
  },
  {
    path: '/mundo/noticias-internacional-51266689',
    service: 'mundo',
    runforEnv: 'local',
    tests,
  },
  // has enabled = true and smoke = false.
  {
    path: '/news/uk-56342465',
    service: 'news',
    runforEnv: 'live',
    tests,
  },
  {
    path: '/news/technology-56294493',
    service: 'news',
    runforEnv: 'live',
    tests,
  },
  {
    path: '/news/23393110',
    service: 'news',
    runforEnv: 'test',
    tests,
  },
  // has enabled = true and smoke = false.
  {
    path: '/newsround/56331357',
    service: 'newsround',
    runforEnv: 'live',
    tests,
  },
  {
    path: '/newsround/23212028',
    service: 'newsround',
    runforEnv: 'test',
    tests,
  },
  // has enabled = true and smoke = false.
  {
    path: '/pashto/world-52873295',
    service: 'pashto',
    runforEnv: 'live',
    tests,
  },
  {
    path: '/pashto/23289748',
    service: 'pashto',
    runforEnv: 'test',
    tests,
  },
  // has enabled = true and smoke = true.
  {
    path: '/russian/features-54391793',
    service: 'russian',
    runforEnv: ['test', 'local'],
    tests,
  },
  {
    path: '/russian/news-55041160',
    service: 'russian',
    runforEnv: ['test', 'local'],
    tests,
  },
  // has enabled = true and smoke = true.
  {
    path: '/sinhala/world-51723376',
    service: 'sinhala',
    runforEnv: 'live',
    tests,
  },
  {
    path: '/sinhala/23225618',
    service: 'sinhala',
    runforEnv: 'test',
    tests,
  },
  // has enabled = true and smoke = false.
  {
    path: '/sport/rugby-union/56359986',
    service: 'sport',
    runforEnv: ['live', 'local'],
    tests,
  },
  {
    path: '/sport/golf/56318994',
    service: 'sport',
    runforEnv: ['live', 'local'],
    tests,
  },
  {
    path: '/sport/formula1/23355387',
    service: 'sport',
    runforEnv: 'test',
    tests,
  },
  {
    path: '/sport/tennis/23372108',
    service: 'sport',
    runforEnv: 'test',
    tests,
  },
  // has enabled = true and smoke = true.
  {
    path: '/thai/international-53381389',
    service: 'thai',
    runforEnv: 'live',
    tests,
  },
  // has enabled = true and smoke = false.
  {
    path: '/yoruba/afrika-58539527',
    service: 'yoruba',
    runforEnv: 'live',
    tests,
  },
  {
    path: '/yoruba/afrika-23252769',
    service: 'yoruba',
    runforEnv: 'test',
    tests,
  },
];

runTestsForPage({
  pageType,
  testSuites: [...testSuites],
});
