import { getElement, getSecondElement } from '../support/testHelper';

describe('Article Meta Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'scenario-25' & 'scenario-27' are available within the PROD enviroment
    cy.visit('/article/scenario-25');
  });

  it('should have a nofollow meta tag', () => {
    const metaElement = getElement('head meta[name="robots"]');
    metaElement.should('have.attr', 'content', 'nofollow');
  });

  it('should load a maximum of three font files', () => {
    const fontFamiliesArray = [];
    cy.get('*')
      .each(element => {
        const fontFamily = Cypress.$(element).css('font-family');
        if (
          fontFamily &&
          !fontFamiliesArray.includes(fontFamily) &&
          // !== 'Times' has been added as there elements not visible, which Cypress is assigning a font of 'Times'
          fontFamily !== 'Times'
        ) {
          fontFamiliesArray.push(fontFamily);
        }
      })
      .then(() => {
        expect(fontFamiliesArray.length).to.be.lessThan(3);
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
});
