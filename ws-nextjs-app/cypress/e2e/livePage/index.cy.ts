import mediaPlayerTests from './mediaPlayer';
import pageVisit from './pageVisit';

const VALID_ENV = ['test', 'local'];

describe('Live Page Spec', () => {
  if (VALID_ENV.includes(Cypress.env('APP_ENV'))) {
    pageVisit();
    mediaPlayerTests();
  }
});
