import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import {
  getAllBlocksDataByType,
  getAllSocialBlocksByProviderName,
} from './helpers';
import { crossPlatform as mostReadAssertions } from '../mostReadPage/mostReadAssertions';

// TODO: Remove after https://github.com/bbc/simorgh/issues/2959
const serviceHasFigure = service =>
  ['arabic', 'news', 'pashto', 'persian', 'urdu'].includes(service);
const serviceHasCaption = service => service === 'news';

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
    before(() => {
      cy.getPageDataFromWindow({ service, pageType: 'article', variant }).then(
        ({ pageData }) => {
          articlesData = pageData;
          console.log(`articlesData is ${articlesData}`);
        },
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

    if (serviceHasFigure(service)) {
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

      // eslint-disable-next-line no-only-tests/no-only-tests
      it('should have an image copyright label with styling', () => {
        let testAssetId;
        cy.url().then(url => {
          // eslint-disable-next-line prefer-destructuring
          testAssetId = url.match(/\/([^/]+?)(?:\.[^/.]+)?$/)[1];
          cy.get('figure')
            .eq(0)
            .within(() => {
              // THERE IS NO TEST ASSET WITH A BBC COPYRIGHT
              // FIND ONE?
              // if (copyrightHolder === 'BBC') {
              //   // If an image has a BBC copyright, the copyright holder (<p>) does not appear on images.
              //   // This is why we're asserting the value. If the copyright does not appear and is not
              //   // 'BBC' then it is clear there is an error with this component.
              //   cy.get('p[role="text"]').should('not.exist');
              // }
              if (testAssetId === 'crgxnrdl1xvo') {
                cy.get('p[role="text"]')
                  .should('be.visible')
                  .and('contain', '@molanaabdolhamid');
              } else if (testAssetId === 'cld9872jgyjo') {
                cy.get('p[role="text"]')
                  .should('be.visible')
                  .and('contain', 'proofpoint');
              }
            });
        });
      });
    }

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
                ).as('socialMediaEmbed');

                cy.get('@socialMediaEmbed').scrollIntoView();
                cy.get('@socialMediaEmbed').within(() => {
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

    /**
     * Most Read Component
     */
    mostReadAssertions({ service, variant });
  });
};
