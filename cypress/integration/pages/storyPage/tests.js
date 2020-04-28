import { pathOr } from 'ramda';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = () => {};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) => {
  describe(`testsThatFollowSmokeTestConfig to run for ${service} ${pageType}`, () => {
    it('should render a description for the page', () => {
      cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
        const descriptionBlock = body.content.blocks.find(
          block => block.role === 'introduction',
        );
        const descriptionHtml = pathOr({}, ['text'], descriptionBlock);

        // strip html from the description, so we get description as plain text
        const elem = document.createElement('div');
        elem.innerHTML = descriptionHtml;
        const description = elem.innerText;
        cy.get('main p').should('contain', description);
      });
    });

    it('should render a byline for the page', () => {
      cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
        const { name, title, persons } = body.promo.byline;
        const [person] = persons;

        if (name) {
          cy.get('main ul li').should('contain', name);
        } else {
          cy.get('main ul li').should('contain', person.name);
        }

        if (title) {
          cy.get('main ul li').should('contain', title);
        } else {
          cy.get('main ul li').should('contain', person.function);
        }
      });
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = () => {};
