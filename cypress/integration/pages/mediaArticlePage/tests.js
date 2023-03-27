import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`Running testsToAlwaysRun for ${service} ${pageType}`, () => { });
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) => {
  describe(`Tests for ${service} ${pageType}`, () => {
    let mediaArticlesData;
    before(async () => {
      mediaArticlesData = await fetchArticlePageData(service, variant).then(
        ({ body }) => body,
      );
    });
    it.only('shows media at top of page', () => {
      // media-player__guidance
      cy.get('[data-e2e="media-player"]')
        .should('be.visible')
        .should('have.css', 'top', '0px');
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => { });
};
