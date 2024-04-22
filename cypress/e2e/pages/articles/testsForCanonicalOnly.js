/* eslint-disable import/prefer-default-export */
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import appToggles from '../../../support/helpers/useAppToggles';
import { getBlockData, getBlockByType, getVideoEmbedUrl } from './helpers';

// TODO: Remove after https://github.com/bbc/simorgh/issues/2959
const serviceHasCaption = service => service === 'news';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
  variant,
}) =>
  describe(`Canonical Tests for ${service} ${pageType}`, () => {
    let pageData;
    before(() => {
      cy.getPageDataFromWindow().then(data => {
        pageData = data;

        const currentPath = Cypress.env('currentPath');
        const currentPathNoSlashes = currentPath.replace(/\//g, '');
        const filename = `cypress/fixtures/tempFixtures/pageData_${currentPathNoSlashes}.json`;
        console.log(`filename is ${filename}`);
        console.log(
          `page data in canonical before ${JSON.stringify(pageData)}`,
        );
        cy.writeFile(filename, pageData);
      });
    });

    if (appToggles.chartbeatAnalytics.enabled) {
      describe('Chartbeat', () => {
        if (envConfig.chartbeatEnabled) {
          it('should have a script with src value set to chartbeat source', () => {
            cy.hasScriptWithChartbeatSrc();
          });
          it('should have chartbeat config set to window object', () => {
            cy.hasGlobalChartbeatConfig();
          });
        }
      });
    }

    if (serviceHasCaption(service)) {
      describe('Image with placeholder', () => {
        it('should have a visible image that is not lazyloaded', () => {
          cy.get('[data-e2e="image-placeholder"]')
            .eq(0)
            .should('be.visible')
            .should('to.have.descendants', 'img')
            .within(() => {
              cy.get('div[class*="lazyload-placeholder"]').should('not.exist');
            });
        });

        it('should have a visible image that is lazyloaded and has a noscript fallback image', () => {
          cy.get('[data-e2e="image-placeholder"]').eq(1).as('imagePlaceholder');
          cy.get('@imagePlaceholder').should('be.visible');
          cy.get('@imagePlaceholder').scrollIntoView();
          cy.get('@imagePlaceholder').within(() => {
            cy.get('noscript').contains('<img ');
            cy.get('div[class*="lazyload-placeholder"]').should('exist');
          });
        });

        it('should have an image with a caption', () => {
          const { model } = getBlockData('image', pageData);
          const {
            model: { blocks },
          } = model && model.blocks && getBlockByType(model.blocks, 'caption');
          const { text: captionText } =
            blocks && blocks[0].model.blocks[0].model;
          if (captionText) {
            cy.get('figcaption')
              .eq(0)
              .should('be.visible')
              .and('contain', captionText);
          } else {
            // check for image with no caption
            cy.get('figure')
              .eq(0)
              .within(() => {
                cy.get('figcaption').should('not.exist');
              });
          }
        });
      });
    }

    describe('Media Player: Canonical', () => {
      it('should render a visible placeholder image', () => {
        console.log(`page data in canonical test ${JSON.stringify(pageData)}`);

        const media = getBlockData('video', pageData);

        if (media) {
          cy.get('[data-e2e="media-player"]').within(() => {
            cy.get('[data-e2e="media-player__placeholder"] img')
              .should('be.visible')
              .should('have.attr', 'src')
              .should('not.be.empty');
          });
        }
      });

      it('should render a visible guidance message', () => {
        const media = getBlockData('video', pageData);

        if (media) {
          const longGuidanceWarning =
            media.model.blocks[1].model.blocks[0].model.versions[0].warnings
              .long;

          cy.get('[data-e2e="media-player"]')
            .eq(0)
            .within(() => {
              // Check for video with guidance message
              if (longGuidanceWarning) {
                cy.get('[data-e2e="media-player__placeholder"] strong')
                  .should('be.visible')
                  .and('contain', longGuidanceWarning);
                // Check for video with no guidance message
              } else {
                cy.get('[data-e2e="media-player__guidance"] strong').should(
                  'not.exist',
                );
              }
            });
        }
      });

      it('should have a visible play button and valid duration', () => {
        const media = getBlockData('video', pageData);
        if (media && media.type === 'video') {
          const aresMediaBlocks = media.model.blocks[1].model.blocks[0];
          const { durationISO8601 } = aresMediaBlocks.model.versions[0];

          cy.get('[data-e2e="media-player"]').within(() => {
            cy.get('button')
              .should('be.visible')
              .within(() => {
                cy.get('svg').should('be.visible');
                cy.get('time')
                  .should('be.visible')
                  .should('have.attr', 'datetime')
                  .and('eq', durationISO8601);
              });
          });
        }
      });
      if (service === 'pidgin') {
        it('should render an iframe with a valid URL when a user clicks play', () => {
          const media = getBlockData('video', pageData);
          if (media && media.type === 'video') {
            const { lang } = appConfig[service][variant];
            const embedUrl = getVideoEmbedUrl(pageData, lang);
            cy.get('[data-e2e="media-player"] button').first().click();
            cy.get(`iframe[src*="${embedUrl}"]`).should('be.visible');

            cy.testResponseCodeAndTypeRetry({
              path: embedUrl,
              responseCode: 200,
              type: 'text/html',
              allowFallback: true,
            });
          }
        });
      }
    });
  });
