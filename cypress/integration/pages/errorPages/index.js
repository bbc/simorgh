import testData from '../../../../src/app/lib/config/services';
import config from '../../../support/config/services';
import { hasErrorPage } from '../../../support/serviceHasPageType';
import { getErrorPageUrl } from '../../../support/getPageTypeUrl';

// Do not change the config to enable these on test or live, those error pages are cached versions of what we see locally.

const runTests = service => {
  describe(`${service} Test we get a 404`, () => {
    it('should return a 404 error code', () => {
      cy.testResponseCodeAndType(getErrorPageUrl, 404, 'text/html');
    });
  });

  describe(`${service} Article Error Page Tests`, () => {
    before(() => {
      cy.visit(getErrorPageUrl, {
        failOnStatusCode: false,
      });
    });

    it('should have the correct lang & dir attributes', () => {
      cy.hasHtmlLangDirAttributes({
        lang: `${testData[service].lang}`,
        dir: `${testData[service].dir}`,
      });
    });

    it('should display a relevant error message on screen', () => {
      cy.get('h1 span').should(
        'contain',
        `${testData[service].translations.error[404].statusCode}`,
      );
      cy.get('h1').should(
        'contain',
        `${testData[service].translations.error[404].title}`,
      );
    });

    it('should have an inline link on the page that is linked to the home page', () => {
      cy.get('main p')
        .eq(1)
        .within(() => {
          cy.get('a').should(
            'have.attr',
            'href',
            `${testData[service].translations.error[404].callToActionLinkUrl}`,
          );
        });
    });

    it('should have a relevant error title in the head', () => {
      cy.renderedTitle(
        `${testData[service].translations.error[404].title} - ${testData[service].brandName}`,
      );
    });

    describe('Consent Banners', () => {
      it('have correct translations', () => {
        cy.hasConsentBannerTranslations(service);
      });
    });
  });
};

Object.keys(config)
  .filter(hasErrorPage)
  .forEach(runTests);
