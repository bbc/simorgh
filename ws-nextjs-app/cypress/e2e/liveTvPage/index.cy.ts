import { LIVE_TV_PAGE } from '#app/routes/utils/pageTypes';
import { assertLiveTvPageTest, assertLiveTvPageLocal } from './assertions';
import runTestsForPage from '../../support/helpers/runTestsForPage';

const testSuites = [
  {
    path: 'dari/watch/bbc_afghan_tv/live',
    service: 'ws',
    runforEnv: ['local'],
    tests: [assertLiveTvPageLocal],
  },
  {
    path: 'dari/watch/bbc_afghan_tv/live',
    service: 'ws',
    runforEnv: ['test'],
    tests: [assertLiveTvPageTest],
  },
];

runTestsForPage({
  testSuites,
  pageType: LIVE_TV_PAGE,
});
