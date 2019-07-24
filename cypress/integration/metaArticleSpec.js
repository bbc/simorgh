import envConfig from '../support/config/envs';
import services from '../support/config/services';
import testData from '../../src/app/lib/config/services';
import { hasHtmlLangDirAttributes } from '../support/bodyTestHelper';
import { checkAmpHTML, checkCanonicalURL } from '../support/metaTestHelper';

const serviceHasArticlePageType = service =>
  services[service].pageTypes.articles !== undefined;

Object.keys(services)
  .filter(serviceHasArticlePageType)
  .forEach(service => {
    describe(`${service} Article Meta Tests`, () => {
      // eslint-disable-next-line no-undef
      beforeEach(() => {
        cy.visit(
          `/${service}/articles/${services[service].pageTypes.articles.asset}`,
        );
      });

      it('should have the correct lang & dir attributes', () => {
        hasHtmlLangDirAttributes({
          lang: `${testData[service].datetimeLocale}`,
          dir: `${testData[service].dir}`,
        });
      });

      it('should have a nofollow meta tag', () => {
        cy.retrieveMetaDataContent('head meta[name="robots"]', 'noodp,noydir');
      });

      it('should load a maximum of two Reith font files', () => {
        const fontFamiliesArray = [];
        cy.get('*')
          .each(element => {
            const fontFamily = Cypress.$(element).css('font-family');
            if (
              fontFamily &&
              !fontFamiliesArray.includes(fontFamily) &&
              fontFamily.startsWith(`${services[service].font}`)
            ) {
              fontFamiliesArray.push(fontFamily);
            }
          })
          .then(() => {
            expect(fontFamiliesArray.length).to.be.lessThan(3);
            expect(fontFamiliesArray.length).to.be.greaterThan(0);
          });
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

      cy.facebookMeta(
        '100004154058350',
        '1609039196070050',
        `${testData[service].articleAuthor}`,
      );

      cy.openGraphMeta(
        'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
        `${testData[service].defaultImage}`,
        `${testData[service].defaultImageAltText}`,
        `${testData[service].locale}`,
        `${testData[service].defaultImageAltText}`,
        "Meghan's bouquet laid on tomb of unknown warrior",
        'article',
        `https://www.bbc.com/${service}/articles/${services[service].pageTypes.articles.asset}`,
      );

      cy.twitterMeta(
        'summary_large_image',
        `${testData[service].twitterCreator}`,
        'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
        `${testData[service].defaultImageAltText}`,
        `${testData[service].defaultImage}`,
        `${testData[service].twitterSite}`,
        "Meghan's bouquet laid on tomb of unknown warrior",
      );

      it('should include metadata that matches the JSON data', () => {
        cy.metadataAssertion();
      });

      it('should include the canonical URL & ampHTML', () => {
        const currentOrigin = window.location.origin;
        const canonicalOrigin = 'https://www.bbc.com';
        checkCanonicalURL(
          `${canonicalOrigin}/${service}/articles/${services[service].pageTypes.articles.asset}`,
        );
        checkAmpHTML(
          `${currentOrigin}/${service}/articles/${services[service].pageTypes.articles.asset}.amp`,
        );
      });

      it('should include metadata in the head on AMP pages', () => {
        cy.metadataAssertionAMP(
          `/${service}/articles/${services[service].pageTypes.articles.asset}.amp`,
        );
      });

      it('should include mainEntityOfPage in the LinkedData', () => {
        cy.get('script[type="application/ld+json"]')
          .should('contain', 'mainEntityOfPage')
          .and('contain', 'author')
          .and('contain', 'headline');
      });
    });
  });
