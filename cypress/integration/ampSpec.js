import { getElement } from '../support/bodyTestHelper';
import { testNonHTMLResponseCode } from '../support/metaTestHelper';

describe('AMP Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'c0000000025o' & 'c0000000027o' are available within the PROD enviroment
    cy.visit('/news/articles/amp/c0000000027o');
  });

  describe('AMP Status', () => {
    it('should return 200', () => {
      testNonHTMLResponseCode('/news/articles/amp/c0000000027o', 200);
    });
  });

  it('should have AMP attribute', () => {
    getElement('html').should('have.attr', 'amp');
  });

  it('should load the AMP framework', () => {
    // .eq(1) gets the amp <script> as the first loaded is a Cypress <script>
    const ampScript = getElement('head script').eq(1);
    ampScript.should('have.attr', 'src', 'https://cdn.ampproject.org/v0.js');
  });

  it('should not have an AMP attribute on the main article', () => {
    cy.visit('/news/articles/c0000000027o');
    getElement('html').should('not.have.attr', 'amp');
  });
});
