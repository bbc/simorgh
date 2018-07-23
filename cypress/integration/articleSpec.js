import {
  getElement,
  getSecondElement,
  shouldContainText,
  shouldContainStyles,
} from '../support/testHelper';

describe('News Article', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit('/article/article-id');
  });

  it('should render the BBC News branding', () => {
    const headerElement = getElement('header');
    shouldContainStyles(headerElement, 'height', '40px');
    shouldContainStyles(headerElement, 'background-color', 'rgb(187, 25, 25)');

    const anchorElement = getElement('header a');
    shouldContainText(anchorElement, 'BBC News');
    shouldContainStyles(anchorElement, 'color', 'rgb(255, 255, 255)');
    shouldContainStyles(
      anchorElement,
      'font-family',
      'ReithSansNewsRegular, Arial, Helvetica, freesans, sans-serif',
    );
  });

  it('should render a headline', () => {
    const h1 = getElement('h1');
    shouldContainText(h1, 'Article Headline');
  });

  it('should render a title', () => {
    cy.title().should('eq', 'Article Headline');
  });

  it('should have a nofollow meta tag', () => {
    const metaElement = getElement('head meta[name="robots"]');
    metaElement.should('have.attr', 'content', 'nofollow');
  });

  it('should have resource hints', () => {
    const resources = [
      'https://ichef.bbci.co.uk',
      'https://static.bbci.co.uk',
      'https://gel.files.bbci.co.uk',
    ];

    resources.forEach(resource => {
      const selector = `head link[href="${resource}"]`;
      const firstElement = getElement(selector);
      firstElement.should('have.attr', 'rel', 'preconnect');
      const secondElement = getSecondElement(selector);
      secondElement.should('have.attr', 'rel', 'dns-prefetch');
    });
  });

  it('should include the font faces', () => {
    const expectedFonts = [
      'https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Lt.woff',
      'https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Lt.woff2',
      'https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Rg.woff',
      'https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Rg.woff2',
      'https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Md.woff',
      'https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Md.woff2',
      'https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Bd.woff',
      'https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Bd.woff2',
      'https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Lt.woff',
      'https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Lt.woff2',
      'https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Rg.woff',
      'https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Rg.woff2',
      'https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Md.woff',
      'https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Md.woff2',
      'https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Bd.woff',
      'https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Bd.woff2',
    ];
    const styleTag = getElement('head style');

    expectedFonts.forEach(font => {
      styleTag.should('contain', font);
    });
  });

  // Testing the actual fetch is not currently possible
  it('should have script to fetch bundle', () => {
    cy.get('script')
      .last()
      .should('have.attr', 'src')
      .and('match', /(\/static\/js\/bundle\.\w+\.js)/g);
  });

  it('should check the font file loads', () => {
    const fontFamiliesArray = [];
    cy.get('*')
      .each(element => {
        const fontFamily = Cypress.$(element).css('font-family');
        if (
          fontFamily &&
          !fontFamiliesArray.includes(fontFamily) &&
          fontFamily !== 'Times'
        ) {
          fontFamiliesArray.push(fontFamily);
        }
      })
      .then(() => {
        expect(fontFamiliesArray.length).to.be.lessThan(3);
      });
  });
});
