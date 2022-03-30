import path from 'ramda/src/path';
import snapshotConfig from '../../../support/helpers/snapshotConfig';
import getDataUrl from '../../../support/helpers/getDataUrl';
import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import { getBlockByType, getBlockData } from './helpers';
import getServiceWithVariantName from '../../../support/helpers/getServiceWithVariantName';

// TODO: Remove after https://github.com/bbc/simorgh/issues/2959
const serviceHasFigure = service =>
  ['arabic', 'news', 'pashto', 'persian', 'urdu'].includes(service);
const serviceHasCaption = service => service === 'news';
// TODO: Remove after https://github.com/bbc/simorgh/issues/2962
const serviceHasCorrectlyRenderedParagraphs = service => service !== 'sinhala';

const serviceHasTimestamp = service => ['news', 'urdu'].includes(service);

// These services have inline links to other article pages (the one on news was 404ing so was replaced)
const serviceHasInlineLink = service =>
  service === 'news' || service === 'afaanoromoo';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`Running testsToAlwaysRun for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({
  service,
  pageType,
  variant,
}) => {
  describe(`Running tests for ${service} ${pageType}`, () => {
    describe(`Metadata`, () => {
      // Here we should only have metadata tests that are unique to articles pages
      it('should have the correct articles metadata', () => {
        cy.get('meta[name="article:author"]').should(
          'have.attr',
          'content',
          appConfig[config[service].name][variant].articleAuthor,
        );
      });

      it('should include mainEntityOfPage in the LinkedData', () => {
        cy.get('script[type="application/ld+json"]')
          .should('contain', 'mainEntityOfPage')
          .and('contain', 'author')
          .and('contain', 'headline');
      });
    });

    describe(`Article Body`, () => {
      it('should render a H1, which contains/displays a styled headline', () => {
        cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
          const headlineData = getBlockData('headline', body);
          cy.get('h1').should(
            'contain',
            headlineData.model.blocks[0].model.blocks[0].model.text,
          );
        });
      });

      it('should render an H2, which contains/displays a styled subheading', () => {
        cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
          if (body.metadata.language === 'en-gb') {
            const subheadingData = getBlockData('subheadline', body);
            cy.get('h2').should(
              'contain',
              subheadingData.model.blocks[0].model.blocks[0].model.text,
            );
          }
        });
      });

      it('should render a paragraph, which contains/displays styled text', () => {
        if (serviceHasCorrectlyRenderedParagraphs(service)) {
          cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
            const paragraphData = getBlockData('text', body);
            const { text } = paragraphData.model.blocks[0].model;

            cy.get('p').should('contain', text);
          });
        }
      });

      if (serviceHasFigure(service)) {
        it('should have a placeholder image', () => {
          cy.get('figure div div div').eq(0).should('be.visible');
        });

        if (serviceHasCaption(service)) {
          it('should have a visible image with a caption, and also not be lazyloaded', () => {
            cy.get('figure')
              .eq(0)
              .should('be.visible')
              .should('to.have.descendants', 'img')
              .should('to.have.descendants', 'figcaption')
              .within(() => cy.get('noscript').should('not.exist'));
          });
        }

        it('should have an image copyright label with styling', () => {
          cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
            const copyrightData = getBlockData('image', body);
            const rawImageblock = getBlockByType(
              copyrightData.model.blocks,
              'rawImage',
            );
            const { copyrightHolder } = rawImageblock.model;

            cy.get('figure')
              .eq(0)
              .within(() => {
                if (copyrightHolder === 'BBC') {
                  // If an image has a BBC copyright, the copyright holder (<p>) does not appear on images.
                  // This is why we're asserting the value. If the copyright does not appear and is not
                  // 'BBC' then it is clear there is an error with this component.
                  cy.get('p[role="text"]').should('not.exist');
                } else {
                  cy.get('p[role="text"]')
                    .should('be.visible')
                    .and('contain', copyrightHolder);
                }
              });
          });
        });
      }

      it('should have an inline link', () => {
        cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
          if (body.metadata.language === 'en-gb') {
            cy.get('main a');
          }
        });
      });

      if (serviceHasInlineLink(service) && Cypress.env('APP_ENV') !== 'live') {
        it('should have an inline link to an article page', () => {
          cy.get('a[href*="/articles/"]')
            .should('have.attr', 'href')
            .then(href => {
              cy.request({
                url: href,
                failOnStatusCode: false,
              }).then(resp => {
                expect(resp.status).to.not.equal(404);
              });
            });
        });
      }

      if (serviceHasTimestamp(service)) {
        it('should render a timestamp', () => {
          cy.get('time')
            .eq(0)
            .should('exist')
            .should('be.visible')
            .should('have.attr', 'datetime')
            .should('not.be.empty');
        });
      }
      describe(`Visual comparison tests for ${service} ${pageType}`, () => {
        it('Articles', () => {
          if (
            Cypress.env('APP_ENV') === 'local' &&
            Cypress.browser.isHeadless &&
            snapshotConfig(service)
          ) {
            cy.url().then(url => {
              cy.document().its('fonts.status').should('equal', 'loaded');
              if (!url.includes('.amp')) {
                cy.scrollTo('bottom', { duration: 6000 });
                cy.scrollTo('top', { duration: 4000 });
                // cy.matchImageSnapshot({
                //   capture: 'fullPage',
                //   blackout: ['[data-e2e="media-player"]'],
                // });
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

      describe('Media Player', () => {
        it('should have a visible caption beneath a mediaplayer', () => {
          cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
            const media = getBlockData('video', body);
            if (media) {
              const captionBlock = getBlockByType(
                media.model.blocks,
                'caption',
              );

              if (captionBlock) {
                const { text } =
                  captionBlock.model.blocks[0].model.blocks[0].model;

                cy.get('figcaption')
                  .eq(1)
                  .within(() => {
                    cy.get('p')
                      .eq(0)
                      .should('be.visible')
                      .should('contain', text);
                  });
              }
            }
          });
        });
      });
    });
    describe(`Articles Secondary Column`, () => {
      it('should have at least one story promo in Features', () => {
        if (service !== 'scotland') {
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
          cy.log('No secondary column on scotland service');
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
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
