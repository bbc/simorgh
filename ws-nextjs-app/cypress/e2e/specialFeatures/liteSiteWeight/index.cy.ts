/* eslint-disable import/no-relative-packages */
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import * as assertPageWeight from '../../../../../cypress/e2e/specialFeatures/liteSiteWeight/assertions/liteSiteWeight';
import runTestsForPage from '../../../support/helpers/runTestsForPage';

const testSuites = [
  {
    path: '/burmese/live/ckg19998pldt.lite',
    runforEnv: ['local'],
    tests: [assertPageWeight],
  },
];

runTestsForPage({
  testSuites,
  testIsolation: true,
  pageType: LIVE_PAGE,
});
