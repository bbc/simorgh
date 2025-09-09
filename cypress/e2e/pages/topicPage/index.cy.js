import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import crossPlatformTests from './tests';
import { TOPIC_PAGE } from '../../../../src/app/routes/utils/pageTypes';
import urlValidationTest from '../../../support/helpers/urlValidationTest';

const tests = [crossPlatformTests, urlValidationTest];

const testSuites = [
  {
    path: '/arabic/topics/cwr9j7nv58nt',
    service: 'arabic',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/persian/topics/cw9qgeqd1zqt',
    service: 'persian',
    runforEnv: ['test', 'live'],
    tests: [urlValidationTest],
  },
  {
    path: '/pidgin/topics/c95y35941vrt',
    service: 'pidgin',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/portuguese/topics/cx2ggnx4j72t',
    service: 'portuguese',
    runforEnv: ['test', 'live'],
    tests: [urlValidationTest],
  },
  {
    path: '/serbian/topics/c1gd303q6y6t/lat',
    service: 'serbian',
    runforEnv: ['local', 'test', 'live'],
    tests,
    variant: 'lat',
  },
  {
    path: '/ukrainian/topics/c61k92vrqz6t', // ukrainian in Russian
    service: 'ukrainian',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/uzbek/topics/c8y949r98pgt/cyr',
    service: 'uzbek',
    runforEnv: ['local', 'test', 'live'],
    tests,
    variant: 'cyr',
  },
  {
    path: '/uzbek/topics/c8y949r98pgt/lat',
    service: 'uzbek',
    runforEnv: ['local', 'test', 'live'],
    tests,
    variant: 'lat',
  },
];

runTestsForPage({
  pageType: TOPIC_PAGE,
  testSuites,
});
