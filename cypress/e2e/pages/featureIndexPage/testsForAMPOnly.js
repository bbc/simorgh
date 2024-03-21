/* eslint-disable import/prefer-default-export */
import runAMPAdsTests from '../../../support/helpers/adsTests/testsForAMPOnly';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({ service }) => {
  if (Cypress.env('APP_ENV') === 'local') {
    runAMPAdsTests({ service });
  }
};
