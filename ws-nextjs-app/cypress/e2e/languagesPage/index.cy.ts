import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import {
  assertWSLanguagesPageURNLive,
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
    tests: [assertWSLanguagesPageURNLive],
  },
];

runTestsForPage({
  testSuites,
  pageType: HOME_PAGE,
});
