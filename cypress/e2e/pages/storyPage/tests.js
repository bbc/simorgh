/* eslint-disable import/prefer-default-export */
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import paths from 'ramda/src/paths';
import getDataUrl from '../../../support/helpers/getDataUrl';
import { crossPlatform as mostReadAssertions } from '../mostReadPage/mostReadAssertions';
import getAppEnv from '../../../support/helpers/getAppEnv';
import SERVICES_WITH_NEW_RECOMMENDATIONS from '../../../../src/app/components/Recommendations/config';

const twoYearsAgo = new Date().getFullYear() - 2;

const isArticleLessThanTwoYearsOld = () => {
  return cy
    .get(`main time`)
    .invoke('attr', 'datetime')
    .then(fullDate => {
      const isNewArticle = Number(fullDate.split('-')[0]) > Number(twoYearsAgo);
      return isNewArticle && getAppEnv() === 'live';
    });
};

const getContentBlocks = body => {
  const contentBlock = body.data.article.content;

  const [cpsAssetBlocks, cafBlocks] = paths(
    [['blocks'], ['model', 'blocks']],
    contentBlock,
  );
  return cpsAssetBlocks || cafBlocks;
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({
  service,
  pageType,
  isAmp,
  variant,
}) => {
  describe(`testsThatFollowSmokeTestConfig to run for ${service} ${variant} ${pageType} `, () => {
    it('should render a description for the page', () => {
      cy.getPageData({ service, pageType: 'article', variant }).then(
        ({ body }) => {
          const contentBlocks = getContentBlocks(body);
          const descriptionBlock = contentBlocks.find(
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
        },
      );
    });

    it('should render paragraph text for the page', () => {
      cy.getPageData({ service, pageType: 'article', variant }).then(
        ({ body }) => {
          const contentBlocks = getContentBlocks(body);
          const paragraphBlock = contentBlocks.find(
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
        },
      );
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

    /**
     * Most Read Component
     */
    mostReadAssertions({ service, variant });
  });

  // TODO: Remove once rolled out to all services
  if (SERVICES_WITH_NEW_RECOMMENDATIONS.includes(service)) {
    describe(`Recommendations on ${service} ${pageType}`, () => {
      it('Recommendations have images', () => {
        isArticleLessThanTwoYearsOld().then(runRecommendationTests => {
          if (runRecommendationTests) {
            cy.getToggles(service);
            cy.fixture(`toggles/${service}.json`).then(toggles => {
              const mostReadEnabled = path(['mostRead', 'enabled'], toggles);

              if (mostReadEnabled) {
                cy.get(`[data-e2e=recommendations-heading]`).scrollIntoView();
                cy.get(
                  '[data-e2e=recommendations-heading] > div > ul > li',
                ).each((item, index) => {
                  cy.wrap(item).within(() => {
                    cy.log(`List item number: ${index}`);
                    cy.log(`isAmp= ${isAmp}`);
                    if (isAmp) {
                      cy.get(
                        `[data-e2e=recommendations-wrapper] amp-img`,
                      ).should('have.attr', 'src');
                    } else {
                      cy.get(`[data-e2e=recommendations-wrapper] img`).should(
                        'have.attr',
                        'src',
                      );
                    }
                  });
                });
              }
            });
          } else {
            cy.log(
              'Only tests on live and for articles less than 2 years old due to lack of test data',
            );
          }
        });
      });

      it('Recommendations have titles', () => {
        isArticleLessThanTwoYearsOld().then(runRecommendationTests => {
          if (runRecommendationTests) {
            cy.getToggles(service);
            cy.fixture(`toggles/${service}.json`).then(toggles => {
              const mostReadEnabled = path(['mostRead', 'enabled'], toggles);

              if (mostReadEnabled) {
                cy.get(`[data-e2e=recommendations-heading]`).scrollIntoView();
                cy.get(
                  '[data-e2e=recommendations-heading] > div > ul > li',
                ).each((item, index) => {
                  cy.wrap(item).within(() => {
                    cy.log(`List item number: ${index + 1}`);
                    cy.get(`[data-e2e=recommendations-wrapper] > div > div > a`)
                      .invoke('text')
                      .then(text => {
                        expect(text.length).to.be.at.least(1);
                      });
                  });
                });
              }
            });
          } else {
            cy.log(
              'Only tests on live and for articles less than 2 years old due to lack of test data',
            );
          }
        });
      });
    });
  }
};
