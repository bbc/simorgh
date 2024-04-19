/**
 * @service afrique
 * @pathname /afrique/articles/c7yn6nznljdo
 */

import runGistTests from '../gistTests';
import runMediaPlayerCaptionTests from '../mediaPlayerCaption';
import runMediaPlayerPlaceholderTests from '../mediaPlayerPlaceholderTestsCanonical';
import runImageCopyrightBBC from '../imageCopyrightNonBBC';

describe('Canonical', () => {
  describe(pageType, () => {
    runGistTests();
    runMediaPlayerCaptionTests(); // MIGHT NEED TO ADD LTR VERSION
    runMediaPlayerPlaceholderTests(); // MIGHT NEED TO ADD LTR VERSION
    runImageCopyrightBBC();
  });
});
