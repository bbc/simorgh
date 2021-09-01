/* eslint-disable cypress/no-unnecessary-waiting */
// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
import getDataUrl from '../../support/helpers/getDataUrl';

export const testsThatAlwaysRunForAllPages = ({ service, pageType }) => {
  describe(`testsToAlwaysRunForAllPages to run for ${service} ${pageType}`, () => {
    const logA11yViolations = violations => {
      cy.task(
        'log',
        `${violations.length} accessibility violation${
          violations.length === 1 ? '' : 's'
        } ${violations.length === 1 ? 'was' : 'were'} detected`,
      );

      const violationData = violations.map(
        ({ id, impact, description, nodes }) => ({
          id,
          impact,
          description,
          nodes: nodes.length,
        }),
      );

      cy.task('table', violationData);
    };

    it('should have no detectable a11y violations on page load', () => {
      const excludeElements = [
        '[id*="include-"]', // VJ includes
      ];
      const context = '*'.concat(
        excludeElements.map(selector => `:not(${selector})`).join(''),
      );

      cy.injectAxe();
      cy.configureAxe({
        runOnly: {
          type: 'tag',
          values: ['wcag21a', 'wcag21aa', 'wcag2a', 'wcag2aa', 'best-practice'],
        },
        rules: [
          {
            // We need to disable this rule because of the inner & outer double iframe setup we have with media players.
            // When Toucan is implemented we won't have iframes so we can remove the disabling of the frame-title-unique rule.
            // Please remove this when Toucan is implemented so we can catch real frame-title-unique a11y errors.
            id: 'frame-title-unique',
            enabled: false,
          },
        ],
      });
      cy.checkA11y(context, null, logA11yViolations);
    });

    it('should render topic tags if they are in the json, and they should navigate to correct topic page', () => {
      if (
        service !== 'sport' &&
        service !== 'newsround' &&
        Cypress.env('APP_ENV') !== 'local'
      ) {
        cy.url().then(url => {
          const urlForData = url.includes('amp') ? url.slice(0, -4) : url;

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
              cy.visit(firstVisitedPage);
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
