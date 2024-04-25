/**
 * @service persian
 * @pathname /persian/articles/cej3lzd5e0go
 */

import runAmpTests from '../ampTests';
import runMediaPlayerCaptionTests from '../mediaPlayerCaption';
import runMediaPlayerPlaceholderTests from '../mediaPlayerPlaceholderTestsAmp';
import runInlineLinkTests from '../inlineLink';

describe('AMP', () => {
  describe(pageType, () => {
    runAmpTests(service);
    runMediaPlayerCaptionTests();
    runMediaPlayerPlaceholderTests();
    runInlineLinkTests();
  });
});
