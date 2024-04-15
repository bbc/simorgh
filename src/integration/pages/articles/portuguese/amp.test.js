/**
 * @service portuguese
 * @pathname /portuguese/articles/c72mg3j3x7eo
 */

import { runFlourishAmpEmbedTests } from '../../../common';
import runInlineLinkTests from '../inlineLink';

describe('AMP', () => {
  describe(pageType, () => {
    runFlourishAmpEmbedTests();
    runInlineLinkTests();
  });
});
