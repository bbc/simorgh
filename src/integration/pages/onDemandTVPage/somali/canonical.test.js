/**
 * @service somali
 * @pathname /somali/bbc_somali_tv/tv_programmes/w13xttqt
 */

import runCanonicalTests from '../canonicalTests';
import runMediaPlaceholderTests from '../mediaPlaceholderTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests();
    runMediaPlaceholderTests();
  });
});
