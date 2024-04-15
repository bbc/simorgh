/**
 * @service afrique
 * @pathname /afrique/articles/c7yn6nznljdo
 */

import runGistTests from '../gistTests';
import runMediaPlayerCaptionTests from '../mediaPlayerCaption';

describe('AMP', () => {
  describe(pageType, () => {
    runGistTests();
    runMediaPlayerCaptionTests();
  });
});
