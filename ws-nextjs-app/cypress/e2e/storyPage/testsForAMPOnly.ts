import { ServiceParametersType } from '../../types';
import runAMPAdsTests from '../../support/helpers/adsTests/testsForAMPOnly';
// import { ampOnly as mostReadAssertions } from '../assertions/crossPlatformAssertion';

export default ({ service, pageType, variant }: ServiceParametersType) => {
  describe(`Running testsForAMPOnly for ${service} ${pageType}`, () => {
    /* Most Read Component
     * These cypress tests are needed as unit tests cannot be run on the jsdom.
     *
     * web workers (which run on amp pages) do not run on the virtual dom.
     */
    // SKIPPED: Cross platform tests have been skipped until the Most Read component has been migrated
    // mostReadAssertions({ service, variant });

    if (Cypress.env('APP_ENV') === 'local') {
      runAMPAdsTests({ service });
    }
  });
};
