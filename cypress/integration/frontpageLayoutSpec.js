/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
// eslint-disable-next-line import/no-extraneous-dependencies
import deepExtend from 'deep-extend';
import services from '../test-data/worldServices';
import extendedServices from '../test-data/worldServicesFpData';

deepExtend(services, extendedServices);
// eslint-disable-next-line array-callback-return
Object.keys(services).map(function(index) {
  const xservice = services[index];
  const service = index;

  describe(`frontpage tests for ${service}`, function() {
    before(function() {
      cy.visit(xservice.url);
    });

    context('should render the page at 1008', function() {
      before(() => {
        cy.viewport(1008, 768);
      });

      xservice.data.forEach(section => {
        describe(`${section.h2} tests`, function() {
          it(`should have ${section.stories.length} stories`, function() {
            console.log(section.stories.length);
            console.log(section.h2);
            console.log(section.sectionSelector);
            cy.get(section.sectionSelector)
              .find('h3')
              .should('have.lengthOf', section.stories.length);
          });

          it('should show the correct section heading', function() {
            console.log(section.h2Selector);
            console.log(section.h2);
            cy.get(section.h2Selector).should('have.text', section.h2);
          });

          function promoElement($el, selector) {
            return cy.wrap($el).find(selector);
          }

          it('should have the correct headings', function() {
            cy.get(section.sectionSelector).within(() => {
              cy.get('.StoryPromoWrapper-sc-1dvfmi3-0').each(($el, idx) => {
                promoElement($el, 'h3').should(
                  'have.text',
                  section.stories[idx].headline,
                );
              });
            });
          });

          it('should have the correct summaries', function() {
            cy.get(section.sectionSelector).within(() => {
              cy.get('.StoryPromoWrapper-sc-1dvfmi3-0').each(($el, idx) => {
                promoElement($el, 'p').should(
                  'have.text',
                  section.stories[idx].summary,
                );
              });
            });
          });

          it('should have the correct article timestamps', function() {
            cy.get(section.sectionSelector).within(() => {
              cy.get('.StoryPromoWrapper-sc-1dvfmi3-0').each(($el, idx) => {
                promoElement($el, 'time').should(
                  'have.text',
                  section.stories[idx].timestamp,
                );
              });
            });
          });
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
