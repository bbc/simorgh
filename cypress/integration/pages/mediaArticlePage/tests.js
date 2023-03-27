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
    before(async () => {
      mediaArticleData = await fetchArticlePageData(service, variant).then(
        ({ body }) => body,
      );

      // fetchArticlePageData(service, variant).then(({ body }) => {
      //   cy.log(body);
      // variantTopicId = body.data.variantTopicId;
      // pageCount = body.data.pageCount;
      // numberOfItems = body.data.curations[0].summaries.length;
      // firstItemHeadline = body.data.curations[0].summaries[0].title;
      // messageBanner = body.data.curations.find(
      //   curation =>
      //     curation.visualProminence === 'NORMAL' &&
      //     curation.visualStyle === 'BANNER',
      // );
      // });
    });

    it.only('shows media at top of page', () => {
      cy.log(mediaArticleData.data.metadata.consumableAsSFV);
      expect(mediaArticleData.data.metadata.consumableAsSFV).toBe(true);
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
