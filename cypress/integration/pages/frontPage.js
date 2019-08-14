import iterator from '../../support/iterator';
import envConfig from '../../support/config/envs';
import config from '../../support/config/services';
import appConfig from '../../../src/app/lib/config/services';

const tests = ({ service }) =>
  describe(`Tests`, () => {
    describe('Frontpage body', () => {
      before(() => {
        cy.viewport(1008, 768);
      });

      describe('Header', () => {
        if (appConfig[service].navigation) {
          it('should have one visible navigation', () => {
            cy.get('nav')
              .should('have.lengthOf', 1)
              .should('be.visible');
          });
        }

        it('should have a visually hidden top-level header', () => {
          cy.get('h1').should('have.length', 1);
        });
      });

      describe('Section', () => {
        it('should be labelled by a visible section label', () => {
          cy.get('section')
            .should('have.length.of.at.least', 1)
            .should('be.visible')
            .each($section => {
              cy.wrap($section).within(() => {
                cy.get('h2').should('have.lengthOf', 1);
              });
            });
        });

        it('should contain at least one story promo', () => {
          cy.get('section').within(() => {
            cy.get('img')
              .should('have.length.of.at.least', 1)
              .should('be.visible');
            cy.get('h3')
              .should('have.length.of.at.least', 1)
              .should('be.visible')
              .find('a')
              .should('have.attr', 'href');
            cy.get('p')
              .should('have.length.of.at.least', 1)
              .should('be.visible');
            cy.get('time')
              .should('have.length.of.at.least', 1)
              .should('be.visible');
          });
        });
      });
    });
  });

// -------------------------------------------

const canonicalOnlyTests = ({ service }) =>
  describe(`Canonical Tests`, () => {
    describe('ATI', () => {
      it('should have a noscript tag with an 1px image with the ati url', () => {
        cy.hasNoscriptImgAtiUrl(
          envConfig.atiUrl,
          config[service].isWorldService ? envConfig.atiAnalyticsWSBucket : '',
        );
      });

      it('should not have an AMP attribute', () => {
        cy.get('html').should('not.have.attr', 'amp');
      });
    });

    describe('Scripts', () => {
      it('should only have expected bundle script tags', () => {
        cy.hasExpectedJsBundles(envConfig.assetOrigin, service);
      });

      it('should have 1 bundle for its service', () => {
        cy.hasOneServiceBundle(service);
      });
    });
  });

// -------------------------------------------

const ampOnlyTests = ({ service }) =>
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

    describe('ATI', () => {
      it('should have an amp-analytics tag with the ati url', () => {
        cy.hasAmpAnalyticsAtiUrl(
          envConfig.atiUrl,
          config[service].isWorldService ? envConfig.atiAnalyticsWSBucket : '',
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

iterator('frontPage', tests, canonicalOnlyTests, ampOnlyTests);
