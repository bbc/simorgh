/**
 * @service hausa
 * @pathname /hausa/articles/c2nr6xqmnewo
 */

import runAmpTests from '../../ampTests';
import runInlineLinkTests from '../../inlineLink';

describe('AMP', () => {
  describe(pageType, () => {
    runAmpTests(service);
    runInlineLinkTests();
  });
});
