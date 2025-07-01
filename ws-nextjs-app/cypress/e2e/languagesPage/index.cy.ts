import { STATIC_PAGE } from '#app/routes/utils/pageTypes';
import { assertWSLanguagesPage, assertWSLanguagesPageURN } from './assertions';
import runTestsForPage from '../../support/helpers/runTestsForPage';

const testEnvironmentTestSuites = [
  {
    path: '/ws/languages',
    service: 'ws',
    runforEnv: ['test'],
    tests: [assertWSLanguagesPageURN],
  },
];

const liveEnvironmentTestSuites = [
  {
    path: '/ws/languages',
    service: 'ws',
    runforEnv: ['live'],
    tests: [assertWSLanguagesPage],
  },
];

runTestsForPage({
  testSuites: [...testEnvironmentTestSuites, ...liveEnvironmentTestSuites],
  testIsolation: true,
  pageType: STATIC_PAGE,
});
