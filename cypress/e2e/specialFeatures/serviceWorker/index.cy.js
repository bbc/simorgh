import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import {
  serviceWorkerIsAvailable,
  serviceWorkerIsRegistered,
  serviceWorkerCaching,
} from './assertions';

const tests = [
  serviceWorkerIsAvailable,
  serviceWorkerIsRegistered,
  serviceWorkerCaching,
];

const testSuites = [
  {
    path: '/pidgin/articles/ce9wk6glg4lo',
    runforEnv: ['local', 'live'],
    service: 'pidgin',
    tests,
  },
  {
    path: '/pidgin/articles/cwl08rd38l6o',
    runforEnv: ['test'],
    service: 'pidgin',
    tests,
  },
  {
    path: '/uzbek/articles/cxj3rjxm6r0o/cyr',
    runforEnv: ['local', 'test'],
    service: 'uzbek',
    tests,
  },
  {
    path: '/uzbek/articles/c6272xwee16o/cyr',
    runforEnv: ['live'],
    service: 'uzbek',
    tests,
  },
  {
    path: '/uzbek/articles/cxj3rjxm6r0o/lat',
    runforEnv: ['local', 'test'],
    service: 'uzbek',
    tests,
  },
  {
    path: '/uzbek/articles/c6272xwee16o/lat',
    runforEnv: ['live'],
    service: 'uzbek',
    tests,
  },
];

runTestsForPage({
  testSuites,
});
