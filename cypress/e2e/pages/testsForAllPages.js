/* eslint-disable import/prefer-default-export */
/* eslint-disable cypress/no-unnecessary-waiting */
// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
import topicTagsTest from '../../support/helpers/topicTagsTest';
import checkA11y from '../../support/helpers/checkA11y';

export const testsThatAlwaysRunForAllPages = ({
  service,
  variant,
  pageType,
}) => {
  describe(`testsToAlwaysRunForAllPages to run for ${service} ${pageType}`, () => {
    it('should have no detectable a11y violations on page load', () => {
      checkA11y();
    });

    it('should render topic tags if they are in the json, and they should navigate to correct topic page', () => {
      if (
        service !== 'sport' &&
        service !== 'newsround' &&
        service !== 'news' &&
        Cypress.env('APP_ENV') !== 'local'
      ) {
        topicTagsTest(service, variant, pageType);
      } else {
        cy.log('Topic tags currently disabled on Sport and Newsround');
      }
    });
  });
};
