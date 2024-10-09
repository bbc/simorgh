/**
 * @service persian
 * @pathname /persian/articles/c4vlle3q337o
 */

import runAmpTests from '../ampTests';
import runImageCopyrightNonBBC from '../imageCopyrightNonBBC';
import runParagraphTests from '../paragraph';

describe('AMP', () => {
  describe(pageType, () => {
    runAmpTests(service);
    runImageCopyrightNonBBC();
    runParagraphTests();
  });
});
