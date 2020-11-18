/**
 * @service pashto
 * @pathname /pashto/bbc_pashto_radio/p0340yr4
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runCrossPlatformTests(service);
    runAmpTests();
  });
});
