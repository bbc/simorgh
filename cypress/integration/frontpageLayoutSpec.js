import services from '../support/serviceConfig';
import config from '../support/config';
import { el } from '../support/frontpageElements';
import describeForLocalOnly from '../support/describeForLocalOnly';

Object.keys(services).forEach(index => {
  const serviceConfig = services[index];
  const service = index;

  describeForLocalOnly(`frontpage tests for ${service}`, () => {
    // eslint-disable-next-line no-undef
    before(() => {
      cy.visit(serviceConfig.url);
    });

    describe('checks the components are present', () => {
      // eslint-disable-next-line no-undef
      before(() => {
        cy.viewport(1008, 768);
      });

      describe('header tests', () => {
        it('should have a visible banner', () => {
          cy.get(el.header)
            .should('have.lengthOf', 1)
            .find('a')
            .should('have.attr', 'href', 'https://www.bbc.co.uk/news') // expect `${config.baseUrl}${serviceConfig.url}` once header hooked up
            .find('svg')
            .should('be.visible');
        });

        // TODO uncomment me after simorgh#1869
        // it('should have an invisible top-level header', function() {
        //   cy.get('h1')
        //     .should('have.length', 1)
        //     .should('not.be.visible');
        // });
      });

      describe('section tests', () => {
        it('should be labelled by a visible section label', () => {
          cy.get(el.section)
            .should('have.length.of.at.least', 1)
            .should('be.visible')
            .should('have.attr', 'role', 'region')
            .each($section => {
              cy.wrap($section).within(() => {
                // asserting that the heading id === the section aria-labelledby
                cy.get('h2').should('have.lengthOf', 1);
              });
            });
        });

        it('should contain at least one story promo', () => {
          cy.get(el.section).within(() => {
            cy.get('img')
              .should('have.length.of.at.least', 1)
              .should('be.visible');
            cy.get('h3')
              .should('have.length.of.at.least', 1)
              .should('be.visible')
              .find('a')
              .should('have.attr', 'href');
            cy.get('p')
              .should('have.length.of.at.least', 1)
              .should('be.visible');
            cy.get('time')
              .should('have.length.of.at.least', 1)
              .should('be.visible');
          });
        });
      });

      describe('footer tests', () => {
        it('should have a visible footer', () => {
          cy.get('footer')
            .should('have.length', 1)
            .should('have.attr', 'role', 'contentinfo')
            .find('a')
            .should('have.attr', 'href', 'https://www.bbc.co.uk/news') // expect `${config.baseUrl}${serviceConfig.url}` once footer hooked up
            .find('svg')
            .should('be.visible');
        });
      });
    });
  });
});
