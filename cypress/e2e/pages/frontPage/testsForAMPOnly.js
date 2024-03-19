/* eslint-disable import/prefer-default-export */
import runAMPAdsTests from '../../../support/helpers/adsTests/testsForAMPOnly';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({
  service,
  pageType,
}) =>
  describe(`Amp Tests for ${service} ${pageType}`, () => {
    it('should contain an amp-img', () => {
      cy.get('li').should('be.visible').find('amp-img').should('be.visible');
    });

    if (Cypress.env('APP_ENV') === 'local') {
      runAMPAdsTests({ service });
    }
  });
