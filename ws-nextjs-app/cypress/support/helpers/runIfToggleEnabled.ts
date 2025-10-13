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
