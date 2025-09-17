import { LIVE_TV_PAGE } from '#app/routes/utils/pageTypes';
import { assertLiveTvPage } from './assertions';
import runTestsForPage from '../../support/helpers/runTestsForPage';

const testSuites = [
  {
    path: 'dari/watch/bbc_afghan_tv/live',
    service: 'ws',
    runforEnv: ['local', 'test'],
    tests: [assertLiveTvPage],
  },
];

runTestsForPage({
  testSuites,
  pageType: LIVE_TV_PAGE,
});
