import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import appToggles from '../../../support/helpers/useAppToggles';
import { getBlockData, getBlockByType, getVideoEmbedUrl } from './helpers';

// TODO: Remove after https://github.com/bbc/simorgh/issues/2959
const serviceHasCaption = service => service === 'news';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForCanonicalOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
  variant,
}) =>
  describe(`Canonical Tests for ${service} ${pageType}`, () => {
    it('should not have an AMP attribute on the main article', () => {
      cy.get('html').should('not.have.attr', 'amp');
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

    it('should include ampHTML tag', () => {
      cy.get('head link[rel="amphtml"]').should(
        'have.attr',
        'href',
        `${window.location.origin}${Cypress.env('currentPath')}.amp`,
      );
    });

    if (serviceHasCaption(service)) {
      describe('Image with placeholder', () => {
        it('should have a visible image that is not lazyloaded', () => {
          cy.get('div[class^="ImagePlaceholder"]')
            .eq(0)
            .should('be.visible')
            .should('to.have.descendants', 'img')
            .within(() => {
              cy.get('div[class^="lazyload-placeholder"]').should('not.exist');
            });
        });

        it('should have a visible image that is lazyloaded and has a noscript fallback image', () => {
          cy.get('div[class^="ImagePlaceholder"]')
            .eq(1)
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
              cy.get('noscript').contains('<img ');
              cy.get('div[class^="lazyload-placeholder"]').should('exist');
            });
        });

        it('should have an image with a caption', () => {
          cy.window().then(win => {
            const { model } = getBlockData('image', win.SIMORGH_DATA.pageData);
            const {
              model: { blocks },
            } =
              model && model.blocks && getBlockByType(model.blocks, 'caption');
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
      });
    }

    // `appToggles` tells us whether a feature is toggled on or off in the current environment.
    if (appToggles.mediaPlayer.enabled) {
      describe('Media Player: Canonical', () => {
        it('should render a visible placeholder image', () => {
          cy.window().then(win => {
            const media = getBlockData('video', win.SIMORGH_DATA.pageData);
            if (media) {
              cy.get('div[class^="StyledVideoContainer"]').within(() => {
                cy.get('div[class^="StyledPlaceholder"] > img')
                  .should('be.visible')
                  .should('have.attr', 'src')
                  .should('not.be.empty');
              });
            }
          });
        });

        it('should render a visible guidance message', () => {
          cy.window().then(win => {
            const media = getBlockData('video', win.SIMORGH_DATA.pageData);

            if (media) {
              const longGuidanceWarning =
                media.model.blocks[1].model.blocks[0].model.versions[0].warnings
                  .long;

              cy.get('div[class^="StyledVideoContainer"]')
                .eq(0)
                .within(() => {
                  // Check for video with guidance message
                  if (longGuidanceWarning) {
                    cy.get('div[class^="StyledPlaceholder"]')
                      .within(() => {
                        cy.get('strong');
                      })
                      .should('be.visible')
                      .and('contain', longGuidanceWarning);
                    // Check for video with no guidance message
                  } else {
                    cy.get('div[class^="StyledGuidance"]').should('not.exist');
                  }
                });
            }
          });
        });

        it('should have a visible play button and valid duration', () => {
          cy.window().then(win => {
            const media = getBlockData('video', win.SIMORGH_DATA.pageData);
            if (media && media.type === 'video') {
              const aresMediaBlocks = media.model.blocks[1].model.blocks[0];
              const { durationISO8601 } = aresMediaBlocks.model.versions[0];

              cy.get('div[class^="StyledVideoContainer"]').within(() => {
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
        });

        it('should render an iframe with a valid URL when a user clicks play', () => {
          cy.window().then(win => {
            const body = win.SIMORGH_DATA.pageData;
            const media = getBlockData('video', body);

            if (media && media.type === 'video') {
              const { lang } = appConfig[service][variant];
              const embedUrl = getVideoEmbedUrl(body, lang);
              cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
              cy.get(
                'div[class*="StyledVideoContainer"] button[class*="StyledPlayButton"]',
              )
                .click()
                .then(() => {
                  cy.get(`iframe[src="${embedUrl}"]`).should('be.visible');
                });
            }
          });
        });
      });
    }
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};
