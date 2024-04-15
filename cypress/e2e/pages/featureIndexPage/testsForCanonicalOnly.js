/* eslint-disable import/prefer-default-export */
import runCanonicalAdsTests from '../../../support/helpers/adsTests/testsForCanonicalOnly';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({ service }) => {
  if (Cypress.env('APP_ENV') === 'local') {
    runCanonicalAdsTests({ service });
  }
};
