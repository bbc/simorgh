/**
 * @service afrique
 * @pathname /afrique/articles/c7yn6nznljdo
 */

import runGistTests from '../gistTests';
import runImageCopyrightBBC from '../imageCopyrightBBC';
import runMediaPlayerEmbedTests from '../../../common/mediaPlayerEmbed';

describe('Canonical', () => {
  describe(pageType, () => {
    runGistTests();
    runMediaPlayerEmbedTests(pageType);
    runImageCopyrightBBC();
  });
});
