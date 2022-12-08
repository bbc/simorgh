import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import getDataUrl from '../../../support/helpers/getDataUrl';
import topicTagsTest from '../../../support/helpers/topicTagsTest';
import envConfig from '../../../support/config/envs';
// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({
  service,
  pageType,
  isAmp,
}) => {
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
    it('FOR /news/technology-60561162.amp ONLY - should render topic tags if they are in the json, and they should navigate to correct topic page', () => {
      if (service === 'news' && Cypress.env('APP_ENV') !== 'local') {
        const url = '/news/technology-60561162.amp?renderer_env=live';
        cy.visit(`${envConfig.baseUrl}${url}`);
        topicTagsTest();
      } else {
        cy.log('Test is only for /news/technology-60561162.amp');
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
  describe(`Recommendations on ${service} ${pageType}`, () => {
    it('Recommendations have images', () => {
      if (Cypress.env('APP_ENV') === 'live') {
        cy.getToggles(service);
        cy.fixture(`toggles/${service}.json`).then(toggles => {
          const recommendationsEnabled = path(
            ['cpsRecommendations', 'enabled'],
            toggles,
          );
          cy.log(`Recommendations enabled? ${recommendationsEnabled}`);
          if (recommendationsEnabled) {
            cy.get(`[data-e2e=recommendations-heading]`).scrollIntoView();
            cy.get('[data-e2e=recommendations-heading] > div > ul > li').each(
              (item, index) => {
                cy.wrap(item).within(() => {
                  cy.log(`List item number: ${index}`);
                  cy.log(`isAmp= ${isAmp}`);
                  if (isAmp) {
                    cy.get(
                      `[data-e2e=story-promo-wrapper] > div > [data-e2e=image-placeholder] > amp-img`,
                    ).should('have.attr', 'width');
                  } else {
                    cy.get(
                      `[data-e2e=story-promo-wrapper] > div > [data-e2e=image-placeholder] > div > img`,
                    ).should('have.attr', 'width');
                  }
                });
              },
            );
          }
        });
      } else {
        cy.log('Only tests live due to not much test data');
      }
    });
    it('Recommendations have titles', () => {
      if (Cypress.env('APP_ENV') === 'live') {
        cy.getToggles(service);
        cy.fixture(`toggles/${service}.json`).then(toggles => {
          const recommendationsEnabled = path(
            ['cpsRecommendations', 'enabled'],
            toggles,
          );
          cy.log(`Recommendations enabled? ${recommendationsEnabled}`);
          if (recommendationsEnabled) {
            cy.get(`[data-e2e=recommendations-heading]`).scrollIntoView();
            cy.get('[data-e2e=recommendations-heading] > div > ul > li').each(
              (item, index) => {
                cy.wrap(item).within(() => {
                  cy.log(`List item number: ${index + 1}`);
                  cy.get(`[data-e2e=story-promo-wrapper] > div > div > a`)
                    .invoke('text')
                    .then(text => {
                      expect(text.length).to.be.at.least(1);
                    });
                });
              },
            );
          }
        });
      } else {
        cy.log('Only tests live due to not much test data');
      }
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
