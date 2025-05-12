import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import {
  serviceWorkerIsAvailable,
  serviceWorkerIsRegistered,
  serviceWorkerCaching,
} from './assertions';
import { getPathWithSuffix } from '../atiAnalytics/helpers';

const tests = [
  serviceWorkerIsAvailable,
  serviceWorkerIsRegistered,
  serviceWorkerCaching,
];

const testSuites = [
  {
    path: '/pidgin/articles/czje40pxkypo?renderer_env=live',
    runforEnv: ['local', 'test', 'live'],
    service: 'pidgin',
    tests,
  },
  {
    path: '/serbian/articles/crm32wvejv1o/cyr?renderer_env=live',
    runforEnv: ['local', 'test', 'live'],
    service: 'serbian',
    tests,
  },
  {
    path: '/serbian/articles/crm32wvejv1o/lat?renderer_env=live',
    runforEnv: ['local', 'test', 'live'],
    service: 'serbian',
    tests,
  },
];

const ampTestSuites = testSuites.map(testSuite => ({
  ...testSuite,
  path: getPathWithSuffix({ path: testSuite.path, suffix: '.amp' }),
  applicationType: 'amp',
}));

runTestsForPage({
  testSuites: [...testSuites, ...ampTestSuites],
});
