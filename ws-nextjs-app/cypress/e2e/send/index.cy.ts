import pageVisit from './pageVisit';
import { testsThatAlwaysRunForAllPages } from '../testsForAllPages';
import runTestsForPage from '../../support/helpers/runTestsForPage';

const canonicalTestSuites = [
  {
    path: '/somali/send/u130092370',
    id: 'u130092370',
    runforEnv: ['test', 'local'],
    service: 'somali',
    tests: [testsThatAlwaysRunForAllPages, pageVisit],
  },
  {
    path: '/mundo/send/u50853489',
    id: 'u50853489',
    service: 'mundo',
    runforEnv: ['test', 'local'],
    tests: [testsThatAlwaysRunForAllPages, pageVisit],
  },
];

const liteTestSuites = canonicalTestSuites.map(testSuite => {
  return {
    ...testSuite,
    path: `${testSuite.path}.lite`,
  };
});

const testDetails = {
  pageType: 'send',
  testSuites: [...canonicalTestSuites, ...liteTestSuites],
};

describe('Send Page Spec', () => {
  runTestsForPage(testDetails);
});
