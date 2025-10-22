/**
 * @service afrique
 * @pathname /afrique/articles/c7yn6nznljdo
 */

import runGistTests from '../gistTests';
import runMediaPlayerCaptionTests from '../mediaPlayerCaption';
import runMediaPlayerPlaceholderTests from '../mediaPlayerPlaceholderTestsAmp';
import runImageCopyrightBBC from '../imageCopyrightBBC';

describe('AMP', () => {
  describe(pageType, () => {
    runGistTests();
    runMediaPlayerCaptionTests();
    runMediaPlayerPlaceholderTests();
    runImageCopyrightBBC();
  });
});
