/**
 * @service somali
 * @pathname /somali/send/u130092370?renderer_env=test
 */

import runCanonicalTest from '../canonicalTests';
import runUgcFileUploadTest from '../ugcFileUploadTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTest();
    runUgcFileUploadTest();
  });
});
