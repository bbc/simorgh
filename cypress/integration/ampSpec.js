import { getElement, testNonHTMLResponseCode } from '../support/testHelper';

describe('AMP Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'c0000000025o' & 'c0000000027o' are available within the PROD enviroment
    cy.visit('/news/articles/c0000000027o.amp');
  });

  describe('AMP Status', () => {
    it('should return 200', () => {
      testNonHTMLResponseCode('/news/articles/c0000000027o.amp', 200);
    });
  });

  it('should have AMP attribute', () => {
    const regex = /true/;

    getElement('html')
      .should('have.attr', 'amp')
      .and('match', regex);
  });
  it('should not have an AMP attribute on the main article', () => {
    cy.visit('/news/articles/c0000000027o');
    getElement('html').should('not.have.attr', 'amp');
  });
});
