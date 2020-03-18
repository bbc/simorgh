import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import getMappedServiceId from './helper';

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
  describe(`Amp Tests for ${service} ${pageType}`, () => {
    describe('AMP Status', () => {
      it('should return a 200 response', () => {
        cy.testResponseCodeAndType(
          `${Cypress.env('currentPath')}.amp`,
          200,
          'text/html',
        );
      });
    });

    describe('live radio body', () => {
      it('should render an audio player image placeholder', () => {
        cy.get(
          `amp-img[src="${envConfig.assetUrl}/images/amp_audio_placeholder.png"]`,
        ).should('exist');
      });

      it('should render an audio player embed', () => {
        cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
          const { id, externalId } = body.content.blocks[2];
          const serviceId = getMappedServiceId(externalId);
          const { lang } = appConfig[service][variant];
          cy.get(
            `amp-iframe[src="${envConfig.avEmbedBaseUrl}/ws/av-embeds/media/${serviceId}/${id}/${lang}/amp"]`,
          ).should('be.visible');
        });
      });
    });

    describe('Chartbeat', () => {
      if (envConfig.chartbeatEnabled) {
        it('should have chartbeat config UID', () => {
          cy.hasAmpChartbeatConfigUid();
        });
      }
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAMPOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForAMPOnly to run for ${service} ${pageType}`, () => {});
};
