import config from '../../../support/config/services';

const getParagraphText = blocks =>
  blocks.find(el => el.type === 'paragraph' && el.markupType === 'plain_text')
    .text;

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) => {
  describe(`No testsThatFollowSmokeTestConfig to run for ${service} ${pageType}`, () => {
    it('should render a paragraph, which contains/displays styled text', () => {
      cy.request(`${config[service].pageTypes[pageType].path}.json`).then(
        ({ body }) => {
          const text = getParagraphText(body.content.blocks);

          cy.get('p').should('contain', text);
        },
      );
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
