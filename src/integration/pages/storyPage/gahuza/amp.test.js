/**
 * @service gahuza
 * @pathname /gahuza/23313911
 * @runScripts false
 */

import runAmpIncludeTests from '../ampIncludeTests';
import runAmpTests from '../ampTests';

describe('Amp', () => {
  describe(pageType, () => {
    runAmpIncludeTests();
    runAmpTests(service);
  });
});
