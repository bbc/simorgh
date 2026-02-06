import { Services } from '#app/models/types/global';

/**
 * Returns the value of a toggle for a given service and toggleName.
 * Resolves to undefined if the toggle is not found or not enabled.
 */

type Context = { skip: () => void };

const getToggleValue = ({
  service,
  toggleName,
  testContext,
}: {
  service: Services;
  toggleName: string;
  testContext: Context;
}) => {
  cy.log(`DEBUG cy.getToggles: type = ${typeof cy.getToggles}`);
  cy.log(`DEBUG cy.getToggles: ${cy.getToggles}`);

  let toggleValue: string | undefined;

  if (typeof cy.getToggles === 'function') {
    cy.getToggles(service);

    cy.fixture(`toggles/${service}.json`).then(toggles => {
      const toggle = toggles[toggleName];
      if (toggle?.enabled) {
        toggleValue = toggle.value;
      }
      toggleValue = undefined;
    });
  } else {
    testContext.skip();
  }
  return toggleValue;
};

export default getToggleValue;
