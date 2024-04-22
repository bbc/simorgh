/**
 * @service hausa
 * @pathname /hausa/labarai-23246985
 * @displayAds true
 */

import runCanonicalTests from '../canonicalTests';
import { runAppleItunesAppBannerTests } from '../../../common';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runAppleItunesAppBannerTests();
  });
});
