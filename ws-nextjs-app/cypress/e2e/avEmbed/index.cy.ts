import pageVisit from './pageVisit';
import runTestsForPage from '../../support/helpers/runTestsForPage';

const VALID_ENV = ['test', 'local'];

const testsForPage = {
  pageType: 'avEmbed',
  tests: [pageVisit],
};

describe('AVEmbed Page Spec', () => {
  if (VALID_ENV.includes(Cypress.env('APP_ENV'))) {
    runTestsForPage(testsForPage);
  }
});
