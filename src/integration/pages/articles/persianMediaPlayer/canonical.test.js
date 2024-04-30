/**
 * @service persian
 * @pathname /persian/articles/cej3lzd5e0go
 */

import runCanonicalTests from '../canonicalTests';
import runMediaPlayerCaptionTests from '../mediaPlayerCaption';
import runMediaPlayerPlaceholderTests from '../mediaPlayerPlaceholderTestsCanonical';
import runInlineLinkTests from '../inlineLink';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runMediaPlayerCaptionTests();
    runMediaPlayerPlaceholderTests();
    runInlineLinkTests();
  });
});
