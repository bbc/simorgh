import { Services } from '#app/models/types/global';

type Context = { skip: () => void };

export default ({
  service,
  toggleName,
  testContext,
}: {
  service: Services;
  toggleName: string;
  testContext: Context;
}) => {
  if (service === 'scotland') return;

  cy.log(`DEBUG cy.fetchToggles: type = ${typeof cy.fetchToggles}`);
  cy.log(`DEBUG cy.fetchToggles: ${cy.fetchToggles}`);

  if (typeof cy.fetchToggles === 'function') {
    cy.fetchToggles(service);

    cy.fixture(`toggles/${service}.json`).then(toggles => {
      const { enabled } = toggles[toggleName] || { enabled: false };
      if (!enabled) {
        testContext.skip();
      }
    });
  } else {
    testContext.skip();
  }
};
