/**
 * @service pidgin
 * @pathname /pidgin/23248703
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runAmpTests from '../ampTests';

describe(platform.toUpperCase(), () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runAmpTests();
  });
});
