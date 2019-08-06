import envConfig from '../support/config/envs';
import services from '../support/config/services';
import testData from '../../src/app/lib/config/services';

const serviceHasArticlePageType = service =>
  services[service].pageTypes.articles !== undefined;

Object.keys(services)
  .filter(serviceHasArticlePageType)
  .forEach(service => {
    describe(`${service} Article Meta Tests`, () => {
      // eslint-disable-next-line no-undef
      before(() => {
        cy.visit(
          `/${service}/articles/${services[service].pageTypes.articles.asset}`,
        );
      });

      it('should have the correct lang & dir attributes', () => {
        cy.hasHtmlLangDirAttributes({
          lang: `${testData[service].datetimeLocale}`,
          dir: `${testData[service].dir}`,
        });
      });

      it('should have a correct robot meta tag', () => {
        cy.checkMetadataContent('head meta[name="robots"]', 'noodp,noydir');
      });

      it('should have resource hints', () => {
        const resources = [
          envConfig.assetOrigin,
          'https://ichef.bbci.co.uk',
          'https://gel.files.bbci.co.uk',
        ];

        resources.forEach(resource => {
          const selector = `head link[href="${resource}"]`;
          cy.get(selector).should('have.attr', 'rel', 'preconnect');
          cy.get(selector)
            .eq(1)
            .should('have.attr', 'rel', 'dns-prefetch');
        });
      });

      it('should have the correct facebook metadata', () => {
        cy.checkFacebookMetadata(
          '100004154058350',
          '1609039196070050',
          `${testData[service].articleAuthor}`,
        );
      });

      it('should have the correct open graph metadata', () => {
        cy.checkOpenGraphMetadata(
          'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
          `${testData[service].defaultImage}`,
          `${testData[service].defaultImageAltText}`,
          `${testData[service].locale}`,
          `${testData[service].defaultImageAltText}`,
          "Meghan's bouquet laid on tomb of unknown warrior",
          'article',
          `https://www.bbc.com/${service}/articles/${services[service].pageTypes.articles.asset}`,
        );
      });

      it('should have the correct twitter metadata', () => {
        cy.checkTwitterMetadata(
          'summary_large_image',
          `${testData[service].twitterCreator}`,
          'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
          `${testData[service].defaultImageAltText}`,
          `${testData[service].defaultImage}`,
          `${testData[service].twitterSite}`,
          "Meghan's bouquet laid on tomb of unknown warrior",
        );
      });

      it('should include metadata that matches the JSON data', () => {
        cy.window().then(win => {
          cy.get('head').within(() => {
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
          });

          cy.get('html').should(
            'have.attr',
            'lang',
            win.SIMORGH_DATA.pageData.metadata.passport.language,
          );
        });
      });

      it('should include the canonical URL & ampHTML', () => {
        cy.checkCanonicalURL(
          `https://www.bbc.com/${service}/articles/${services[service].pageTypes.articles.asset}`,
        );
        cy.checkAmpHTML(
          `${window.location.origin}/${service}/articles/${services[service].pageTypes.articles.asset}.amp`,
        );
      });

      it('should include metadata in the head on AMP pages', () => {
        cy.window().then(win => {
          cy.visit(
            `/${service}/articles/${services[service].pageTypes.articles.asset}.amp`,
          );
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

      it('should include mainEntityOfPage in the LinkedData', () => {
        cy.get('script[type="application/ld+json"]')
          .should('contain', 'mainEntityOfPage')
          .and('contain', 'author')
          .and('contain', 'headline');
      });
    });
  });
