// Should be moved into integration/pages/index.js once all pages have ATI
Cypress.Commands.add('hasNoscriptImgAtiUrl', atiUrl => {
  cy.get('noscript[id="analytics-noscript"]')
    .invoke('text')
    .then(text => {
      const noscriptString = text.toString();
      cy.log(noscriptString);

      if (noscriptString) {
        cy.get('noscript[id="analytics-noscript"]').should(
          'contain',
          `<img height="1px" width="1px" alt="" style="position:absolute" src="${atiUrl}`,
        );
      }
    });
});
