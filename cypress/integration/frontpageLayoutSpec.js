import services from '../support/worldServices';
import { el } from '../support';
import describeForLocalOnly from '../support/describeForLocalOnly';

Object.keys(services).forEach(index => {
  const xservice = services[index];
  const service = index;

  // TODO this needs to become a normal describe block once Mozart routing is set up
  describeForLocalOnly(`frontpage tests for ${service}`, () => {
    // eslint-disable-next-line no-undef
    before(() => {
      cy.visit(xservice.url);
    });

    describe('checks the components are present', () => {
      // eslint-disable-next-line no-undef
      before(() => {
        cy.viewport(1008, 768);
      });

      describe('cookie banner', () => {
        it('should have a visible cookie banner', () => {
          cy.get(el.cookieBanner).should('be.visible');
        });

        it('should have a functional cookie banner', () => {
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

      describe('header tests', () => {
        it('should have a visible banner', () => {
          cy.get(el.header)
            .should('have.lengthOf', 1)
            .should('have.attr', 'role', 'banner')
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

      describe('section tests', () => {
        it('should be labelled by a visible section label', () => {
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
            .should('have.attr', 'href', 'https://www.bbc.co.uk/news') // this should one day soon become 'https://www.bbc.com/igbo' etc.
            .find('svg')
            .should('be.visible');
        });
      });
    });

    describe('verifies the layout at less than 600px', () => {
      // eslint-disable-next-line no-undef
      before(() => {
        cy.viewport(599, 1024);
      });

      it('does not display the summary', () => {
        cy.get(el.section).within(() => {
          cy.get('p')
            .should('have.length.of.at.least', 1)
            .should('not.be.visible');
        });
      });
    });
  });
});
