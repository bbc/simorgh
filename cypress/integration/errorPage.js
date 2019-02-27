import config from '../support/config';
import { getElement, renderedTitle } from '../support/bodyTestHelper';
import { testResponseCode } from '../support/metaTestHelper';

describe('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`/news/articles/${config.assets.nonExistent}`, {
      failOnStatusCode: false,
    });
  });

  it('should return a 404 error code', () => {
    testResponseCode(`/news/articles/${config.assets.nonExistent}`, 404);
  });

  it('should display a relevant error message on screen', () => {
    cy.visit(`/news/articles/${config.assets.nonExistent}`, {
      failOnStatusCode: false,
    });
    getElement('h1 span').should('contain', '404');
    getElement('h1').should('contain', 'Page cannot be found');
  });

  it('should have an inline link on the page that is linked to the home page', () => {
    getElement('p')
      .eq(1)
      .within(() => {
        getElement('a').should('have.attr', 'href', 'https://www.bbc.com/news');
      });
  });

  it('should have a relevant error title in the head', () => {
    renderedTitle('Page cannot be found - BBC News');
  });
});
