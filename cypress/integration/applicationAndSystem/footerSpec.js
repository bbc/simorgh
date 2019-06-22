import config from '../../support/config';

const checkFooterLinks = (position, url) => {
  cy.get('a')
    .eq(position)
    .should('have.attr', 'href')
    .and('contain', url);
};

describe('Footer Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`${config.assets.newsThreeSubheadlines}`);
  });
  it('should render the BBC News branding', () => {
    cy.get('footer a')
      .eq(0)
      .should('contain', 'BBC News');
  });

  it('should have working links', () => {
    cy.get('footer ul').within(() => {
      checkFooterLinks('0', '/news/help-41670342');
      checkFooterLinks('1', '/terms');
      checkFooterLinks('2', '/aboutthebbc/');
      checkFooterLinks('3', '/privacy/');
      checkFooterLinks('4', '/usingthebbc/cookies/');
      checkFooterLinks('5', '/accessibility/');
      checkFooterLinks('6', '/contact/');
    });
  });

  it('should contain copyright text', () => {
    const footerCopyrightArea = cy.get('footer p');
    footerCopyrightArea.should(
      'contain',
      `© ${new Date().getFullYear()} BBC. The BBC is not responsible for the content of external sites. `,
    );
  });
  it('should contain a link in the copyright text', () => {
    const footerCopyrightArea = cy.get('footer p');
    footerCopyrightArea
      .children('a')
      .should('have.attr', 'href')
      .and('contain', '/help/web/links');
  });
});
