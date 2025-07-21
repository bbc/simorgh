import { STATIC_PAGE } from '#app/routes/utils/pageTypes';
import {
  assertWSLanguagesPage,
  assertWSLanguagesPageURN,
  assertWSLanguagesPageLocal,
} from './assertions';
import runTestsForPage from '../../support/helpers/runTestsForPage';

const testSuites = [
  {
    path: '/ws/languages',
    service: 'ws',
    runforEnv: ['local'],
    tests: [assertWSLanguagesPageLocal, assertWSLanguagesPageURN],
  },
  {
    path: '/ws/languages',
    service: 'ws',
    runforEnv: ['test'],
    tests: [assertWSLanguagesPageURN],
  },
  {
    path: '/ws/languages',
    service: 'ws',
    runforEnv: ['live'],
    tests: [assertWSLanguagesPage],
  },
];

runTestsForPage({
  testSuites,
  testIsolation: true,
  pageType: STATIC_PAGE,
});
