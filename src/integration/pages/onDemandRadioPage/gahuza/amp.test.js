/**
 * @service gahuza
 * @pathname /gahuza/bbc_gahuza_radio/w172x7rkcj6v0vz
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runAmpTests();
  });
});
