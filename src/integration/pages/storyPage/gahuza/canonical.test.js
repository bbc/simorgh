/**
 * @service gahuza
 * @pathname /gahuza/23313911
 * @runScripts false
 */

import runCanonicalIncludeTests from '../canonicalIncludeTests';
import runCanonicalTests from '../canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalIncludeTests();
    runCanonicalTests(service);
  });
});
