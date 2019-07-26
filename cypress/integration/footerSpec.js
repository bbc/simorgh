import services from '../support/config/services';

describe('Footer Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`/news/articles/${services.news.pageTypes.articles.asset}`);
  });
  it('should render the BBC News branding', () => {
    cy.get('footer a')
      .eq(0)
      .should('contain', 'BBC News');
  });

  it('should have working links', () => {
    cy.get('footer ul').within(() => {
      cy.checkLinks('0', '/news/help-41670342');
      cy.checkLinks('1', '/terms');
      cy.checkLinks('2', '/aboutthebbc/');
      cy.checkLinks('3', '/privacy/');
      cy.checkLinks('4', '/usingthebbc/cookies/');
      cy.checkLinks('5', '/accessibility/');
      cy.checkLinks('6', '/contact/');
    });
  });

  it('should contain copyright text', () => {
    cy.get('footer p').should(
      'contain',
      `© ${new Date().getFullYear()} BBC. The BBC is not responsible for the content of external sites. `,
    );
  });
  it('should contain a link in the copyright text', () => {
    cy.get('footer p')
      .children('a')
      .should('have.attr', 'href')
      .and('contain', '/help/web/links');
  });
});
