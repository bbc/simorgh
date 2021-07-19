/* eslint-disable cypress/no-unnecessary-waiting */
// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
import getDataUrl from '../../support/helpers/getDataUrl';

export const testsThatAlwaysRunForAllPages = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForAllPages to run for ${service} ${pageType}`, () => {
    it('should render topic tags if they are in the json, and they should lead to topic page', () => {
      cy.request(getDataUrl(Cypress.env('currentPath'))).then(({ body }) => {
        const topicTagsPresent = body.metadata.topics;
        let topicTagsLength = 0;
        if (topicTagsPresent) {
          topicTagsLength = topicTagsPresent.length;
        }
        cy.log(topicTagsPresent);
        cy.log(topicTagsLength);
        if (topicTagsPresent && topicTagsLength > 1) {
          cy.get(`aside[aria-labelledby*='related-topics'] > ul > li > a`)
            .first()
            .click();
          cy.go('back');
          cy.wait(1000);
        } else if (topicTagsPresent && topicTagsLength === 1) {
          cy.get(`aside[aria-labelledby*='related-topics']`).find('a').click();
          cy.go('back');
          cy.wait(1000);
        } else {
          cy.log('No topic tags in json');
        }
      });
    });
  });
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigforAllPages = ({
  service,
  pageType,
}) => {
  describe(`Running testsForAllPages for ${service} ${pageType}`, () => {});
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAllPageTypes = ({
  service,
  pageType,
}) => {
  describe(`Running testsToNeverSmokeTestForAllPageTypes for ${service} ${pageType}`, () => {});
};
