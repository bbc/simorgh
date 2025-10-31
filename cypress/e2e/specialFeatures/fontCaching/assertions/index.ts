/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */

const interceptFontDownload = () => {
  cy.intercept(
    {
      url: /https:\/\/static\.files\.bbci\.co\.uk(?:\/fonts\/|\/ws\/simorgh-assets\/public\/fonts\/)/,
    },
    request => {
      request.reply({ statusCode: 200 });
    },
  ).as('font-download');
};

export const fontsAreCached = ({ expectedFonts, path }) => {
  const testPrefix = expectedFonts.length > 0 ? expectedFonts : 'No ';

  it(`${testPrefix} fonts are cached`, () => {
    interceptFontDownload();
    cy.visit(path);
    cy.reload(true);

    expectedFonts.forEach(() => {
      cy.wait('@font-download')
        .its('response')
        .should('have.property', 'statusCode', 200);
    });

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
