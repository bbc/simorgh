import services from '../support/testData/services';

describe('Routing tests', () => {
  it('accepts different service params', () => {
    cy.wrap(services).each(service => {
      cy.visit(service.name + service.path);
      cy.get('html').should('have.attr', 'lang', service.lang);
    });
  });
});
