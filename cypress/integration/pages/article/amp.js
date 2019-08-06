import config from '../../../support/config/services';

const serviceHasArticlePageType = service =>
  config[service].pageTypes.articles !== undefined;

Object.keys(config)
  .filter(serviceHasArticlePageType)
  .forEach(service => {
    describe(`Article - Canonical - ${service}`, () => {
      // eslint-disable-next-line no-undef
      before(() => {
        cy.visit(config[service].pageTypes.articles);
      });

      it('should include metadata in the head on AMP pages', () => {
        cy.window().then(win => {
          cy.visit(`${config[service].pageTypes.articles}.amp`);
          cy.get('meta[name="description"]').should(
            'have.attr',
            'content',
            win.SIMORGH_DATA.pageData.promo.summary ||
              win.SIMORGH_DATA.pageData.promo.headlines.seoHeadline,
          );
          cy.get('meta[name="og:title"]').should(
            'have.attr',
            'content',
            win.SIMORGH_DATA.pageData.promo.headlines.seoHeadline,
          );
          cy.get('meta[name="og:type"]').should(
            'have.attr',
            'content',
            win.SIMORGH_DATA.pageData.metadata.type,
          );
          cy.get('meta[name="article:published_time"]').should(
            'have.attr',
            'content',
            new Date(
              win.SIMORGH_DATA.pageData.metadata.firstPublished,
            ).toISOString(),
          );
          cy.get('meta[name="article:modified_time"]').should(
            'have.attr',
            'content',
            new Date(
              win.SIMORGH_DATA.pageData.metadata.lastPublished,
            ).toISOString(),
          );

          cy.get('html').should(
            'have.attr',
            'lang',
            win.SIMORGH_DATA.pageData.metadata.passport.language,
          );
        });
      });
    });

    describe('AMP Tests on a .amp page', () => {
      // eslint-disable-next-line no-undef
      before(() => {
        cy.visit(`${config.news.pageTypes.articles}.amp`);
      });

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
        cy.testResponseCodeAndType(`/news/lol/c1234567890o.amp`, 404, 'text/html');
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
        cy.hasHtmlLangDirAttributes({ lang: 'en-gb', dir: 'ltr' });
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
        cy.checkCanonicalURL(`${canonicalOrigin}${config.news.pageTypes.articles}`);
      });

      it('should not have an AMP attribute on the main article', () => {
        cy.visit(config.news.pageTypes.articles);
        cy.get('html').should('not.have.attr', 'amp');
      });
    });

    
  });
