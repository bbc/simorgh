import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import {
  getBlockByType,
  getBlockData,
  getAllSocialBlocksByProviderName,
} from './helpers';

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

      describe('Social Embeds', () => {
        it('Youtube embed is redered when it exists on page', () => {
          cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
            const youtubeSocialEmbedsData = getAllSocialBlocksByProviderName(
              'YouTube',
              body,
            );
            if (youtubeSocialEmbedsData.length > 0) {
              youtubeSocialEmbedsData.forEach(content => {
                const youtubeUrl = content.model.source;
                cy.get(`[data-e2e="youtube-embed-${youtubeUrl}"]`)
                  .scrollIntoView()
                  .within(() => {
                    cy.get(`[data-testid="consentBanner"]`).should('exist');
                    cy.get(`iframe`).should('not.exist');
                    cy.get(`[data-testid="banner-button"]`).click();
                    cy.get(`iframe`).should('exist');
                    cy.get(`[href^="#end-of-youtube-content"]`).should('exist');
                  });
              });
            } else {
              cy.log('There is no Youtube embed in this page!');
              cy.get(`[href^="#end-of-youtube-content"]`).should('not.exist');
            }
          });
        });

        it('Instagram embed is redered when it exists on page', () => {
          cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
            const instagramSocialEmbedsData = getAllSocialBlocksByProviderName(
              'Instagram',
              body,
            );
            if (instagramSocialEmbedsData.length > 0) {
              instagramSocialEmbedsData.forEach(content => {
                const instagramUrl = content.model.source;
                cy.get(`[data-e2e="instagram-embed-${instagramUrl}"]`)
                  .scrollIntoView()
                  .within(() => {
                    cy.get(`[href^="#end-of-instagram-content"]`).should(
                      'exist',
                    );
                    cy.get(`iframe`).should('exist');
                  });
              });
            } else {
              cy.log('There is no Instagram embed in this page!');
              cy.get(`[href^="#end-of-instagram-content"]`).should('not.exist');
            }
          });
        });

        it('Tiktok embed is redered when it exists on page', () => {
          cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
            const tiktokSocialEmbedsData = getAllSocialBlocksByProviderName(
              'TikTok',
              body,
            );
            if (tiktokSocialEmbedsData.length > 0) {
              tiktokSocialEmbedsData.forEach(content => {
                const tiktokUrl = content.model.source;
                cy.get(`[data-e2e="tiktok-embed-${tiktokUrl}"]`)
                  .scrollIntoView()
                  .within(() => {
                    cy.get(`[data-testid="consentBanner"]`).should('exist');
                    cy.get(`iframe`).should('not.exist');
                    cy.get(`[data-testid="banner-button"]`).click();
                    cy.get(`iframe`).should('exist');
                    cy.get(`[href^="#end-of-tiktok-content"]`).should('exist');
                  });
              });
            } else {
              cy.log('There is no Tiktok embed in this page!');
              cy.get(`[href^="#end-of-tiktok-content"]`).should('not.exist');
            }
          });
        });

        it('Twitter embed is redered when it exists on page', () => {
          cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
            const twitterSocialEmbedsData = getAllSocialBlocksByProviderName(
              'Twitter',
              body,
            );
            if (twitterSocialEmbedsData.length > 0) {
              twitterSocialEmbedsData.forEach(content => {
                const twitterUrl = content.model.source;
                cy.get(`[data-e2e="twitter-embed-${twitterUrl}"]`)
                  .scrollIntoView()
                  .within(() => {
                    cy.get(`iframe`).should('exist');
                    cy.get(`[href^="#end-of-twitter-content"]`).should('exist');
                  });
              });
            } else {
              cy.log('There is no Twitter embed in this page!');
              cy.get(`[href^="#end-of-twitter-content"]`).should('not.exist');
            }
          });
        });

        it('Facebook embed is redered when it exists on page', () => {
          cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
            const facebookSocialEmbedsData = getAllSocialBlocksByProviderName(
              'Facebook',
              body,
            );
            if (facebookSocialEmbedsData.length > 0) {
              facebookSocialEmbedsData.forEach(content => {
                const facebookUrl = content.model.source;
                cy.get(`[data-e2e="facebook-embed-${facebookUrl}"]`)
                  .scrollIntoView()
                  .within(() => {
                    cy.get(`iframe`).should('exist');
                    cy.get(`[href^="#end-of-facebook-content"]`).should(
                      'exist',
                    );
                  });
              });
            } else {
              cy.log('There is no Facebook embed in this page!');
              cy.get(`[href^="#end-of-facebook-content"]`).should('not.exist');
            }
          });
        });
      });
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
