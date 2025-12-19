/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */

export const fontsAreCached = ({ expectedFonts }) => {
  const testPrefix = expectedFonts.length > 0 ? expectedFonts : 'No ';

  it(`${testPrefix} fonts are cached`, () => {
    cy.reload(true);

    cy.getAllLocalStorage().then(allLocalStorage => {
      expect(allLocalStorage).not.to.be.null;

      const localStorage = allLocalStorage[Cypress.config().baseUrl];

      const cachedFonts = Object.keys(localStorage)
        .filter(key => key.startsWith('font-'))
        .map(key => key.split('-')[1])
        .filter(Boolean)
        .sort();

      cy.log(`Cached fonts: | ${cachedFonts.join(' | ')} | `);

      expect(`${cachedFonts.join(' | ')}`).not.to.be.null;

      expect(cachedFonts).to.include.members(expectedFonts);
    });
  });
};
