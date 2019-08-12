import config from '../../../support/config/services';
import envConfig from '../../../support/config/envs';
import describeForEuOnly from '../../../support/describeForEuOnly';
import { hasFrontPage } from '../../../support/serviceHasPageType';
import { getFrontPageUrl } from '../../../support/getPageTypeUrl';

const runTests = service => {
  describe(`Frontpage AMP tests for ${service}`, () => {
    before(() => {
      cy.visit(`${getFrontPageUrl(service)}.amp`);
    });

    describe('AMP Status', () => {
      it('should return a 200 response', () => {
        cy.testResponseCodeAndType(
          `${getFrontPageUrl(service)}.amp`,
          200,
          'text/html',
        );
      });
    });

    describe('ATI', () => {
      it('should have an amp-analytics tag with the ati url', () => {
        cy.hasAmpAnalyticsAtiUrl(
          envConfig.atiUrl,
          config[service].isWorldService ? envConfig.atiAnalyticsWSBucket : '',
        );
      });
    });

    describeForEuOnly('Consent Banners', () => {
      it('have correct translations', () => {
        cy.hasConsentBannerTranslations(service);
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

    it('should include the canonical URL', () => {
      cy.checkCanonicalURL(`https://www.bbc.com${getFrontPageUrl(service)}`);
    });
  });
};

Object.keys(config)
  .filter(hasFrontPage)
  .forEach(runTests);
