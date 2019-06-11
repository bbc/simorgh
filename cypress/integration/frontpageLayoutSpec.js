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

    context('should render the page at 1008', function() {
      before(() => {
        cy.viewport(1008, 768);
      });

      describe('cookie banner', function() {
        it('should have a visible cookie banner', function() {
          cy.get(el.cookieBanner)
            .is()
            .inside('body', { left: '0px', right: '0px', top: '0px' });
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
                cy.get('h2[class^="Title"]')
                  .should('have.lengthOf', 1)
                  .should('have.id', $section.attr('aria-labelledby'));
              });
            });
        });

        it('should contain at least one story promo', function() {
          cy.get(el.section).within(() => {
            cy.get('h3')
              .should('have.length.of.at.least', 1)
              .should('be.visible');
          });
        });
      });

      describe('footer tests', function() {
        it('should have a visible footer', function() {
          cy.get('footer')
            .should('have.length', 1)
            .should('have.attr', 'role', 'contentinfo')
            .find('a')
            .should('have.attr', 'href', 'https://www.bbc.co.uk/news') // this should one day soon become 'https://www.bbc.com/igbo' etc.
            .find('svg')
            .should('be.visible');
        });
      });

      xservice.data.forEach(section => {
        describe(`${section.h2} tests`, function() {
          it(`should have ${section.stories.length} stories`, function() {
            cy.get(section.sectionSelector)
              .find('h3')
              .should('have.lengthOf', section.stories.length);
          });

          it('should show the correct section heading', function() {
            cy.get(section.h2Selector).should('have.text', section.h2);
          });

          function promoElement($el, selector) {
            return cy.wrap($el).find(selector);
          }

          it('should have the correct headings', function() {
            cy.get(section.sectionSelector).within(() => {
              cy.get('*[class^="StoryPromoWrapper"]').each(($el, idx) => {
                promoElement($el, 'h3').should(
                  'have.text',
                  section.stories[idx].headline,
                );
              });
            });
          });

          it('should have the correct summaries', function() {
            cy.get(section.sectionSelector).within(() => {
              cy.get('*[class^="StoryPromoWrapper"]').each(($el, idx) => {
                promoElement($el, 'p')
                  .should('be.visible')
                  .should('have.text', section.stories[idx].summary);
              });
            });
          });

          it('should have the correct article timestamps', function() {
            cy.get(section.sectionSelector).within(() => {
              cy.get('*[class^="StoryPromoWrapper"]').each(($el, idx) => {
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
