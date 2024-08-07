import runAMPAdsTests from '../../../support/helpers/adsTests/testsForAMPOnly';
import { ampOnly as mostReadAssertions } from '../mostReadPage/mostReadAssertions';

export const testsThatAlwaysRunForAMPOnly = ({
  service,
  pageType,
  variant,
}) => {
  describe(`Running testsToAlwaysRunForAMPOnly for ${service} ${pageType}`, () => {
    /* Most Read Component
     * These cypress tests are needed as unit tests cannot be run on the jsdom.
     *
     * web workers (which run on amp pages) do not run on the virtual dom.
     */
    mostReadAssertions({ service, variant });
  });
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({ service }) => {
  if (Cypress.env('APP_ENV') === 'local') {
    runAMPAdsTests({ service });
  }
};
