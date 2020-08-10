/**
 * @service gahuza
 * @pathname /gahuza/bbc_gahuza_radio/liveradio
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runAmpTests();
  });
});
