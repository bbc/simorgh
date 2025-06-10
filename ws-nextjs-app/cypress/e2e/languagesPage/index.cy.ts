import { HOME_PAGE, LIVE_PAGE } from '#app/routes/utils/pageTypes';
import { assertPidginHomepage, assertWSLanguagesPage } from './assertions';
import runTestsForPage from '../../support/helpers/runTestsForPage';

const homePageTestSuites = [
  {
    path: '/ws/languages',
    service: 'pidgin',
    runforEnv: ['test'],
    tests: [assertPidginHomepage],
  },
  {
    path: '/ws/languages?renderer_env=test',
    service: 'pidgin',
    runforEnv: ['test'],
    tests: [assertPidginHomepage],
  },
  {
    path: '/ws/languages?renderer_env=live',
    service: 'pidgin',
    runforEnv: ['test'],
    tests: [assertPidginHomepage],
  },
];

const staticPageTestSuites = [
  {
    path: '/ws/languages',
    service: 'ws',
    runforEnv: ['live'],
    tests: [assertWSLanguagesPage],
  },
];

runTestsForPage({
  testSuites: staticPageTestSuites,
  testIsolation: true,
  pageType: LIVE_PAGE,
});

runTestsForPage({
  testSuites: homePageTestSuites,
  testIsolation: true,
  pageType: HOME_PAGE,
});
