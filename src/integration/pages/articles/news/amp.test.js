/**
 * @service news
 * @pathname /news/articles/c5jje4ejkqvo
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runAmpTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runCrossPlatformTests('news');
    runAmpTests();
  });
});
