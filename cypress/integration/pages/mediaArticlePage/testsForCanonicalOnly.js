import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import appToggles from '../../../support/helpers/useAppToggles';
import { getBlockData, getBlockByType, getVideoEmbedUrl } from './helpers';

// TODO: Remove after https://github.com/bbc/simorgh/issues/2959
const serviceHasCaption = service => service === 'news';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForCanonicalOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForCanonicalOnly to run for ${service} ${pageType}`, () => { });
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
  variant,
}) => {
  describe(`Canonical Tests for ${service} ${pageType}`, () => {
    if (appToggles.chartbeatAnalytics.enabled) {
      describe('Chartbeat', () => {
        if (envConfig.chartbeatEnabled) {
          it('should have a script with src value set to chartbeat source', () => {
            cy.hasScriptWithChartbeatSrc();
          });
          it('should have chartbeat config set to window object', () => {
            cy.hasGlobalChartbeatConfig();
          });
        }
      });
    }
  });

  describe('Media Player: Canonical', () => {
    it('Media player is rendered on page', () => {
      cy.get('[data-e2e="media-player"]')
        .should('be.visible')
        .should('have.css', 'top', '0px')
        .within(() => {
          cy.get('img')
            .should('be.visible')
            .should('have.attr', 'src')
            .should('not.be.empty');
          cy.get('button')
            .should('be.visible')
            .within(() => {
              cy.get('svg').should('be.visible');
              cy.get('time').should('be.visible').should('have.attr', 'datetime');
              // .and('eq', durationISO8601);
            })
        });
    });

    it('media can be played', () => {
      cy.intercept('GET', 'https://open.test.bbc.co.uk/mediaselector').as('mediaSelector')
      cy.get('[data-e2e="media-player"]')
        .should('be.visible')
        .should('have.css', 'top', '0px')
        .within(() => {
          cy.get('button').should('be.visible').click().then(() => {
            cy.get(`iframe`).should('be.visible');
          });
        });
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForCanonicalOnly to run for ${service} ${pageType}`, () => { });
};
