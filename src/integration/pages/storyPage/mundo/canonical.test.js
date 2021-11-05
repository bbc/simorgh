/**
 * @service mundo
 * @pathname /mundo/noticias-internacional-51266689
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
