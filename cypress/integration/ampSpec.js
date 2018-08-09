import { testNonHTMLResponseCode } from '../support/testHelper';

describe('AMP Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'scenario-25' & 'scenario-27' are available within the PROD enviroment
    cy.visit('/article/amp/scenario-27');
  });

  describe('AMP Status', () => {
    it('should return 200', () => {
      testNonHTMLResponseCode('/article/amp/scenario-27', 200);
    });
  });
});
