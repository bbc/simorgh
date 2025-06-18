/**
 * @service persian
 * @pathname /persian/articles/cej3lzd5e0go
 */

import runCanonicalTests from '../canonicalTests';
import runInlineLinkTests from '../inlineLink';
import runMediaPlayerTests from '../../../common/mediaPlayer';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runMediaPlayerTests(pageType);
    runInlineLinkTests();
  });
});
