import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import getDataUrl from '../../../support/helpers/getDataUrl';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import getServiceWithVariantName from '../../../support/helpers/getServiceWithVariantName';
// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({
  service,
  pageType,
  variant,
}) => {
  describe(`testsThatFollowSmokeTestConfig to run for ${service} ${pageType}`, () => {
    describe(`STY Body`, () => {
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
    describe(`STY Secondary Column`, () => {
      it('should have at least one story promo in Features', () => {
        cy.log(service);
        if (service !== 'newsround' && service !== 'news') {
          const secondaryColumnUrl =
            variant === 'default'
              ? `/${appConfig[service].default.service}/sty-secondary-column.json`
              : `/${getServiceWithVariantName(
                  service,
                )}/sty-secondary-column/${variant}.json`;
          cy.request(secondaryColumnUrl).then(({ body }) => {
            if (body.features) {
              cy.get('[data-e2e=features-analysis-heading]').within(() => {
                cy.get('[data-e2e=story-promo]').first().should('be.visible');
              });
            }
          });
        } else {
          cy.log('No features section on newsround or news');
        }
      });
      it.skip('should render podcast promo if in json and should navigate to correct podcast page', () => {
        cy.log(service);
        if (Cypress.env('APP_ENV') !== 'local') {
          cy.getToggles(service);
          cy.url().then(url => {
            const urlForData = url.replace('.amp', '');

            const firstVisitedPage = url;

            cy.request(getDataUrl(urlForData)).then(() => {
              cy.fixture(`toggles/${service}.json`).then(toggles => {
                const podcastPromoIsEnabled = path(
                  ['podcastPromo', 'enabled'],
                  toggles,
                );
                cy.log(
                  `Story page is configured for podcast promo? ${podcastPromoIsEnabled}`,
                );
                if (podcastPromoIsEnabled) {
                  // Gets the podcast promo name
                  cy.get(
                    `section[aria-labelledby*='podcast-promo'] > div:nth-child(2) > div:nth-child(2) > h3 > a`,
                  ).then($tag => {
                    const podcastTitle = $tag.text();
                    cy.wrap(podcastTitle).as('podcastTitle');
                  });
                  // Clicks on the podcast promo link
                  cy.get(
                    `section[aria-labelledby*='podcast-promo'] > div:nth-child(2) > div:nth-child(2) > h3 > a`,
                  ).click();

                  // Waits for page load to allow Cypress to retrieve url
                  // eslint-disable-next-line cypress/no-unnecessary-waiting
                  cy.wait(1000);

                  cy.url().then(urlTwo => {
                    const isPodcastBrandPage = urlTwo.includes('/podcasts/');

                    // If link leads to a Podcast brand page, check the title is as expected
                    // If link leads to a Podcast aggregate page, check the first link leads to podcast page
                    if (isPodcastBrandPage) {
                      cy.get('@podcastTitle').then(title => {
                        cy.get('h1').should('contain', title);
                      });
                    } else {
                      // This could fail if editorial chooses a MAP page to be the first promo link instead of a podcast page
                      cy.get('[data-e2e=story-promo]')
                        .first()
                        .find('a')
                        .invoke('attr', 'href')
                        .should('contain', '/podcasts/');
                    }
                  });
                  cy.visit(firstVisitedPage);
                } else {
                  cy.log('Podcast promo is not enabled in toggles');
                }
              });
            });
          });
        } else {
          cy.log('Service is run in local.');
        }
      });
    });
    describe(`Visual comparison tests for ${service} ${pageType}`, () => {
      it('Story Page', () => {
        if (Cypress.env('APP_ENV') === 'local' && Cypress.browser.isHeadless) {
          cy.url().then(url => {
            if (!url.includes('.amp')) {
              cy.scrollTo('bottom', { duration: 6000 });
              cy.scrollTo('top', { duration: 6000 });
              cy.document().its('fonts.status').should('equal', 'loaded');

              cy.matchImageSnapshot({ capture: 'fullPage' });
            } else {
              cy.matchImageSnapshot();
            }
          });
        } else {
          cy.log('Snapshot skipped in headed mode');
        }
      });
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
