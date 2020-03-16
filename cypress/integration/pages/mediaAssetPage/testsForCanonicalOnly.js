import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import { hasMedia, getEmbedUrl } from './helpers';

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
        const language = appConfig[config[service].name][variant].lang;
        const embedUrl = getEmbedUrl(body, language);

        cy.get(`iframe[src*="${embedUrl}"]`).should('be.visible');
      });
    });

    it('should play media', () => {
      cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
        const canPlayMedia = hasMedia(body);

        if (!canPlayMedia) throw new Error('No media detected');

        // Ensure media player is ready
        cy.get(
          'div[class^="StyledVideoContainer"] iframe[class^="StyledIframe"]',
        ).then($iframe => {
          cy.wrap($iframe.prop('contentWindow'), {
            timeout: 30000,
          })
            .its('embeddedMedia.playerInstances.mediaPlayer.ready')
            .should('eq', true);
        });

        const playButton = 'button.p_cta';

        cy.get('iframe').then(iframe => {
          cy.wrap(iframe.contents().find('iframe'))
            .should(inner => expect(inner.contents().find(playButton)).to.exist)
            .then(inner => cy.wrap(inner.contents().find(playButton)).click())
            .then(() => {
              cy.wrap(iframe.prop('contentWindow'), {
                timeout: 45000,
              })
                .its('embeddedMedia.playerInstances.mediaPlayer')
                .invoke('currentTime')
                .should('be.gt', 0);
            });
        });
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
