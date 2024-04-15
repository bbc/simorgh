/**
 * @service afrique
 * @pathname /afrique/articles/c7yn6nznljdo
 */

import runGistTests from '../gistTests';
import runMediaPlayerCaptionTests from '../mediaPlayerCaption';

describe('Canonical', () => {
  describe(pageType, () => {
    runGistTests();
    runMediaPlayerCaptionTests(); // MIGHT NEED TO ADD LTR VERSION
  });
});
