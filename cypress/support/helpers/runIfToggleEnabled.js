export default ({ service, toggleName, testContext }) => {
  if (service === 'scotland') return;
  cy.getToggles(service);

  cy.fixture(`toggles/${service}.json`).then(toggles => {
    const { enabled } = toggles[toggleName];
    if (!enabled) {
      testContext.skip();
    }
  });
};
