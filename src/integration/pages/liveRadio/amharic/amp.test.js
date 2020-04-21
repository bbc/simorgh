/**
 * @service amharic
 * @pathname /amharic/bbc_amharic_radio/liveradio
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runAmpTests();
  });
});
