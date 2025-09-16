import { STATIC_PAGE } from '#app/routes/utils/pageTypes';
import { assertLiveTvPageTest, assertLiveTvPageLocal } from './assertions';
import runTestsForPage from '../../support/helpers/runTestsForPage';

const testSuites = [
  {
    path: '/[service]/watch/[id]/live',
    service: 'ws',
    runforEnv: ['local'],
    tests: [assertLiveTvPageLocal],
  },
  {
    path: '/[service]/watch/[id]/live',
    service: 'ws',
    runforEnv: ['test'],
    tests: [assertLiveTvPageTest],
  },
];

runTestsForPage({
  testSuites,
  pageType: STATIC_PAGE,
});
