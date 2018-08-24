import {
  checkLinkStyling,
  checkFooterLinks,
  getElement,
  shouldContainText,
  shouldContainStyles,
} from '../support/testHelper';

describe('Footer Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'c0000000025o' & 'c0000000027o' are available within the PROD enviroment
    cy.visit('/news/articles/c0000000025o');
  });
  it('should render the BBC News branding', () => {
    const headerBranding = getElement('footer div').eq(0);
    shouldContainStyles(headerBranding, 'height', '80px');
    shouldContainStyles(headerBranding, 'background-color', 'rgb(184, 0, 0)');
  });
  it('should have a focused state', () => {
    const anchorElement = getElement('footer a').eq(0);
    shouldContainText(anchorElement, 'BBC News');

    anchorElement.focus();
    shouldContainStyles(
      getElement('footer a span'),
      'border-bottom',
      '4px solid rgb(255, 255, 255)',
    );
  });

  it('should have a hover state', () => {
    const anchorElement = getElement('footer a');
    anchorElement.invoke('mouseover');

    shouldContainStyles(
      getElement('footer a span'),
      'border-bottom',
      '4px solid rgb(255, 255, 255)',
    );
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
  xit('should have styling', () => {
    getElement('footer ul').within(() => {
      checkLinkStyling(0);
      checkLinkStyling(1);
      checkLinkStyling(2);
      checkLinkStyling(3);
      checkLinkStyling(4);
      checkLinkStyling(5);
      checkLinkStyling(6);
    });
  });
  it('should contain copyright text', () => {
    const footerCopyrightArea = getElement('footer p');
    footerCopyrightArea.should(
      'contain',
      'Copyright © 2018 BBC. The BBC is not responsible for the content of external sites. ',
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
