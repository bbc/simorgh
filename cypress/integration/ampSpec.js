import {
  getElement,
  retrieve404BodyResponse,
  testNonHTMLResponseCode,
} from '../support/testHelper';

describe('AMP Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'c0000000025o' & 'c0000000027o' are available within the PROD enviroment
    cy.visit('/news/articles/c0000000027o.amp');
  });

  describe('AMP Status', () => {
    it('should return a 200 response', () => {
      testNonHTMLResponseCode('/news/articles/c0000000027o.amp', 200);
    });
  });

  it('should error gracefully', () => {
    retrieve404BodyResponse(
      '/news/articles/c0000000027o.cake',
      'No route was found for /news/articles/c0000000027o.cake.',
    );
    retrieve404BodyResponse(
      '/news/lol/c0000000027o.amp',
      'No route was found for /news/lol/c0000000027o.amp.',
    );
    retrieve404BodyResponse(
      '/cake/articles/c0000000027o.amp',
      'No route was found for /cake/articles/c0000000027o.amp.',
    );
  });

  it('should have AMP attribute', () => {
    getElement('html').should('have.attr', 'amp');
  });

  it('should not have an AMP attribute on the main article', () => {
    cy.visit('/news/articles/c0000000027o');
    getElement('html').should('not.have.attr', 'amp');
  });
});
