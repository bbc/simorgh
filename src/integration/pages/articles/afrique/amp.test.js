/**
 * @service afrique
 * @pathname /afrique/articles/c7yn6nznljdo
 */

import runGistTests from '../gistTests';
import runMediaPlayerCaptionTests from '../mediaPlayerCaption';
import runMediaPlayerPlaceholderTests from '../mediaPlayerPlaceholderTestsCanonical';
import runImageCopyrightBBC from '../imageCopyrightNonBBC';

describe('AMP', () => {
  describe(pageType, () => {
    runGistTests();
    runMediaPlayerCaptionTests();
    runMediaPlayerPlaceholderTests();
    runImageCopyrightBBC();
  });
});
