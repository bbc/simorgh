import { describeForLocalOnly } from '../support/limitEnvRuns';
import {
  errorMessage,
  errorPageInlineLink,
  errorTitle,
  hasHtmlLangDirAttributes,
} from '../support/bodyTestHelper';
import persian from '../../src/app/lib/config/services/persian';

// This is duplicated between this file and errorPageNews.js.
// This is because both these files will be consolidated into 1 file in a later PR.
const nonExistentAsset = 'cxvxrj8tvppo';

describeForLocalOnly('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`/persian/articles/${nonExistentAsset}`, {
      failOnStatusCode: false,
    });
  });

  it('should return a 404 error code', () => {
    cy.testResponseCodeAndType(
      `/persian/articles/${nonExistentAsset}`,
      404,
      'text/html',
    );
  });

  it('should have the correct lang & dir attributes', () => {
    hasHtmlLangDirAttributes({ lang: 'fa', dir: 'rtl' });
  });

  it('should display a relevant error message on screen', () => {
    cy.visit(`/persian/articles/${nonExistentAsset}`, {
      failOnStatusCode: false,
    });
    errorMessage(persian);

    cy.visit(`/persian/articles/${nonExistentAsset}`, {
      failOnStatusCode: false,
    });
    errorMessage(persian);
  });

  it('should have an inline link on the page that is linked to the home page', () => {
    errorPageInlineLink(persian);
  });

  it('should have a relevant error title in the head', () => {
    errorTitle(persian);
  });
});
