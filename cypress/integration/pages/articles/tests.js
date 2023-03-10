import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import {
  getBlockByType,
  getBlockData,
  getAllBlocksDataByType,
  getAllSocialBlocksByProviderName,
  fetchArticlePageData,
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
  let articlesData;
  describe(`Running tests for ${service} ${pageType}`, () => {
    before(async () => {
      articlesData = await fetchArticlePageData(service, variant).then(
        ({ body }) => body,
      );
    });
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
        const headlineData = getBlockData('headline', articlesData);
        cy.get('h1').should(
          'contain',
          headlineData.model.blocks[0].model.blocks[0].model.text,
        );
      });

      it('should render an H2, which contains/displays a styled subheading', () => {
        if (articlesData.data.article.metadata.language === 'en-gb') {
          const subheadingData = getBlockData('subheadline', articlesData);
          cy.get('h2').should(
            'contain',
            subheadingData.model.blocks[0].model.blocks[0].model.text,
          );
        }
      });

      it('should render a paragraph, which contains/displays styled text', () => {
        if (serviceHasCorrectlyRenderedParagraphs(service)) {
          const paragraphData = getBlockData('text', articlesData);
          const { text } = paragraphData.model.blocks[0].model;

          cy.get('p').should('contain', text);
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
          const copyrightData = getBlockData('image', articlesData);
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
      }

      it('should have an inline link', () => {
        if (articlesData.data.article.metadata.language === 'en-gb') {
          cy.get('main a').should('exist');
        }
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
          const media = getBlockData('video', articlesData);
          if (media) {
            const captionBlock = getBlockByType(media.model.blocks, 'caption');

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

      describe('Social Embeds', () => {
        const availableSocialMediaOnPage = [];
        const socialIsOnPage = social =>
          availableSocialMediaOnPage.includes(social);
        before(() => {
          availableSocialMediaOnPage.push(
            ...getAllBlocksDataByType('social', articlesData).map(
              block => block.model.providerName,
            ),
          );
        });
        ['YouTube', 'Instagram', 'TikTok', 'Twitter', 'Facebook'].forEach(
          socialMediaProviderName => {
            // eslint-disable-next-line func-names
            it(`${socialMediaProviderName} embed is rendered when it exists on page`, function () {
              if (socialIsOnPage(socialMediaProviderName)) {
                const SocialEmbedsData = getAllSocialBlocksByProviderName(
                  socialMediaProviderName,
                  articlesData,
                );
                const lowercaseSocialMediaProviderName =
                  socialMediaProviderName.toLowerCase();
                SocialEmbedsData.forEach(content => {
                  const socialMediaUrl = content.model.source;
                  cy.get(
                    `[data-e2e="${lowercaseSocialMediaProviderName}-embed-${socialMediaUrl}"]`,
                  )
                    .scrollIntoView()
                    .within(() => {
                      cy.get(`[data-testid="consentBanner"]`).should('exist');
                      cy.get(`iframe`).should('not.exist');
                      // TODO: Revisit why this is failing to find the iframe in time
                      // cy.get(`[data-testid="banner-button"]`).click();
                      // cy.get(`iframe`).should('exist');
                      // cy.get(
                      //   `[href^="#end-of-${lowercaseSocialMediaProviderName}-content"]`,
                      // ).should('exist');
                    });
                });
              } else {
                cy.log(`No ${socialMediaProviderName} embed on page`);
                this.skip();
              }
            });
          },
        );
      });
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
