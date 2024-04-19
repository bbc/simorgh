/**
 * @service news
 * @pathname /news/articles/c0g992jmmkko
 */

import runAmpTests from '../ampTests';
import runInlineLinkTests from '../inlineLink';

describe('AMP', () => {
  describe(pageType, () => {
    runAmpTests(service);
    runInlineLinkTests();
  });
});
