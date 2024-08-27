import pageVisit from './pageVisit';
import { testsThatAlwaysRunForAllPages } from '../testsForAllPages';
import runTestsForPage from '../../support/helpers/runTestsForPage';

const VALID_ENV = ['test', 'local'];

const testsForPage = {
  pageType: 'send',
  tests: [testsThatAlwaysRunForAllPages, pageVisit],
};

describe('Send Page Spec', () => {
  if (VALID_ENV.includes(Cypress.env('APP_ENV'))) {
    runTestsForPage(testsForPage);
  }
});
