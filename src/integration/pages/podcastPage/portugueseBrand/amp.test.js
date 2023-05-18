/**
 * @service portuguese
 * @pathname /portuguese/podcasts/p07r3r3t
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runCrossPlatformTests(service);
    runAmpTests();
  });
});
