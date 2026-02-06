import { Services } from '#app/models/types/global';

/**
 * Returns the value of a toggle for a given service and toggleName.
 * Resolves to undefined if the toggle is not found or not enabled.
 */

const getToggleValue = ({
  service,
  toggleName,
}: {
  service: Services;
  toggleName: string;
}): Cypress.Chainable<string | undefined> => {
  if (typeof cy.getToggles === 'function') {
    cy.getToggles(service);
    return cy.fixture(`toggles/${service}.json`).then(toggles => {
      const toggle = toggles[toggleName];
      if (toggle?.enabled) {
        return toggle.value;
      }
      return undefined;
    });
  }
  // Return a Cypress chainable that resolves to undefined
  return cy.wrap(undefined as string | undefined);
};

export default getToggleValue;
