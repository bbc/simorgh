import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';

const getParagraphText = blocks => {
  const textReplacements = {
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
  };

  const replacementsRegex = new RegExp(
    Object.keys(textReplacements).join('|'),
    'gi',
  );

  return blocks
    .find(el => el.type === 'paragraph' && el.markupType === 'plain_text')
    .text.replace(replacementsRegex, match => textReplacements[match]);
};

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({
  service,
  pageType,
  variant,
}) => {
  describe(`testsThatFollowSmokeTestConfig to run for ${service} ${pageType}`, () => {
    it('should render a H1, which contains/displays a styled headline', () => {
      cy.request(`${config[service].pageTypes[pageType].path}.json`).then(
        ({ body }) => {
          cy.get('h1').should('contain', body.promo.headlines.headline);
        },
      );
    });

    it('should render a paragraph, which contains/displays styled text', () => {
      cy.request(`${config[service].pageTypes[pageType].path}.json`).then(
        ({ body }) => {
          const text = getParagraphText(body.content.blocks);

          cy.get('p').should('contain', text);
        },
      );
    });

    it('should render a timestamp', () => {
      cy.request(`${config[service].pageTypes[pageType].path}.json`).then(
        ({ body }) => {
          const { lastPublished, firstPublished } = body.metadata;
          const timeDifferenceMinutes =
            (lastPublished - firstPublished) / 1000 / 60;
          const minutesTolerance = 1;
          cy.get('time')
            .eq(0)
            .should('exist')
            .should('be.visible')
            .should('have.attr', 'datetime')
            .should('not.be.empty');

          if (timeDifferenceMinutes > minutesTolerance) {
            cy.get('time')
              .eq(1)
              .should(
                'contain',
                appConfig[config[service].name][variant].articleTimestampPrefix,
              );
          }
        },
      );
    });
    it('should have href that matches assetURI for 1st related content link', () => {
      cy.request(`${config[service].pageTypes[pageType].path}.json`).then(
        ({ body }) => {
          const numRelatedContentGroups = body.relatedContent.groups.length;

          if (numRelatedContentGroups > 0) {
            const assetURI =
              body.relatedContent.groups[0].promos[0].locators.assetUri;
            cy.get(
              'li[class^="StoryPromoLi"] > div[class^="StoryPromoWrapper"]',
            )
              .find('h3')
              .within(() => {
                cy.get('a')
                  .should('have.attr', 'href')
                  .and('include', assetURI);
              });
          }
        },
      );
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
