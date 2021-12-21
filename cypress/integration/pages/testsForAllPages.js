/* eslint-disable cypress/no-unnecessary-waiting */
// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
import checkA11y from '../../support/helpers/checkA11y';
import getDataUrl from '../../support/helpers/getDataUrl';
import visitPage from '../../support/helpers/visitPage';

export const testsThatAlwaysRunForAllPages = ({ service, pageType }) => {
  describe(`testsToAlwaysRunForAllPages to run for ${service} ${pageType}`, () => {
    it('should have no detectable a11y violations on page load', () => {
      checkA11y();
    });

    it('should render topic tags if they are in the json, and they should navigate to correct topic page', () => {
      if (
        service !== 'sport' &&
        service !== 'newsround' &&
        Cypress.env('APP_ENV') !== 'local'
      ) {
        cy.url().then(url => {
          const urlForData = url.replace('.amp', '');

          const firstVisitedPage = url;

          cy.request(getDataUrl(urlForData)).then(({ body }) => {
            // Check if data has topic tags
            const topicTagsPresent = body.metadata.topics;
            let topicTagsLength = 0;

            // Get number of topic tags expected
            if (topicTagsPresent) {
              topicTagsLength = topicTagsPresent.length;
            }

            if (topicTagsPresent && topicTagsLength > 1) {
              // Gets the Topic Tag name
              cy.get(
                `aside[aria-labelledby*='related-topics'] > ul > li:first > a`,
              ).then($tag => {
                const topicTitle = $tag.text();
                cy.wrap(topicTitle).as('topicTitle');
              });
              // Clicks on the first topic tag
              cy.get(`aside[aria-labelledby*='related-topics'] > ul > li > a`)
                .first()
                .click();

              // Checks the page is of the Topic Tag clicked on by checking H1
              cy.get('@topicTitle').then(title => {
                cy.get('h1').should('contain', title);
              });

              // Needs to go back to the first page for the rest of the test suite
              // cy.go('back') does not work on AMP as it returns to a canonical page
              visitPage(firstVisitedPage, 'storyPage');
            } else if (topicTagsPresent && topicTagsLength === 1) {
              cy.get(`aside[aria-labelledby*='related-topics']`)
                .find('a')
                .then($tag => {
                  const topicTitle = $tag.text();
                  cy.wrap(topicTitle).as('topicTitle');
                });
              // If there is only one topic tag it is not in a list
              cy.get(`aside[aria-labelledby*='related-topics']`)
                .find('a')
                .click();
              // Checks the page is of the Topic Tag clicked on
              cy.get('@topicTitle').then(title => {
                cy.get('h1').should('contain', title);
              });

              cy.visit(firstVisitedPage);
            } else {
              cy.log('No topic tags in json');
            }
          });
        });
      } else {
        cy.log('Topic tags currently disabled on Sport and Newsround');
      }
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
