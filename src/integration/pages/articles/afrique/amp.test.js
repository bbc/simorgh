/**
 * @service afrique
 * @pathname /afrique/articles/c7yn6nznljdo
 */

import runGistTests from '../gistTests';
import runMediaPlayerCaptionTests from '../mediaPlayerCaption';
import runMediaPlayerPlaceholderTests from '../mediaPlayerPlaceholderTestsCanonical';

describe('AMP', () => {
  describe(pageType, () => {
    runGistTests();
    runMediaPlayerCaptionTests();
    runMediaPlayerPlaceholderTests();
  });
});
