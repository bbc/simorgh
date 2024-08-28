import mediaPlayerTests from './mediaPlayer';
import pageVisit from './pageVisit';
import { testsThatAlwaysRunForAllPages } from '../testsForAllPages';
import runTestsForPage from '../../support/helpers/runTestsForPage';

const VALID_ENV = ['test', 'local'];

const testDetails = {
  pageType: 'live',
  testSuites: [
    {
      path: '/pidgin/live/c7p765ynk9qt',
      id: 'c7p765ynk9qt',
      service: 'pidgin',
      tests: [testsThatAlwaysRunForAllPages, pageVisit, mediaPlayerTests],
    },
  ],
};

describe('Live Page Spec', () => {
  if (VALID_ENV.includes(Cypress.env('APP_ENV'))) {
    runTestsForPage(testDetails);
  }
});
