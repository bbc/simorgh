import services from '../../../../support/config/services';

describe('Header Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`/news/articles/${services.news.pageTypes.articles.asset}`);
  });

  it('should render the BBC News branding', () => {
    cy.get('header a').should('contain', 'BBC News');
  });
});
