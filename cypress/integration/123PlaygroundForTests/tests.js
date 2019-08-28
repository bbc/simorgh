import config from '../../support/config/services';
import appConfig from '../../../src/app/lib/config/services';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) =>
  describe(`Tests for ${service} ${pageType}`, () => {
    describe('Live Radio body', () => {
      it('should render a H1, which contains/displays a styled headline', () => {
        cy.request(`${config[service].pageTypes.liveRadio.path}.json`).then(
          ({ body }) => {
            const [{ text: headline }] = body.content.blocks;
            cy.get('h1').should('contain', headline);
          },
        );
      });

      it('should render an H2, which contains/displays a styled subheading', () => {
        cy.request(`${config[service].pageTypes.liveRadio.path}.json`).then(
          ({ body }) => {
            if (body.metadata.language === 'en-gb') {
              const { subheadline } = body.content.blocks[1];
              cy.get('h2').should('contain', subheadline);
            }
          },
        );
      });

      it('should render a title', () => {
        cy.request(`${config[service].pageTypes.liveRadio.path}.json`).then(
          ({ body }) => {
            const { name } = body.promo;
            cy.title().should(
              'eq',
              `${name} - ${appConfig[service].brandName}`,
            );
          },
        );
      });
    });

    // will be addressed by https://github.com/bbc/simorgh/issues/2750
    describe('Metadata', () => {
      it.skip('should have the correct facebook metadata', () => {
        cy.checkFacebookMetadata(
          '100004154058350',
          '1609039196070050',
          `${appConfig[service].articleAuthor}`,
        );
      });

      it.skip('should have the correct open graph metadata', () => {
        cy.checkOpenGraphMetadata(
          'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
          `${appConfig[service].defaultImage}`,
          `${appConfig[service].defaultImageAltText}`,
          `${appConfig[service].locale}`,
          `${appConfig[service].defaultImageAltText}`,
          "Meghan's bouquet laid on tomb of unknown warrior",
          'article',
          `https://www.bbc.com${config[service].pageTypes.liveRadio.path}`,
        );
      });

      it.skip('should have the correct twitter metadata', () => {
        cy.checkTwitterMetadata(
          'summary_large_image',
          `${appConfig[service].twitterCreator}`,
          'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
          `${appConfig[service].defaultImageAltText}`,
          `${appConfig[service].defaultImage}`,
          `${appConfig[service].twitterSite}`,
          "Meghan's bouquet laid on tomb of unknown warrior",
        );
      });

      it.skip('should include metadata that matches the JSON data', () => {
        cy.request().then(({ body }) => {
          cy.get('head').within(() => {
            cy.get('meta[name="description"]').should(
              'have.attr',
              'content',
              body.pageData.promo.summary || body.pageData.promo.name,
            );
            cy.get('meta[name="og:title"]').should(
              'have.attr',
              'content',
              body.pageData.promo.name,
            );
            cy.get('meta[name="og:type"]').should(
              'have.attr',
              'content',
              body.pageData.metadata.type,
            );
          });
        });
      });

      // will be addressed by this https://github.com/bbc/simorgh/issues/3117
      it.skip('should include mainEntityOfPage in the LinkedData', () => {
        cy.get('script[type="application/ld+json"]')
          .should('contain', 'mainEntityOfPage')
          .and('contain', 'headline');
      });
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
