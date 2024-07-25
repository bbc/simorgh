/**
 * @service afrique
 * @pathname /afrique/articles/c7yn6nznljdo
 */

import runGistTests from '../gistTests';
import runMediaPlayerCaptionTests from '../mediaPlayerCaption';
import runMediaPlayerPlaceholderTests from '../mediaPlayerPlaceholderTestsCanonical';
import runImageCopyrightBBC from '../imageCopyrightBBC';

describe('Canonical', () => {
  describe(pageType, () => {
    runGistTests();
    runMediaPlayerCaptionTests();
    runMediaPlayerPlaceholderTests();
    runImageCopyrightBBC();
  });
});
