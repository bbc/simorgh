import {
  errorMessage,
  errorPageInlineLink,
  errorTitle,
  hasHtmlLangDirAttributes,
} from '../support/bodyTestHelper';
import testData from '../../src/app/lib/config/services';
import services from '../support/config/services';

const serviceHasNonExistentArticle = service =>
  services[service].pageTypes.nonExistentarticle !== undefined;

// These must only ever be run locally as otherwise you're testing
// the mozart page not the response from this application.
Object.keys(services)
  .filter(serviceHasNonExistentArticle)
  .forEach(service => {
    describe(`${service} Article Error Page Tests`, () => {
      // eslint-disable-next-line no-undef
      before(() => {
        cy.visit(
          `/${service}/articles/${services[service].pageTypes.nonExistentarticle.asset}`,
          {
            failOnStatusCode: false,
          },
        );
      });

      it('should return a 404 error code', () => {
        cy.testResponseCodeAndType(
          `/${service}/articles/${services[service].pageTypes.nonExistentarticle.asset}`,
          404,
          'text/html',
        );
      });

      it('should have the correct lang & dir attributes', () => {
        hasHtmlLangDirAttributes({
          lang: `${testData[service].lang}`,
          dir: `${testData[service].dir}`,
        });
      });

      it('should display a relevant error message on screen', () => {
        errorMessage(testData[service]);
      });

      it('should have an inline link on the page that is linked to the home page', () => {
        errorPageInlineLink(testData[service]);
      });

      it('should have a relevant error title in the head', () => {
        errorTitle(testData[service]);
      });
    });
  });
