import pageVisit from './pageVisit';
import { testsThatAlwaysRunForAllPages } from '../testsForAllPages';
import runTestsForPage from '../../support/helpers/runTestsForPage';

const VALID_ENV = ['test', 'local'];

const testDetails = {
  pageType: 'send',
  testSuites: [
    {
      path: '/somali/send/u130092370',
      id: 'u130092370',
      service: 'somali',
      tests: [testsThatAlwaysRunForAllPages, pageVisit],
    },
    {
      path: '/mundo/send/u50853489',
      id: 'u50853489',
      service: 'mundo',
      tests: [testsThatAlwaysRunForAllPages, pageVisit],
    },
  ],
};

describe('Send Page Spec', () => {
  if (VALID_ENV.includes(Cypress.env('APP_ENV'))) {
    runTestsForPage(testDetails);
  }
});
