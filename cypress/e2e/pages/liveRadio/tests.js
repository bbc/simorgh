/* eslint-disable import/prefer-default-export */
import getDataUrl from '../../../support/helpers/getDataUrl';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) =>
  describe(`Tests for ${service} ${pageType}`, () => {
    describe('Live Radio body', () => {
      it('should render a H1, which contains/displays a styled headline', () => {
        cy.request(getDataUrl(Cypress.env('currentPath'))).then(({ body }) => {
          const [{ text: headline }] = body.content.blocks;
          cy.get('h1').should('contain', headline);
        });
      });

      it('should render a paragraph, which contains/displays a styled summary', () => {
        cy.request(getDataUrl(Cypress.env('currentPath'))).then(({ body }) => {
          const { text } = body.content.blocks[1];
          cy.get('[role="main"] p').should('contain', text);
        });
      });
    });

    describe('LinkedData', () => {
      // will be addressed by this https://github.com/bbc/simorgh/issues/3117
      it.skip('should include mainEntityOfPage in the LinkedData', () => {
        cy.get('script[type="application/ld+json"]')
          .should('contain', 'mainEntityOfPage')
          .and('contain', 'headline');
      });
    });
  });
