import {
  errorMessage,
  errorPageInlineLink,
  errorTitle,
} from '../../../cypress/support/bodyTestHelper';
import news from '../../../src/app/lib/config/services/news';

// This is a 3rd party test, but if it fails we should arrange for it to be fixed.
describe('Test the mozart 404 page', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit('https://www.bbc.com/news/articles/cxvxrj8tvppo', {
      failOnStatusCode: false,
    });
  });

  it('should have the correct lang & dir attributes', () => {
    cy.get('html').should('have.attr', 'lang', 'en_GB');
  });

  it('should display a relevant error message on screen', () => {
    errorMessage(news);
  });

  it('should have an inline link on the page that is linked to the home page', () => {
    errorPageInlineLink(news);
  });

  it('should have a relevant error title in the head', () => {
    errorTitle(news);
  });
});
