/**
 * @service arabic
 * @pathname /arabic/worldnews/2015/11/151120_t_arabic_av
 */

import runCanonicalTests from '../canonicalTests';
import { runAppleItunesAppBannerTests } from '../../../common';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runAppleItunesAppBannerTests();
  });
});
