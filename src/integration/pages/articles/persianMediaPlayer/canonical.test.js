/**
 * @service persian
 * @pathname /persian/articles/cej3lzd5e0go
 */

import runCanonicalTests from '../canonicalTests';
import runInlineLinkTests from '../inlineLink';
import runMediaPlayerEmbedTests from '../../../common/mediaPlayerEmbed';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runMediaPlayerEmbedTests(pageType);
    runInlineLinkTests();
  });
});
