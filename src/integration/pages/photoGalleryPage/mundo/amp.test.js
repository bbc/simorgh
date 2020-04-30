/**
 * @service mundo
 * @pathname /mundo/deportes-36935058
 */

import runCrossPlatformTests from '../crossPlatformTests';
import runAMPTests from '../ampTests';

describe('AMP', () => {
  describe(pageType, () => {
    runCrossPlatformTests();
    runAMPTests();
  });
});
