// Should be moved into integration/pages/index.js once all pages have ATI
Cypress.Commands.add('hasNoscriptImgAtiUrl', (atiUrl) => {
  cy.get('noscript')
    .eq(0)
    .should(
      'contain',
      `<img height="1px" width="1px" alt="" style="position:absolute" src="${atiUrl}`,
    );
});

// Should be moved into integration/pages/index.js once all pages have ATI
Cypress.Commands.add('hasAmpAnalyticsAtiUrl', (atiUrl) => {
  cy.get('amp-analytics script[type="application/json"]').should(
    'contain',
    `${atiUrl}`,
  );
});

// Should be moved into integration/pages/index.js once all pages have Chartbeat
Cypress.Commands.add('hasScriptWithChartbeatSrc', () => {
  cy.get(`script[src="//static.chartbeat.com/js/chartbeat.js"]`).should(
    'exist',
  );
});

// Should be moved into integration/pages/index.js once all pages have Chartbeat
Cypress.Commands.add('hasGlobalChartbeatConfig', () => {
  cy.window().should('have.property', '_sf_async_config');
});

// Should be moved into integration/pages/index.js once all pages have Chartbeat
Cypress.Commands.add('hasAmpChartbeatConfigUid', () => {
  cy.get('amp-analytics script[type="application/json"]').should(
    'contain',
    '50924',
  );
});
