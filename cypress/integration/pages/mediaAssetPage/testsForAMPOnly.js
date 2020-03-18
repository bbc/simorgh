import config from '../../../support/config/services';
import envConfig from '../../../support/config/envs';
import appConfig from '../../../../src/server/utilities/serviceConfigs';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAMPOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForAMPOnly to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({
  service,
  pageType,
  variant,
}) =>
  describe(`testsThatFollowSmokeTestConfigForAMPOnly for ${service} ${pageType}`, () => {
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
            `amp-iframe[src*="${envConfig.avEmbedBaseUrl}/ws/av-embeds/cps${assetUri}/${serviceId}/${language}"]`,
          ).should('be.visible');
        }
      });
    });

    describe('Chartbeat', () => {
      if (envConfig.chartbeatEnabled) {
        it('should have chartbeat config UID', () => {
          cy.hasAmpChartbeatConfigUid(0);
        });
      }
    });

    describe('AMP Status', () => {
      it('should return a 200 response', () => {
        cy.testResponseCodeAndType(
          `${Cypress.env('currentPath')}.amp`,
          200,
          'text/html',
        );
      });
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAMPOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForAMPOnly to run for ${service} ${pageType}`, () => {});
};
