import { pathOr } from 'ramda';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) => {
  describe(`testsThatFollowSmokeTestConfig to run for ${service} ${pageType}`, () => {
    it('should render a description for the page', () => {
      cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
        const descriptionBlock = body.content.blocks.find(
          block => block.role === 'introduction',
        );
        // Condition added because introduction is non-mandatory
        if (descriptionBlock) {
          const descriptionHtml = pathOr({}, ['text'], descriptionBlock);
          // strip html from the description, so we get description as plain text
          const elem = document.createElement('div');
          elem.innerHTML = descriptionHtml;
          const description = elem.innerText;
          cy.get('main p').should('contain', description);
        }
      });
    });

    it('should render paragraph text for the page', () => {
      cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
        const paragraphBlock = body.content.blocks.find(
          block => block.type === 'paragraph',
        );
        // Conditional because in test assets the data model structure is sometimes variable and unusual
        // so cannot be accessed in the same way across assets
        if (paragraphBlock) {
          const descriptionHtml = pathOr({}, ['text'], paragraphBlock);
          // strip html from the description, so we get description as plain text
          const elem = document.createElement('div');
          elem.innerHTML = descriptionHtml;
          const paragraph = elem.innerText;
          cy.get('main p').should('contain', paragraph);
        }
      });
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
