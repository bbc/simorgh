/**
 * @service afrique
 * @pathname /afrique/articles/c7yn6nznljdo
 */

import { runMediaPlayerTests } from '#src/integration/common';
import runGistTests from '../gistTests';
import runImageCopyrightBBC from '../imageCopyrightBBC';

describe('Canonical', () => {
  describe(pageType, () => {
    runGistTests();
    runMediaPlayerTests(pageType);
    runImageCopyrightBBC();
  });
});
