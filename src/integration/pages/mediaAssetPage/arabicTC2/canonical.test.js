/**
 * @service arabic
 * @pathname /arabic/multimedia/2014/05/140515_kenia_children_sex_trade
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runCanonicalTests();
  });
});
