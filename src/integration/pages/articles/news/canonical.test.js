/**
 * @service news
 * @pathname /news/articles/c0g992jmmkko
 * @isInUK yes
 */

import runCanonicalTests from '../canonicalTests';
import runInlineLinkTests from '../inlineLink';
import runImageCopyrightBBC from '../imageCopyrightBBC';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runInlineLinkTests();
    runImageCopyrightBBC();
  });
});
