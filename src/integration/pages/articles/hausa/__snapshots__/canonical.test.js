/**
 * @service hausa
 * @pathname /hausa/articles/c2nr6xqmnewo
 */

import runCanonicalTests from '../../canonicalTests';
import runInlineLinkTests from '../../inlineLink';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runInlineLinkTests();
  });
});
