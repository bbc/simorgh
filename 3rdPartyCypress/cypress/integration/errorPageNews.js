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
    cy.get('html').should('have.attr', 'lang', 'en-GB');
  });

  it('should display a relevant error message on screen', () => {
    cy.get('h1')
      .should('contain', `${news.translations.error[404].title}`)
      .and('contain', `${news.translations.error[404].statusCode}`);
  });

  it('should have an inline link on the page that is linked to the home page', () => {
    cy.get('main p')
      .eq(1)
      .within(() => {
        cy.get('a').should(
          'have.attr',
          'href',
          `${news.translations.error[404].callToActionLinkUrl}`,
        );
      });
  });

  it('should have a relevant error title in the head', () => {
    cy.title().should(
      'eq',
      `${news.translations.error[404].title} - ${news.brandName}`,
    );
  });
});
