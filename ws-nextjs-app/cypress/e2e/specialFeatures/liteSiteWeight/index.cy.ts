/* eslint-disable import/no-relative-packages */
import * as assertPageWeight from '../../../../../cypress/e2e/specialFeatures/liteSiteWeight/assertions/liteSiteWeight';
import runTestsForPage from '../../../support/helpers/runTestsForPage';

const testSuites = [
  {
    path: '/urdu/live/c04z6x46l0vt.lite?renderer_env=live',
    runforEnv: ['local'],
    pageType: 'Live',
    tests: [assertPageWeight],
  },
];

runTestsForPage({
  testSuites: [...testSuites],
  testIsolation: true,
  pageType: 'all',
});
