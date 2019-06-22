import config from '../../support/configOld';

describe('AMP Tests on a .amp page', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`${config.assets.news}.amp`);
  });

  describe('AMP Status', () => {
    it('should return a 200 response and be HTML', () => {
      cy.testResponseCodeAndType(`${config.assets.news}.amp`, 200, 'text/html');
    });
  });

  it('should error gracefully and return HTML', () => {
    cy.testResponseCodeAndType(`${config.assets.news}.cake`, 404, 'text/html');
    cy.testResponseCodeAndType(
      `/news/lol/${config.assets.news}.amp`,
      404,
      'text/html',
    );
    cy.testResponseCodeAndType(
      `/cake/articles/${config.assets.news}.amp`,
      404,
      'text/html',
    );
  });

  it('should have AMP attribute', () => {
    cy.get('html').should('have.attr', 'amp');
  });

  it('should have lang and dir attributes', () => {
    cy.hasHtmlLangDirAttributes({ lang: 'en-gb', dir: 'ltr' });
  });

  it('should load the AMP framework', () => {
    // .eq(2) gets the amp <script> as:
    // the first loaded is a Cypress <script>
    // the second loaded is the Schema.org metadata script
    const ampScript = cy.get('head script').eq(2);
    ampScript.should('have.attr', 'src', 'https://cdn.ampproject.org/v0.js');

    const ampGeoScript = cy.get('head script').eq(3);
    ampGeoScript.should(
      'have.attr',
      'src',
      'https://cdn.ampproject.org/v0/amp-geo-0.1.js',
    );

    const ampConsentScript = cy.get('head script').eq(4);
    ampConsentScript.should(
      'have.attr',
      'src',
      'https://cdn.ampproject.org/v0/amp-consent-0.1.js',
    );
    const ampAnalyticsScript = cy.get('head script').eq(5);
    ampAnalyticsScript.should(
      'have.attr',
      'src',
      'https://cdn.ampproject.org/v0/amp-analytics-0.1.js',
    );
  });

  it('should load the AMP body scripts', () => {
    const ampGeoScript = cy.get('body script').eq(0);
    ampGeoScript.should('have.attr', 'type', 'application/json');

    const ampConsentScript = cy.get('body script').eq(1);
    ampConsentScript.should('have.attr', 'type', 'application/json');
  });

  it('should have any correct amp scripts in the body and the head', () => {
    cy.get('body script')
      .its('length')
      .should('be', 2); // 1 for amp-geo + 1 for amp-consent
    cy.get('head script')
      .its('length')
      .should('be', 5); // 1 for amp.js + 1 for amp-geo + 1 for amp-consent + 1 for amp-analytics + 1 that Cypress injects into the head
  });

  it('should contain an amp-img', () => {
    const figure = cy.get('figure').eq(0);
    figure.should('be.visible');
    figure.within(() => {
      cy.get('amp-img').should('be.visible');
    });
  });

  it('should include the canonical URL', () => {
    const canonicalOrigin = 'https://www.bbc.com';
    cy.get('head link[rel="canonical"]').should(
      'have.attr',
      'href',
      `${canonicalOrigin}${config.assets.news}`,
    );
  });

  it('should not have an AMP attribute on the main article', () => {
    cy.visit(`${config.assets.news}`);
    cy.get('html').should('not.have.attr', 'amp');
  });
});
