import services from '../support/config/services';
import { checkCanonicalURL } from '../support/metaTestHelper';
import { describeForLocalOnly } from '../support/limitEnvRuns';

// TODO Enable all disabled tests below once bbc/simorgh#1906 has been merged.
//   The Metadata container performs some AMP work, so the AMP on the front page
//   will not be valid until the Metadata container has been added into the front
//   page container. 🙃
describeForLocalOnly('AMP Tests on a .amp page', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`${services.igbo.pageTypes.frontPage.asset}.amp`);
  });

  describe('AMP Status', () => {
    it('should return a 200 response', () => {
      cy.testResponseCodeAndType(
        `${services.igbo.pageTypes.frontPage.asset}.amp`,
        200,
        'text/html',
      );
    });
  });

  it('should error gracefully', () => {
    cy.testResponseCodeAndType(
      `${services.igbo.pageTypes.frontPage.asset}.cake`,
      404,
      'text/html',
    );
    cy.testResponseCodeAndType(
      `/amp${services.igbo.pageTypes.frontPage.asset}`,
      404,
      'text/html',
    );
    cy.testResponseCodeAndType(
      `${services.igbo.pageTypes.frontPage.asset}/amp`,
      404,
      'text/html',
    );
    cy.testResponseCodeAndType(`/cake.amp`, 404, 'text/html');
  });

  xit('should have AMP attribute', () => {
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

  xit('should include the canonical URL', () => {
    const { origin } = window.location;
    const canonicalOrigin = origin.includes('localhost')
      ? 'https://www.bbc.com'
      : origin;

    checkCanonicalURL(
      `${canonicalOrigin}${services.igbo.pageTypes.frontPage.asset}`,
    );
  });

  xit('should not have an AMP attribute on the main article', () => {
    cy.visit(`${services.igbo.pageTypes.frontPage.asset}`);
    cy.get('html').should('not.have.attr', 'amp');
  });
});
