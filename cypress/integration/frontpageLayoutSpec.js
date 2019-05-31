/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import services from '../support/worldServices';

// eslint-disable-next-line array-callback-return
Object.keys(services).map(function(index) {
  const serviceObject = services[index];
  const service = index;

  describe(`frontpage tests for ${service}`, function() {
    before(function() {
      cy.visit(serviceObject.url);
    });

    context('should render the page at 1008', function() {
      before(() => {
        cy.viewport(1008, 768);
      });

      it('verifies the layout at 1008', function() {
        cy.document().then(function(doc) {
          cy.log(doc.documentElement.getBoundingClientRect().width);
        });
      });
    });

    context('should render the page at 600', function() {
      before(() => {
        cy.viewport(600, 1024);
      });

      it('verifies the layout at 600', function() {
        cy.document().then(function(doc) {
          cy.log(doc.documentElement.getBoundingClientRect().width);
        });
      });
    });

    context('should render the page at 360', () => {
      before(() => {
        cy.viewport(360, 667);
      });

      it('verifies the layout at 360', function() {
        cy.document().then(function(doc) {
          cy.log(doc.documentElement.getBoundingClientRect().width);
        });
      });
    });

    context('should render the page at 240', () => {
      before(() => {
        cy.viewport(240, 480);
      });

      it('verifies the layout at 1008', function() {
        cy.document().then(function(doc) {
          cy.log(doc.documentElement.getBoundingClientRect().width);
        });
      });
    });
  });
});
