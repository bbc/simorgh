/**
 * @service amharic
 * @pathname /amharic/bbc_amharic_radio/liveradio
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runAmpTests from '../ampTests';

describe(platform.toUpperCase(), () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runAmpTests();
  });
});
