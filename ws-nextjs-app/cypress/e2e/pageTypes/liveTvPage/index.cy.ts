import { LIVE_TV_PAGE } from '#app/routes/utils/pageTypes';
import runTestsForPage from '../../../support/helpers/runTestsForPage';
import { assertLiveTvPage } from './assertions';

const testSuites = [
  {
    path: '/dari/watch/bbc_afghan_tv/live',
    service: 'dari',
    pageType: LIVE_TV_PAGE,
    runforEnv: ['local', 'test'],
    tests: [assertLiveTvPage],
  },
];

runTestsForPage({
  testSuites,
  pageType: LIVE_TV_PAGE,
});
