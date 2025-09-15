import { STATIC_PAGE } from '#app/routes/utils/pageTypes';
import { assertLiveTvPage, assertLiveTvPageLocal } from './assertions';
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
    runforEnv: ['live'],
    tests: [assertLiveTvPage],
  },
];

runTestsForPage({
  testSuites,
  pageType: STATIC_PAGE,
});
