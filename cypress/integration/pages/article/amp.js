import config from '../../../support/config/services';
import testData from '../../../../src/app/lib/config/services';

const serviceHasArticlePageType = service =>
  config[service].pageTypes.articles !== undefined;

Object.keys(config)
  .filter(serviceHasArticlePageType)
  .forEach(service => {
    describe(`Article - Amp - ${service}`, () => {
      before(() => {
        cy.visit(`${config[service].pageTypes.articles}.amp`);
      });

      it('Metadata', () => {
        cy.request(`${config[service].pageTypes.articles}.json`).then(
          ({ body }) => {
            cy.get('meta[name="description"]').should(
              'have.attr',
              'content',
              body.promo.summary || body.promo.headlines.seoHeadline,
            );
            cy.get('meta[name="og:title"]').should(
              'have.attr',
              'content',
              body.promo.headlines.seoHeadline,
            );
            cy.get('meta[name="og:type"]').should(
              'have.attr',
              'content',
              body.metadata.type,
            );
            cy.get('meta[name="article:published_time"]').should(
              'have.attr',
              'content',
              new Date(body.metadata.firstPublished).toISOString(),
            );
            cy.get('meta[name="article:modified_time"]').should(
              'have.attr',
              'content',
              new Date(body.metadata.lastPublished).toISOString(),
            );

            cy.get('html').should(
              'have.attr',
              'lang',
              body.metadata.passport.language,
            );
          },
        );
      });
    });

    describe('AMP Tests on a .amp page', () => {
      describe('AMP Status', () => {
        it('should return a 200 response', () => {
          cy.testResponseCodeAndType(
            `${config.news.pageTypes.articles}.amp`,
            200,
            'text/html',
          );
        });
      });

      it('should error gracefully', () => {
        cy.testResponseCodeAndType(
          `${config.news.pageTypes.articles.asset}.cake`,
          404,
          'text/html',
        );
        cy.testResponseCodeAndType(
          `/news/lol/c1234567890o.amp`,
          404,
          'text/html',
        );
        cy.testResponseCodeAndType(
          `/cake/articles/c1234567890o.amp`,
          404,
          'text/html',
        );
      });

      it('should have AMP attribute', () => {
        cy.get('html').should('have.attr', 'amp');
      });

      it('should have lang and dir attributes', () => {
        cy.request(`${config[service].pageTypes.articles}.json`).then(
          ({ body }) => {
            cy.hasHtmlLangDirAttributes({
              lang: body.metadata.passport.language,
              dir: testData[service].dir,
            });
          },
        );
      });

      it('should load the AMP framework', () => {
        // .eq(2) gets the amp <script> as:
        // the first loaded is a Cypress <script>
        // the second loaded is the Schema.org metadata script
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

        cy.get('head script')
          .eq(5)
          .should(
            'have.attr',
            'src',
            'https://cdn.ampproject.org/v0/amp-analytics-0.1.js',
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
          .should('be', 5); // 1 for amp.js + 1 for amp-geo + 1 for amp-consent + 1 for amp-analytics + 1 that Cypress injects into the head
      });

      it('should contain an amp-img', () => {
        cy.get('figure')
          .eq(0)
          .should('be.visible')
          .within(() => {
            cy.get('amp-img').should('be.visible');
          });
      });

      it('should include the canonical URL', () => {
        const canonicalOrigin = 'https://www.bbc.com';
        cy.checkCanonicalURL(
          `${canonicalOrigin}${config[service].pageTypes.articles}`,
        );
      });

      it('should not have an AMP attribute on the main article', () => {
        cy.visit(config.news.pageTypes.articles);
        cy.get('html').should('not.have.attr', 'amp');
      });
    });
  });
