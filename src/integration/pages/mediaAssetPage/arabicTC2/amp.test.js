/**
 * @service arabic
 * @pathname /arabic/worldnews/2015/11/151120_t_arabic_av
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runAmpTests();
  });
});
