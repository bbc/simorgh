import config from '../../../support/config/services';

const tests = ({ service }) =>
  describe(`Amp Tests`, () => {
    describe('AMP Status', () => {
      it('should return a 200 response', () => {
        cy.testResponseCodeAndType(
          `${config[service].pageTypes.frontPage.path}.amp`,
          200,
          'text/html',
        );
      });
    });

    it('should have AMP attribute', () => {
      cy.get('html').should('have.attr', 'amp');
    });

    it('should load the AMP framework', () => {
      // .eq(1) gets the amp <script> as:
      // the first loaded is a Cypress <script>
      cy.get('head script')
        .eq(2)
        .should('have.attr', 'src', 'https://cdn.ampproject.org/v0.js');

      cy.get('head script')
        .eq(3)
        .should(
          'have.attr',
          'src',
          'https://cdn.ampproject.org/v0/amp-geo-0.1.js',
        );

      cy.get('head script')
        .eq(4)
        .should(
          'have.attr',
          'src',
          'https://cdn.ampproject.org/v0/amp-consent-0.1.js',
        );
    });

    it('should load the AMP body scripts', () => {
      cy.get('body script')
        .eq(0)
        .should('have.attr', 'type', 'application/json');
      cy.get('body script')
        .eq(1)
        .should('have.attr', 'type', 'application/json');
    });

    it('should have any correct amp scripts in the body and the head', () => {
      cy.get('body script')
        .its('length')
        .should('be', 2); // 1 for amp-geo + 1 for amp-consent
      cy.get('head script')
        .its('length')
        .should('be', 4); // 1 for amp.js + 1 for amp-geo + 1 for amp-consent + 1 that Cypress injects into the head
    });

    it('should contain an amp-img', () => {
      cy.get('li')
        .should('be.visible')
        .within(() => {
          cy.get('amp-img').should('be.visible');
        });
    });
  });

export default tests;
