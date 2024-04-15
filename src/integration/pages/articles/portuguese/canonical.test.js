/**
 * @service portuguese
 * @pathname /portuguese/articles/c72mg3j3x7eo
 */

import { runFlourishCanonicalEmbedTests } from '../../../common';
import runInlineLinkTests from '../inlineLink';

describe('Canonical', () => {
  describe(pageType, () => {
    runFlourishCanonicalEmbedTests();
    runInlineLinkTests();
    // WE NEED A LTR INLINE LINK TEST BUT NEED TO MAKE FIXTURE DATA FOR THIS
  });
});
