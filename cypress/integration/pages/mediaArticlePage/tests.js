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
    before(() => {
      cy.getArticlePageData(service, variant).then((response) => {
        mediaArticleData = response.body;
        console.log(JSON.stringify(mediaArticleData));
      });
    });

    describe('Media Player', () => {

      it('caption beneath a mediaplayer is visible', () => {
        const media = getBlockData('video', mediaArticleData);
        const { text } =
          getBlockByType(media.model.blocks, 'caption').model.blocks[0].model.blocks[0].model;
        cy.get('figcaption')
          .within(() => {
            cy.get('p')
              .should('be.visible')
              .should('contain', text);
          });
      });
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
