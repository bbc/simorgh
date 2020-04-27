import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import appToggles from '../../../support/helpers/useAppToggles';
import { getBlockData, getVideoEmbedUrl } from './helpers';

// TODO: Remove after https://github.com/bbc/simorgh/issues/2959
const serviceHasFigure = service =>
  ['arabic', 'news', 'pashto', 'persian', 'urdu'].includes(service);

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
  describe(`Running testsForAMPOnly for ${service} ${pageType}`, () => {
    if (appToggles.chartbeatAnalytics.enabled) {
      describe('Chartbeat', () => {
        if (envConfig.chartbeatEnabled) {
          it('should have chartbeat config UID', () => {
            cy.hasAmpChartbeatConfigUid();
          });
        }
      });
    }

    it('should contain an amp-img', () => {
      if (serviceHasFigure(service)) {
        cy.get('figure')
          .eq(0)
          .should('be.visible')
          .within(() => {
            cy.get('amp-img').should('be.visible');
          });
      }
    });

    // `appToggles` tells us whether a feature is toggled on or off in the current environment.
    if (appToggles.mediaPlayer.enabled) {
      describe('Media Player: AMP', () => {
        it('should render a placeholder image', () => {
          cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
            const media = getBlockData('video', body);
            if (media && media.type === 'video') {
              cy.get('div[class^="StyledVideoContainer"]').within(() => {
                cy.get('amp-img')
                  .should('have.attr', 'src')
                  .should('not.be.empty');
              });
            }
          });
        });

        it('should render an iframe with a valid URL when a user clicks play', () => {
          cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
            const media = getBlockData('video', body);

            if (media && media.type === 'video') {
              const { lang } = appConfig[service][variant];
              const embedUrl = `${getVideoEmbedUrl(body, lang)}/amp`;
              cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
              cy.get(`amp-iframe[src="${embedUrl}"]`).should('be.visible');
            }
          });
        });
      });
    }
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAMPOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForAMPOnly to run for ${service} ${pageType}`, () => {});
};
