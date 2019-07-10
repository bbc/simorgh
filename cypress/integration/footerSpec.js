import services from '../support/config/services';
import {
  checkFooterLinks,
  getElement,
  shouldContainText,
} from '../../cypressSharedHelpers/bodyTestHelper';

describe('Footer Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`/news/articles/${services.news.pageTypes.articles.asset}`);
  });
  it('should render the BBC News branding', () => {
    const newsBrandingLink = getElement('footer a').eq(0);
    shouldContainText(newsBrandingLink, 'BBC News');
  });

  it('should have working links', () => {
    getElement('footer ul').within(() => {
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
    const footerCopyrightArea = getElement('footer p');
    footerCopyrightArea.should(
      'contain',
      `© ${new Date().getFullYear()} BBC. The BBC is not responsible for the content of external sites. `,
    );
  });
  it('should contain a link in the copyright text', () => {
    const footerCopyrightArea = getElement('footer p');
    footerCopyrightArea
      .children('a')
      .should('have.attr', 'href')
      .and('contain', '/help/web/links');
  });
});
