/**
 * @service afrique
 * @pathname /afrique/articles/c7yn6nznljdo
 */

import runGistTests from '../gistTests';
import runImageCopyrightBBC from '../imageCopyrightBBC';
import runMediaPlayerTests from '../../../common/mediaPlayer';

describe('Canonical', () => {
  describe(pageType, () => {
    runGistTests();
    runMediaPlayerTests(pageType);
    runImageCopyrightBBC();
  });
});
