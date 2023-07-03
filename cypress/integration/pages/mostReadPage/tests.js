import { serviceNumerals } from '../../../../src/app/legacy/containers/MostRead/Canonical/Rank';
import appConfig from '../../../../src/server/utilities/serviceConfigs';

export default ({ service, variant }) => {
  const {
    mostRead: { numberOfItems },
  } = appConfig[service][variant];

  it(`should render ${numberOfItems} items`, () => {
    cy.get('[data-e2e="most-read"] li').should('have.length', numberOfItems);
  });

  it(`should show correct numerals`, () => {
    const expectedMostReadRank = serviceNumerals(service);
    cy.get('[data-e2e="most-read"]').scrollIntoView();
    cy.get('[data-e2e="most-read"]')
      .find('li span')
      .each(($el, index) => {
        expect($el.text()).equal(expectedMostReadRank[index + 1]);
      });
  });

  it(`should contain hrefs that are not empty`, () => {
    cy.get('[data-e2e="most-read"]').scrollIntoView();
    cy.get('[data-e2e="most-read"]').within(() => {
      cy.get('a').each($el => {
        cy.wrap($el)
          .should('not.be.empty') // ensures that the link has text
          .should('have.attr', 'href')
          .should('not.be.empty'); // ensures that the href is not empty
      });
    });
  });
};
