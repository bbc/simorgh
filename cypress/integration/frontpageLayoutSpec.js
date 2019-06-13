/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
// eslint-disable-next-line import/no-extraneous-dependencies
import deepExtend from 'deep-extend';
import services from '../test-data/worldServices';
import extendedServices from '../test-data/worldServicesFpData';

import { el } from '../support';

deepExtend(services, extendedServices);
Object.keys(services).forEach(function(index) {
  const xservice = services[index];
  const service = index;

  describe(`frontpage tests for ${service}`, function() {
    before(function() {
      cy.visit(xservice.url);
    });

    context('checks te components are present at 1008px', function() {
      before(() => {
        cy.viewport(1008, 768);
      });

      describe('cookie banner', function() {
        it('should have a visible cookie banner', function() {
          cy.get(el.cookieBanner).should('be.visible');
        });

        it('should have a functional cookie banner', function() {
          cy.get(el.cookieBanner).within(() => {
            cy.get('a')
              .should('have.length.of', 1)
              .should(
                'have.attr',
                'href',
                'https://www.bbc.co.uk/usingthebbc/your-data-matters',
              );
            cy.get('button')
              .should('have.attr', 'type', 'button')
              .click();
          });

          cy.get(el.cookieBanner).within(() => {
            cy.get('a')
              .should('have.length.of', 2)
              .should(
                'have.attr',
                'href',
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
              )
              .last()
              .should(
                'have.attr',
                'href',
                'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
              );

            cy.get('button')
              .should('have.attr', 'type', 'button')
              .click();
          });
        });
      });

      describe('header tests', function() {
        it('should have a visible banner', function() {
          cy.get(el.header)
            .should('have.lengthOf', 1)
            .should('have.attr', 'role', 'banner')
            .is()
            .inside('body', { left: '0px', right: '0px', top: '0px' })
            .find('a')
            .should('have.attr', 'href', 'https://www.bbc.co.uk/news') // this should one day soon become 'https://www.bbc.com/igbo' etc.
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

      describe('section tests', function() {
        it('should be labelled by a visible section label', function() {
          cy.get(el.section)
            .should('have.length.of.at.least', 1)
            .should('be.visible')
            .should('have.attr', 'role', 'region')
            .each($section => {
              cy.wrap($section).within(() => {
                // asserting that the heading id === the section aria-labelledby
                cy.get('h2')
                  .should('have.lengthOf', 1)
                  .should('have.id', $section.attr('aria-labelledby'));
              });
            });
        });

        it('should contain at least one story promo', function() {
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

        // This is a temporary test to demonstrate object merging
        it('uses Top Stories as its first section', function() {
          console.log(xservice);
          console.log(xservice.data.article);
          cy.get(xservice.data.h2Selector).should(
            'have.text',
            xservice.data.h2,
          );
        });
      });

      describe('footer tests', function() {
        it('should have a visible footer', function() {
          cy.get('footer')
            .should('have.length', 1)
            .should('have.attr', 'role', 'contentinfo')
            .is()
            .inside('body', { bottom: '0px', left: '0px', right: '0px' })
            .find('a')
            .should('have.attr', 'href', 'https://www.bbc.co.uk/news') // this should one day soon become 'https://www.bbc.com/igbo' etc.
            .find('svg')
            .should('be.visible');
        });
      });
    });

    context('verifies the layout at less than 600px', function() {
      before(() => {
        cy.viewport(599, 1024);
      });

      it('does not display the summary', function() {
        cy.get(el.section).within(() => {
          cy.get('p')
            .should('have.length.of.at.least', 1)
            .should('not.be.visible');
        });
      });
    });
  });
});
