/**
 * @service persian
 * @pathname /persian/articles/c4vlle3q337o
 */

import runCanonicalTests from '../canonicalTests';
import runImageCopyrightNonBBC from '../imageCopyrightNonBBC';
import runParagraphTests from '../paragraph';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runImageCopyrightNonBBC();
    runParagraphTests();
  });
});
