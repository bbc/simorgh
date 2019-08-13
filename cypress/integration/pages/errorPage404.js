import iterator from '../../support/iterator';
import config from '../../support/config/services';
import appConfig from '../../../src/app/lib/config/services';

const tests = service =>
  describe(`Tests`, () => {
    describe(`${service} Test we get a 404`, () => {
      it('should return a 404 error code', () => {
        cy.testResponseCodeAndType(
          config[service].pageTypes.errorPage404.path,
          404,
          'text/html',
        );
      });
    });

    describe(`${service} Test we get a 404`, () => {
      it('should return a 404 error code', () => {
        cy.testResponseCodeAndType(
          config[service].pageTypes.errorPage404.path,
          404,
          'text/html',
        );
      });
    });

    describe(`${service} Article Error Page Tests`, () => {
      before(() => {
        cy.visit(config[service].pageTypes.errorPage404.path, {
          failOnStatusCode: false,
        });
      });

      it('should have the correct lang & dir attributes', () => {
        cy.hasHtmlLangDirAttributes({
          lang: `${appConfig[service].lang}`,
          dir: `${appConfig[service].dir}`,
        });
      });

      it('should display a relevant error message on screen', () => {
        cy.get('h1 span').should(
          'contain',
          `${appConfig[service].translations.error[404].statusCode}`,
        );
        cy.get('h1').should(
          'contain',
          `${appConfig[service].translations.error[404].title}`,
        );
      });

      it('should have an inline link on the page that is linked to the home page', () => {
        cy.get('main p')
          .eq(1)
          .within(() => {
            cy.get('a').should(
              'have.attr',
              'href',
              `${appConfig[service].translations.error[404].callToActionLinkUrl}`,
            );
          });
      });

      it('should have a relevant error title in the head', () => {
        cy.title().should(
          'eq',
          `${appConfig[service].translations.error[404].title} - ${appConfig[service].brandName}`,
        );
      });
    });
  });

// -------------------------------------------

const canonicalOnlyTests = service =>
  describe(`Canonical Tests`, () => {
    it('should return a 404 error code', () => {
      cy.testResponseCodeAndType(
        config[service].pageTypes.errorPage404.path,
        404,
        'text/html',
      );
    });
  });

// -------------------------------------------

const ampOnlyTests = service =>
  describe(`Amp Tests`, () => {
    it('should return a 404 error code', () => {
      cy.testResponseCodeAndType(
        `${config[service].pageTypes.errorPage404.path}.amp`,
        404,
        'text/html',
      );
    });
  });

iterator('errorPage404', tests, canonicalOnlyTests, ampOnlyTests);
