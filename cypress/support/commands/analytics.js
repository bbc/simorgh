// Should be moved into integration/pages/index.js once all pages have ATI
Cypress.Commands.add('hasNoscriptImgAtiUrl', atiUrl => {
  cy.get('noscript')
    .invoke('text')
    .then(text => {
      const noscriptString = text.toString();
      cy.log(noscriptString);
    });

  cy.get('noscript').should(
    'contain',
    `<img height="1px" width="1px" alt="" style="position:absolute" src="${atiUrl}`,
  );
});
