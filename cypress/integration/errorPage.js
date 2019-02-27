import config from '../support/config';
import { getElement, renderedTitle } from '../support/bodyTestHelper';
import { testResponseCode } from '../support/metaTestHelper';
import news from '../../src/app/lib/config/services/news';

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
    getElement('h1').should('contain', `${news.translations.error[404].title}`);
  });

  it('should have an inline link on the page that is linked to the home page', () => {
    getElement('p')
      .eq(1)
      .within(() => {
        getElement('a').should(
          'have.attr',
          'href',
          `${news.translations.error[404].callToActionLinkUrl}`,
        );
      });
  });

  it('should have a relevant error title in the head', () => {
    renderedTitle(`${news.translations.error[404].title} - ${news.brandName}`);
  });
});
