/**
 * @service portuguese
 * @pathname /portuguese/articles/c72mg3j3x7eo
 */

import { runFlourishCanonicalEmbedTests } from '../../../common';
import runInlineLinkTests from '../inlineLink';
import runParagraphTests from '../paragraph';

describe('Canonical', () => {
  describe(pageType, () => {
    runFlourishCanonicalEmbedTests();
    runInlineLinkTests();
    runParagraphTests();
  });
});
