Cypress.Commands.add('hasNoscriptImgAtiUrl', (atiUrl, analyticsBucketId) => {
  cy.get('noscript')
    .eq(0)
    .should(
      'contain',
      `<img height="1px" width="1px" alt="" style="position:absolute" src="${atiUrl}s=${analyticsBucketId}`,
    );
});

Cypress.Commands.add('hasAmpAnalyticsAtiUrl', (atiUrl, analyticsBucketId) => {
  cy.get('amp-analytics script[type="application/json"]')
    .eq(0)
    .should('contain', `${atiUrl}`)
    .should('contain', `s=${analyticsBucketId}`);
});
