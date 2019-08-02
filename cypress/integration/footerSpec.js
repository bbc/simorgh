import services from '../support/config/services';

describe('Footer Tests', () => {
  const copyrightText = `${new Date().getFullYear()} BBC. The BBC is not responsible for the content of external sites.`;
  const copyrightSymbol = '©';

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
    cy.get('footer p').should('contain', copyrightText);
<<<<<<< HEAD
  });
  it('footer should contain copyright symbol', () => {
    cy.get('footer span').should('contain', copyrightSymbol);
  });
  it('footer should contain copyright symbol', () => {
=======
  });
  it('footer should contain copyright symbol', () => {
    cy.get('footer span').should('contain', copyrightSymbol);
  });
  it('copyright symbol appears before copyright text', () => {
>>>>>>> Test order of copyright text
    cy.get('footer p')
      .last()
      .should('contain', `${copyrightSymbol} ${copyrightText}`);
  });
  it('should contain a link in the copyright text', () => {
    cy.get('footer p')
      .children('a')
      .should('have.attr', 'href')
      .and('contain', '/help/web/links');
  });
});
