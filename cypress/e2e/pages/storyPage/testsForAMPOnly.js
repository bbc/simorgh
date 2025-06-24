import runAMPAdsTests from '../../../support/helpers/adsTests/testsForAMPOnly';
import { ampOnly as mostReadAssertions } from '../mostReadPage/mostReadAssertions';

export default ({ service, pageType, variant }) => {
  describe(`Running testsForAMPOnly for ${service} ${pageType}`, () => {
    /* Most Read Component
     * These cypress tests are needed as unit tests cannot be run on the jsdom.
     *
     * web workers (which run on amp pages) do not run on the virtual dom.
     */
    mostReadAssertions({ service, variant });

    if (Cypress.env('APP_ENV') === 'local') {
      runAMPAdsTests({ service });
    }
  });
};
