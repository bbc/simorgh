import {
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
      cy.focused(),
      'border-bottom',
      '4px solid rgb(255, 255, 255)',
    );
  });

  it('should have a hover state', () => {
    const anchorElement = getElement('footer a').eq(0);
    anchorElement.invoke('mouseover');

    shouldContainStyles(
      anchorElement,
      'border-bottom',
      '4px solid rgb(255, 255, 255)',
    );
  });
  it('should have working links', () => {
    getElement('footer ul').within(() => {
      cy.get('a')
        .eq(0)
        .should('have.attr', 'href')
        .and('contain', '/news/help-41670342');
      cy.get('a')
        .eq(1)
        .should('have.attr', 'href')
        .and('contain', '/terms');
      cy.get('a')
        .eq(2)
        .should('have.attr', 'href')
        .and('contain', '/aboutthebbc/');
      cy.get('a')
        .eq(3)
        .should('have.attr', 'href')
        .and('contain', '/privacy/');
      cy.get('a')
        .eq(4)
        .should('have.attr', 'href')
        .and('contain', '/usingthebbc/cookies/');
      cy.get('a')
        .eq(5)
        .should('have.attr', 'href')
        .and('contain', '/accessibility/');
      cy.get('a')
        .eq(6)
        .should('have.attr', 'href')
        .and('contain', '/contact/');
    });
  });
  it('should contain copyright text', () => {
    const footerGreyArea = getElement('footer div').eq(2);
    footerGreyArea
      .children('p')
      .should(
        'contain',
        'Copyright © 2018 BBC. The BBC is not responsible for the content of external sites. ',
      );
  });
  it('should contain a link in the copyright text', () => {
    const footerGreyArea = getElement('footer p');
    footerGreyArea
      .children('a')
      .should('have.attr', 'href')
      .and('contain', '/help/web/links');
  });
});
