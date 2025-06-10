import { HOME_PAGE, LIVE_PAGE } from '#app/routes/utils/pageTypes';
import * as assertions from './assertions/languagesPage';
import runTestsForPage from '../../support/helpers/runTestsForPage';

const homePageTestSuites = [
  {
    path: '/ws/languages',
    service: 'pidgin',
    runforEnv: ['test'],
    tests: [assertions.assertPidginHomepage],
  },
  {
    path: '/ws/languages?renderer_env=test',
    service: 'pidgin',
    runforEnv: ['test'],
    tests: [assertions.assertPidginHomepage],
  },
  {
    path: '/ws/languages?renderer_env=live',
    service: 'pidgin',
    runforEnv: ['test'],
    tests: [assertions.assertPidginHomepage],
  },
];

const staticPageTestSuites = [
  {
    path: '/ws/languages',
    service: 'ws',
    runforEnv: ['live'],
    tests: [assertions.assertWSLanguagesPage],
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
