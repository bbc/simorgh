/**
 * @service persian
 * @pathname /persian/articles/cej3lzd5e0go
 */

import runMediaPlayerTests from '#src/integration/common/mediaPlayer';
import runCanonicalTests from '../canonicalTests';
import runInlineLinkTests from '../inlineLink';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runMediaPlayerTests(pageType);
    runInlineLinkTests();
  });
});
