import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import getMappedServiceId from './helpers';

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
  describe(`Canonical Tests for ${service} ${pageType}`, () => {
    describe('live radio body', () => {
      it('should render an audio player embed', () => {
        cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
          const { id, externalId } = body.content.blocks[2];
          const serviceId = getMappedServiceId(externalId);
          const { lang } = appConfig[service][variant];
          cy.get(
            `iframe[src="${envConfig.avEmbedBaseUrl}/ws/av-embeds/media/${serviceId}/${id}/${lang}"]`,
          ).should('be.visible');
        });
      });

      it('should play the media', () => {
        cy.get(
          'div[class^="StyledAudioContainer"] iframe[class^="StyledIframe"]',
        ).then($iframe => {
          cy.wrap($iframe.prop('contentWindow'), {
            timeout: 8000,
          })
            .its('embeddedMedia.playerInstances.mediaPlayer.ready')
            .should('eq', true);
        });

        const playButton = 'button#p_audioui_playpause.audioButton';

        cy.get('iframe').then(iframe => {
          cy.wrap(iframe.contents().find('iframe'))
            .should(inner => expect(inner.contents().find(playButton)).to.exist)
            .then(inner => cy.wrap(inner.contents().find(playButton)).click())
            .then(() => {
              cy.wrap(iframe.prop('contentWindow'), {
                timeout: 8000,
              })
                .its('embeddedMedia.playerInstances.mediaPlayer')
                .invoke('currentTime')
                .should('be.gt', 0);
            });
        });
      });
    });

    // TODO Chartbeat not yet implemented
    describe('Chartbeat', () => {
      if (envConfig.chartbeatEnabled) {
        it.skip('should have a script with src value set to chartbeat source', () => {
          cy.hasScriptWithChartbeatSrc();
        });
        it.skip('should have chartbeat config set to window object', () => {
          cy.hasGlobalChartbeatConfig();
        });
      }
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};
