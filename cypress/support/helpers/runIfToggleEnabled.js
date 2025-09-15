export default ({ service, toggleName, testContext }) => {
  if (service === 'scotland') return;

  cy.log(`DEBUG cy.getToggles: type = ${typeof cy.getToggles}`);
  cy.log(`DEBUG cy.getToggles: ${cy.getToggles}`);

  if (typeof cy.getToggles === 'function') {
    cy.getToggles(service);

    cy.fixture(`toggles/${service}.json`).then(toggles => {
      const { enabled } = toggles[toggleName];
      if (!enabled) {
        testContext.skip();
      }
    });
  } else {
    testContext.skip();
  }
};
