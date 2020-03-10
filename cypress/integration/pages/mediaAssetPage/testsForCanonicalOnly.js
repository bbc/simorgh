import config from '../../../support/config/services';
import envConfig from '../../../support/config/envs';
import appConfig from '../../../../src/server/utilities/serviceConfigs';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForCanonicalOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
  variant,
}) =>
  describe(`testsThatFollowSmokeTestConfigForCanonicalOnly for ${service} ${pageType}`, () => {
    it('should render a media player', () => {
      cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
        const assetUriString = body.metadata.locators.assetUri;
        if (assetUriString.split('/').length > 4) {
          cy.log('Test skipped because legacy MAP');
        } else {
          const mediaBlock = body.content.blocks[0];
          const isLiveStream = mediaBlock.type === 'version';
          const serviceId = isLiveStream
            ? mediaBlock.externalId
            : mediaBlock.versions[0].versionId;
          const language = appConfig[config[service].name][variant].lang;
          const { assetUri } = body.metadata.locators;
          cy.get(
            `iframe[src*="${envConfig.avEmbedBaseUrl}/ws/av-embeds/cps${assetUri}/${serviceId}/${language}"]`,
          ).should('be.visible');
        }
      });
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};
