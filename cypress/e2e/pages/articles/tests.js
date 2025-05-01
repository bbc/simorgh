import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import { crossPlatform as mostReadAssertions } from '../mostReadPage/mostReadAssertions';

// TODO: Remove after https://github.com/bbc/simorgh/issues/2959
const serviceHasFigure = service =>
  ['arabic', 'news', 'pashto', 'persian', 'urdu'].includes(service);
const serviceHasCaption = service => service === 'news';

const serviceHasTimestamp = service => ['news', 'urdu'].includes(service);

// These services have inline links to other article pages (the one on news was 404ing so was replaced)
const serviceHasInlineLink = service =>
  service === 'news' || service === 'afaanoromoo';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({ service, pageType, variant = 'default' }) => {
  describe(`Running tests for ${service} ${pageType}`, () => {
    describe(`Metadata`, () => {
      const serviceID = config[service]?.name || service;

      // Here we should only have metadata tests that are unique to articles pages
      it('should have the correct articles metadata', () => {
        cy.get('meta[name="article:author"]').should(
          'have.attr',
          'content',
          appConfig[serviceID][variant].articleAuthor,
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
      let articleId;
      before(() => {
        cy.url().then(url => {
          [, articleId] = url.match(/\/([^/]+?)(?:\.[^/.]+)?$/);
        });
      });
      // If we can find assets with other social media embed types, we can add more
      // tests for them here
      it('should render a twitter embed', () => {
        if (articleId === 'cw8qv1d11l9o') {
          cy.get(`[data-e2e^="twitter-embed-"]`).first().as('socialMediaEmbed');
          cy.get('@socialMediaEmbed').scrollIntoView();
          cy.get('@socialMediaEmbed').within(() => {
            cy.get(`[data-testid="consentBanner"]`).should('exist');
            cy.get(`iframe`).should('not.exist');
            // This used to have the comment
            // 'TODO: Revisit why this is failing to find the iframe in time'
            // which suggested the below tests didn't work
            // It appears to work when I run it now, so maybe I should keep it as it is good to check
            cy.get(`[data-testid="banner-button"]`).click();
            cy.get(`iframe`).should('exist');
            cy.get(`[href^="#end-of-twitter-content"]`).should('exist');
          });
        } else {
          cy.log('Not an asset with a twitter embed');
        }
      });
    });

    /**
     * Most Read Component
     */
    mostReadAssertions({ service, variant });
  });
};
