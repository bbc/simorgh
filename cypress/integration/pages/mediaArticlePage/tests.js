import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import {
  getBlockByType,
  getBlockData,
  getAllBlocksDataByType,
  getAllSocialBlocksByProviderName,
  fetchArticlePageData,
} from '../articles/helpers.js';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`Running testsToAlwaysRun for ${service} ${pageType}`, () => { });
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({
  service,
  pageType,
  variant,
}) => {
  let mediaArticleData;
  describe(`Tests for ${service} ${pageType}`, () => {
    // before(() => {
    // fetchArticlePageData(service, variant).then((response) => {
    //   mediaArticleData = response;
    //   cy.log(mediaArticleData);
    // });
    // });

    it('shows media at top of page', () => {
      // cy.log(mediaArticleData.contentType);
      // cy.log(mediaArticleData.data.article.metadata.consumableAsSFV);
      // expect(mediaArticleData.data.metadata.consumableAsSFV).toBe(true);
      cy.get('[data-e2e="media-player"]')
        .should('be.visible')
        .should('have.css', 'top', '0px')
    });

    it('dont load "Top Stories", "Feature" and "Most read"', () => {
      // the feature and top stories will not be removed for now but will eventually be replaced by 
      // the new TIPO curated "Latest Videos" onward journeys when those tickets are complete

      // cy.get('[data-testid="features"]').should('not.exist');
      // cy.get('[data-testid="top-stories"]').should('not.exist');
      cy.get('[data-e2e="most-read"]').should('not.exist');
    });

  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => { });
};
