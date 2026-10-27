/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */

export const fontsAreCached = ({ expectedFonts }) => {
  const testPrefix = expectedFonts.length > 0 ? expectedFonts : 'No ';

  it(`${testPrefix} fonts are cached`, () => {
    cy.window({ timeout: 10000 }).should(win => {
      const { localStorage } = win;
      const cachedFonts = Object.keys(localStorage)
        .filter(key => key.startsWith('font-'))
        .map(key => key.split('-')[1])
        .filter(Boolean)
        .sort();

      expect(cachedFonts).not.to.be.null;
      expect(`${cachedFonts.join(' | ')}`).not.to.be.null;
      expect(cachedFonts).to.include.members(expectedFonts);
    });
  });
};
