import appConfig from '../../../../src/server/utilities/serviceConfigs';

export default ({ service, variant }) => {
  const {
    mostRead: { numberOfItems },
  } = appConfig[service][variant];

  it(`should render ${numberOfItems} items`, () => {
    cy.get('[data-e2e="most-read"] li').should('have.length', numberOfItems);
  });
};
