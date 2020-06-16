/**
 * @service somali
 * @pathname /somali/bbc_somali_tv/tv_programmes/w13xttqt
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runAmpTests();
  });
});
