import pageVisit from './pageVisit';
import runTestsForPage from '../../support/helpers/runTestsForPage';

const VALID_ENV = ['test', 'local'];

const testDetails = {
  pageType: 'avEmbed',
  testSuites: [
    {
      path: '/russian/av-embeds/media-38886884',
      id: 'media-38886884',
      service: 'russian',
      tests: [pageVisit],
    },
  ],
};

describe('AVEmbed Page Spec', () => {
  if (VALID_ENV.includes(Cypress.env('APP_ENV'))) {
    runTestsForPage(testDetails);
  }
});
