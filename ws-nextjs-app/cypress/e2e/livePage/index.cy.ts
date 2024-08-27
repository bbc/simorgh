import mediaPlayerTests from './mediaPlayer';
import pageVisit from './pageVisit';
import { testsThatAlwaysRunForAllPages } from '../testsForAllPages';
import runTestsForPage from '../../support/helpers/runTestsForPage';

const VALID_ENV = ['test', 'local'];

const testsForPage = {
  pageType: 'live',
  testsThatAlwaysRunForAllPages,
  pageVisit,
  mediaPlayerTests,
};

describe('Live Page Spec', () => {
  if (VALID_ENV.includes(Cypress.env('APP_ENV'))) {
    runTestsForPage(testsForPage);
  }
});
