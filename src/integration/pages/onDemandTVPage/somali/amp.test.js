/**
 * @service somali
 * @pathname /somali/bbc_somali_tv/tv_programmes/w13xttqt
 */

import runAmpTests from '../ampTests';
import runCrossPlatformTests from '../crossPlatformTests';

describe('AMP', () => {
  describe(pageType, () => {
    runAmpTests(service);
    runCrossPlatformTests(service);
  });
});
